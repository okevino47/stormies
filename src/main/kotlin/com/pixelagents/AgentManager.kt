package com.pixelagents

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.intellij.ide.util.PropertiesComponent
import java.io.File
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ScheduledFuture
import java.util.concurrent.TimeUnit

/**
 * Manages agent lifecycle by scanning ~/.claude/projects/ for JSONL files.
 * Auto-creates agents when new sessions are detected.
 */
class AgentManager(
    private val bridge: WebviewBridge,
    private val timerManager: TimerManager,
    private val jsonlWatcher: JsonlWatcher,
    val agents: ConcurrentHashMap<Int, AgentState>,
) {

    private val gson = Gson()
    private var nextAgentId = 1
    private val knownJsonlFiles = ConcurrentHashMap.newKeySet<String>()
    private val projectScanTimers = ConcurrentHashMap<String, ScheduledFuture<*>>()
    private val jsonlPollTimers = ConcurrentHashMap<Int, ScheduledFuture<*>>()

    /**
     * Get the Claude project directory for a given path.
     * Matches Claude's convention: path with special chars replaced by '-'.
     */
    fun getProjectDirs(): List<String> {
        val claudeProjectsDir = File(System.getProperty("user.home"), ".claude/projects")
        if (!claudeProjectsDir.exists()) return emptyList()
        return claudeProjectsDir.listFiles()
            ?.filter { it.isDirectory }
            ?.map { it.absolutePath }
            ?: emptyList()
    }

    /**
     * Start scanning all known project directories for new JSONL files.
     */
    fun startProjectScanning() {
        val projectDirs = getProjectDirs()
        for (dir in projectDirs) {
            ensureProjectScan(dir)
        }

        // Also scan ~/.claude/projects/ itself for new project dirs
        val claudeProjectsDir = File(System.getProperty("user.home"), ".claude/projects")
        if (claudeProjectsDir.exists()) {
            bridge.schedule({
                val currentDirs = getProjectDirs()
                for (dir in currentDirs) {
                    ensureProjectScan(dir)
                }
            }, PROJECT_SCAN_INTERVAL_MS * 5, TimeUnit.MILLISECONDS, repeat = true)
        }
    }

    private fun ensureProjectScan(projectDir: String) {
        if (projectScanTimers.containsKey(projectDir)) return

        // Scan existing JSONL files: create agents for recently active ones,
        // seed the rest as known so they don't trigger later.
        val recentThresholdMs = 5 * 60 * 1000L // 5 minutes
        val now = System.currentTimeMillis()
        try {
            val dir = File(projectDir)
            val jsonlFiles = dir.listFiles()
                ?.filter { it.name.endsWith(".jsonl") }
                ?: emptyArray<File>().toList()

            for (file in jsonlFiles) {
                val path = file.absolutePath
                knownJsonlFiles.add(path)
                if (now - file.lastModified() < recentThresholdMs) {
                    LOG.info("Active JSONL found at startup: ${file.name}")
                    createAgentForFile(path, projectDir)
                }
            }
        } catch (_: Exception) { }

        val timer = bridge.schedule({
            scanForNewJsonlFiles(projectDir)
        }, PROJECT_SCAN_INTERVAL_MS, TimeUnit.MILLISECONDS, repeat = true)
        projectScanTimers[projectDir] = timer
    }

    private fun scanForNewJsonlFiles(projectDir: String) {
        val files = try {
            File(projectDir).listFiles()
                ?.filter { it.name.endsWith(".jsonl") }
                ?.map { it.absolutePath }
                ?: return
        } catch (_: Exception) { return }

        for (file in files) {
            if (knownJsonlFiles.add(file)) {
                LOG.info("New JSONL detected: ${File(file).name}")
                createAgentForFile(file, projectDir)
            }
        }
    }

    private fun createAgentForFile(jsonlFile: String, projectDir: String) {
        val id = nextAgentId++
        val agent = AgentState(
            id = id,
            projectDir = projectDir,
            jsonlFile = jsonlFile,
        )

        agents[id] = agent
        LOG.info("Agent $id: created for ${File(jsonlFile).name}")
        bridge.postMessage(mapOf("type" to "agentCreated", "id" to id))

        // Start file watching
        jsonlWatcher.startFileWatching(id, jsonlFile)
        jsonlWatcher.readNewLines(id)
    }

    fun removeAgent(agentId: Int) {
        val agent = agents[agentId] ?: return

        // Stop JSONL poll timer
        jsonlPollTimers.remove(agentId)?.cancel(false)

        // Stop file watching
        jsonlWatcher.stopFileWatching(agentId)

        // Cancel timers
        timerManager.cancelWaitingTimer(agentId)
        timerManager.cancelPermissionTimer(agentId)

        // Remove from map
        agents.remove(agentId)
    }

    fun sendExistingAgents() {
        val agentIds = agents.keys.sorted()
        val props = PropertiesComponent.getInstance()
        val agentMetaJson = props.getValue(SETTING_KEY_AGENT_SEATS) ?: "{}"
        val agentMeta: Map<String, Any> = try {
            gson.fromJson(agentMetaJson, object : TypeToken<Map<String, Any>>() {}.type)
        } catch (_: Exception) { emptyMap() }

        bridge.postMessage(mapOf(
            "type" to "existingAgents",
            "agents" to agentIds,
            "agentMeta" to agentMeta,
            "folderNames" to emptyMap<Int, String>(),
        ))

        sendCurrentAgentStatuses()
    }

    private fun sendCurrentAgentStatuses() {
        for ((agentId, agent) in agents) {
            for ((toolId, status) in agent.activeToolStatuses) {
                bridge.postMessage(mapOf(
                    "type" to "agentToolStart",
                    "id" to agentId,
                    "toolId" to toolId,
                    "status" to status,
                ))
            }
            if (agent.isWaiting) {
                bridge.postMessage(mapOf(
                    "type" to "agentStatus",
                    "id" to agentId,
                    "status" to "waiting",
                ))
            }
        }
    }

    fun dispose() {
        projectScanTimers.values.forEach { it.cancel(false) }
        projectScanTimers.clear()
        jsonlPollTimers.values.forEach { it.cancel(false) }
        jsonlPollTimers.clear()
        for (id in agents.keys.toList()) {
            removeAgent(id)
        }
    }
}
