package com.pixelagents

import com.google.gson.JsonArray
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import java.io.File
import java.util.concurrent.ConcurrentHashMap

class TranscriptParser(
    private val bridge: WebviewBridge,
    private val timerManager: TimerManager,
) {

    fun formatToolStatus(toolName: String, input: JsonObject): String {
        fun base(key: String): String {
            val v = input.get(key)?.asString ?: return ""
            return File(v).name
        }
        return when (toolName) {
            "Read" -> "Reading ${base("file_path")}"
            "Edit" -> "Editing ${base("file_path")}"
            "Write" -> "Writing ${base("file_path")}"
            "Bash" -> {
                val cmd = input.get("command")?.asString ?: ""
                val truncated = if (cmd.length > BASH_COMMAND_DISPLAY_MAX_LENGTH) {
                    cmd.take(BASH_COMMAND_DISPLAY_MAX_LENGTH) + "\u2026"
                } else cmd
                "Running: $truncated"
            }
            "Glob" -> "Searching files"
            "Grep" -> "Searching code"
            "WebFetch" -> "Fetching web content"
            "WebSearch" -> "Searching the web"
            "Task" -> {
                val desc = input.get("description")?.asString ?: ""
                if (desc.isNotEmpty()) {
                    val truncated = if (desc.length > TASK_DESCRIPTION_DISPLAY_MAX_LENGTH) {
                        desc.take(TASK_DESCRIPTION_DISPLAY_MAX_LENGTH) + "\u2026"
                    } else desc
                    "Subtask: $truncated"
                } else "Running subtask"
            }
            "AskUserQuestion" -> "Waiting for your answer"
            "EnterPlanMode" -> "Planning"
            "ExitPlanMode" -> "Finishing plan"
            "NotebookEdit" -> "Editing notebook"
            else -> "Using $toolName"
        }
    }

    fun processTranscriptLine(
        agentId: Int,
        line: String,
        agents: ConcurrentHashMap<Int, AgentState>,
    ) {
        val agent = agents[agentId] ?: return
        try {
            val record = JsonParser.parseString(line).asJsonObject
            val type = record.get("type")?.asString ?: return

            when (type) {
                "assistant" -> processAssistantRecord(agentId, agent, record, agents)
                "progress" -> processProgressRecord(agentId, record, agents)
                "user" -> processUserRecord(agentId, agent, record, agents)
                "system" -> {
                    if (record.get("subtype")?.asString == "turn_duration") {
                        timerManager.cancelWaitingTimer(agentId)
                        timerManager.cancelPermissionTimer(agentId)

                        if (agent.activeToolIds.isNotEmpty()) {
                            agent.activeToolIds.clear()
                            agent.activeToolStatuses.clear()
                            agent.activeToolNames.clear()
                            agent.activeSubagentToolIds.clear()
                            agent.activeSubagentToolNames.clear()
                            bridge.postMessage(mapOf("type" to "agentToolsClear", "id" to agentId))
                        }

                        agent.isWaiting = true
                        agent.permissionSent = false
                        agent.hadToolsInTurn = false
                        bridge.postMessage(mapOf("type" to "agentStatus", "id" to agentId, "status" to "waiting"))
                    }
                }
            }
        } catch (_: Exception) {
            // Ignore malformed lines
        }
    }

    private fun processAssistantRecord(
        agentId: Int,
        agent: AgentState,
        record: JsonObject,
        agents: ConcurrentHashMap<Int, AgentState>,
    ) {
        val content = record.getAsJsonObject("message")?.getAsJsonArray("content") ?: return
        val hasToolUse = content.any { it.asJsonObject.get("type")?.asString == "tool_use" }

        // Process thinking blocks (extended thinking / reasoning)
    for (elem in content) {
        val block = elem.asJsonObject
        if (block.get("type")?.asString == "thinking") {
            val thinking = block.get("thinking")?.asString ?: continue
            val words = thinking.trim().split("\\s+".toRegex())
            if (words.size < 3) continue
            val summary = words.take(8).joinToString(" ") + "..."
            bridge.postMessage(mapOf("type" to "agentThinking", "id" to agentId, "text" to summary))
        }
    }

    if (hasToolUse) {
            timerManager.cancelWaitingTimer(agentId)
            agent.isWaiting = false
            agent.hadToolsInTurn = true
            bridge.postMessage(mapOf("type" to "agentStatus", "id" to agentId, "status" to "active"))

            var hasNonExemptTool = false
            for (elem in content) {
                val block = elem.asJsonObject
                if (block.get("type")?.asString == "tool_use") {
                    val blockId = block.get("id")?.asString ?: continue
                    val toolName = block.get("name")?.asString ?: ""
                    val input = block.getAsJsonObject("input") ?: JsonObject()
                    val status = formatToolStatus(toolName, input)

                    LOG.info("Agent $agentId tool start: $blockId $status")
                    agent.activeToolIds.add(blockId)
                    agent.activeToolStatuses[blockId] = status
                    agent.activeToolNames[blockId] = toolName

                    if (toolName !in TimerManager.PERMISSION_EXEMPT_TOOLS) {
                        hasNonExemptTool = true
                    }

                    bridge.postMessage(mapOf(
                        "type" to "agentToolStart",
                        "id" to agentId,
                        "toolId" to blockId,
                        "status" to status,
                    ))
                }
            }
            if (hasNonExemptTool) {
                timerManager.startPermissionTimer(agentId, agents)
            }
        } else {
            val hasText = content.any { it.asJsonObject.get("type")?.asString == "text" }
            if (hasText && !agent.hadToolsInTurn) {
                timerManager.startWaitingTimer(agentId, TEXT_IDLE_DELAY_MS, agents)
            }
        }
    }

    private fun processUserRecord(
        agentId: Int,
        agent: AgentState,
        record: JsonObject,
        agents: ConcurrentHashMap<Int, AgentState>,
    ) {
        val message = record.getAsJsonObject("message") ?: return
        val content = message.get("content")

        if (content != null && content.isJsonArray) {
            val blocks = content.asJsonArray
            val hasToolResult = blocks.any { it.asJsonObject.get("type")?.asString == "tool_result" }
            if (hasToolResult) {
                for (elem in blocks) {
                    val block = elem.asJsonObject
                    if (block.get("type")?.asString == "tool_result") {
                        val toolUseId = block.get("tool_use_id")?.asString ?: continue
                        LOG.info("Agent $agentId tool done: $toolUseId")

                        // If completed tool was a Task, clear its subagent tools
                        if (agent.activeToolNames[toolUseId] == "Task") {
                            agent.activeSubagentToolIds.remove(toolUseId)
                            agent.activeSubagentToolNames.remove(toolUseId)
                            bridge.postMessage(mapOf(
                                "type" to "subagentClear",
                                "id" to agentId,
                                "parentToolId" to toolUseId,
                            ))
                        }

                        agent.activeToolIds.remove(toolUseId)
                        agent.activeToolStatuses.remove(toolUseId)
                        agent.activeToolNames.remove(toolUseId)

                        val capturedToolId = toolUseId
                        bridge.schedule({
                            bridge.postMessage(mapOf(
                                "type" to "agentToolDone",
                                "id" to agentId,
                                "toolId" to capturedToolId,
                            ))
                        }, TOOL_DONE_DELAY_MS, java.util.concurrent.TimeUnit.MILLISECONDS)
                    }
                }
                if (agent.activeToolIds.isEmpty()) {
                    agent.hadToolsInTurn = false
                }
            } else {
                // New user text prompt — new turn starting
                timerManager.cancelWaitingTimer(agentId)
                timerManager.clearAgentActivity(agent, agentId)
                agent.hadToolsInTurn = false
            }
        } else if (content != null && content.isJsonPrimitive) {
            val text = content.asString
            if (text.isNotBlank()) {
                timerManager.cancelWaitingTimer(agentId)
                timerManager.clearAgentActivity(agent, agentId)
                agent.hadToolsInTurn = false
            }
        }
    }

    private fun processProgressRecord(
        agentId: Int,
        record: JsonObject,
        agents: ConcurrentHashMap<Int, AgentState>,
    ) {
        val agent = agents[agentId] ?: return
        val parentToolId = record.get("parentToolUseID")?.asString ?: return
        val data = record.getAsJsonObject("data") ?: return
        val dataType = data.get("type")?.asString

        // bash_progress / mcp_progress: tool is actively executing
        if (dataType == "bash_progress" || dataType == "mcp_progress") {
            if (parentToolId in agent.activeToolIds) {
                timerManager.startPermissionTimer(agentId, agents)
            }
            return
        }

        // Verify parent is an active Task tool (agent_progress handling)
        if (agent.activeToolNames[parentToolId] != "Task") return

        val msg = data.getAsJsonObject("message") ?: return
        val msgType = msg.get("type")?.asString ?: return
        val innerMsg = msg.getAsJsonObject("message") ?: return
        val content = innerMsg.get("content")
        if (content == null || !content.isJsonArray) return
        val contentArray = content.asJsonArray

        when (msgType) {
            "assistant" -> processSubagentAssistant(agentId, agent, parentToolId, contentArray, agents)
            "user" -> processSubagentUser(agentId, agent, parentToolId, contentArray, agents)
        }
    }

    private fun processSubagentAssistant(
        agentId: Int,
        agent: AgentState,
        parentToolId: String,
        content: JsonArray,
        agents: ConcurrentHashMap<Int, AgentState>,
    ) {
        var hasNonExemptSubTool = false
        for (elem in content) {
            val block = elem.asJsonObject
            if (block.get("type")?.asString == "tool_use") {
                val blockId = block.get("id")?.asString ?: continue
                val toolName = block.get("name")?.asString ?: ""
                val input = block.getAsJsonObject("input") ?: JsonObject()
                val status = formatToolStatus(toolName, input)

                LOG.info("Agent $agentId subagent tool start: $blockId $status (parent: $parentToolId)")

                val subTools = agent.activeSubagentToolIds.getOrPut(parentToolId) { ConcurrentHashMap.newKeySet() }
                subTools.add(blockId)

                val subNames = agent.activeSubagentToolNames.getOrPut(parentToolId) { ConcurrentHashMap() }
                subNames[blockId] = toolName

                if (toolName !in TimerManager.PERMISSION_EXEMPT_TOOLS) {
                    hasNonExemptSubTool = true
                }

                bridge.postMessage(mapOf(
                    "type" to "subagentToolStart",
                    "id" to agentId,
                    "parentToolId" to parentToolId,
                    "toolId" to blockId,
                    "status" to status,
                ))
            }
        }
        if (hasNonExemptSubTool) {
            timerManager.startPermissionTimer(agentId, agents)
        }
    }

    private fun processSubagentUser(
        agentId: Int,
        agent: AgentState,
        parentToolId: String,
        content: JsonArray,
        agents: ConcurrentHashMap<Int, AgentState>,
    ) {
        for (elem in content) {
            val block = elem.asJsonObject
            if (block.get("type")?.asString == "tool_result") {
                val toolUseId = block.get("tool_use_id")?.asString ?: continue
                LOG.info("Agent $agentId subagent tool done: $toolUseId (parent: $parentToolId)")

                agent.activeSubagentToolIds[parentToolId]?.remove(toolUseId)
                agent.activeSubagentToolNames[parentToolId]?.remove(toolUseId)

                val capturedToolId = toolUseId
                bridge.schedule({
                    bridge.postMessage(mapOf(
                        "type" to "subagentToolDone",
                        "id" to agentId,
                        "parentToolId" to parentToolId,
                        "toolId" to capturedToolId,
                    ))
                }, TOOL_DONE_DELAY_MS, java.util.concurrent.TimeUnit.MILLISECONDS)
            }
        }

        // Check if there are still active non-exempt sub-agent tools
        var stillHasNonExempt = false
        for ((_, subNames) in agent.activeSubagentToolNames) {
            for ((_, toolName) in subNames) {
                if (toolName !in TimerManager.PERMISSION_EXEMPT_TOOLS) {
                    stillHasNonExempt = true
                    break
                }
            }
            if (stillHasNonExempt) break
        }
        if (stillHasNonExempt) {
            timerManager.startPermissionTimer(agentId, agents)
        }
    }
}
