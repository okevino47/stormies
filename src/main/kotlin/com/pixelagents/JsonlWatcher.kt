package com.pixelagents

import java.io.File
import java.io.RandomAccessFile
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ScheduledFuture
import java.util.concurrent.TimeUnit

/**
 * Watches JSONL files for new content using polling.
 * Uses partial line buffering for mid-write reads.
 */
class JsonlWatcher(
    private val bridge: WebviewBridge,
    private val timerManager: TimerManager,
    private val transcriptParser: TranscriptParser,
    private val agents: ConcurrentHashMap<Int, AgentState>,
) {

    private val pollingTimers = ConcurrentHashMap<Int, ScheduledFuture<*>>()

    fun startFileWatching(agentId: Int, filePath: String) {
        val timer = bridge.schedule({
            if (!agents.containsKey(agentId)) {
                stopFileWatching(agentId)
                return@schedule
            }
            readNewLines(agentId)
        }, FILE_WATCHER_POLL_INTERVAL_MS, TimeUnit.MILLISECONDS, repeat = true)
        pollingTimers[agentId] = timer
    }

    fun readNewLines(agentId: Int) {
        val agent = agents[agentId] ?: return
        try {
            val file = File(agent.jsonlFile)
            if (!file.exists()) return
            val fileSize = file.length()
            if (fileSize <= agent.fileOffset) return

            val bytesToRead = fileSize - agent.fileOffset
            val buf = ByteArray(bytesToRead.toInt())

            RandomAccessFile(file, "r").use { raf ->
                raf.seek(agent.fileOffset)
                raf.readFully(buf)
            }
            agent.fileOffset = fileSize

            val text = agent.lineBuffer + String(buf, Charsets.UTF_8)
            val lines = text.split('\n')
            // Last element is either empty (if text ended with \n) or a partial line
            agent.lineBuffer = lines.last()
            val completeLines = lines.dropLast(1)

            val hasLines = completeLines.any { it.isNotBlank() }
            if (hasLines) {
                // New data arriving — cancel timers
                timerManager.cancelWaitingTimer(agentId)
                timerManager.cancelPermissionTimer(agentId)
                if (agent.permissionSent) {
                    agent.permissionSent = false
                    bridge.postMessage(mapOf("type" to "agentToolPermissionClear", "id" to agentId))
                }
            }

            for (line in completeLines) {
                if (line.isBlank()) continue
                transcriptParser.processTranscriptLine(agentId, line, agents)
            }
        } catch (e: Exception) {
            LOG.warn("Read error for agent $agentId", e)
        }
    }

    fun stopFileWatching(agentId: Int) {
        pollingTimers.remove(agentId)?.cancel(false)
    }

    fun dispose() {
        pollingTimers.values.forEach { it.cancel(false) }
        pollingTimers.clear()
    }
}
