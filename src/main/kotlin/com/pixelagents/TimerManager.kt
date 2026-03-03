package com.pixelagents

import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ScheduledFuture
import java.util.concurrent.TimeUnit

class TimerManager(private val bridge: WebviewBridge) {

    val waitingTimers = ConcurrentHashMap<Int, ScheduledFuture<*>>()
    val permissionTimers = ConcurrentHashMap<Int, ScheduledFuture<*>>()

    fun clearAgentActivity(
        agent: AgentState?,
        agentId: Int,
    ) {
        if (agent == null) return
        agent.activeToolIds.clear()
        agent.activeToolStatuses.clear()
        agent.activeToolNames.clear()
        agent.activeSubagentToolIds.clear()
        agent.activeSubagentToolNames.clear()
        agent.isWaiting = false
        agent.permissionSent = false
        cancelPermissionTimer(agentId)
        bridge.postMessage(mapOf("type" to "agentToolsClear", "id" to agentId))
        bridge.postMessage(mapOf("type" to "agentStatus", "id" to agentId, "status" to "active"))
    }

    fun cancelWaitingTimer(agentId: Int) {
        waitingTimers.remove(agentId)?.cancel(false)
    }

    fun startWaitingTimer(
        agentId: Int,
        delayMs: Long,
        agents: ConcurrentHashMap<Int, AgentState>,
    ) {
        cancelWaitingTimer(agentId)
        val future = bridge.schedule({
            waitingTimers.remove(agentId)
            val agent = agents[agentId]
            if (agent != null) {
                agent.isWaiting = true
            }
            bridge.postMessage(mapOf("type" to "agentStatus", "id" to agentId, "status" to "waiting"))
        }, delayMs, TimeUnit.MILLISECONDS)
        waitingTimers[agentId] = future
    }

    fun cancelPermissionTimer(agentId: Int) {
        permissionTimers.remove(agentId)?.cancel(false)
    }

    fun startPermissionTimer(
        agentId: Int,
        agents: ConcurrentHashMap<Int, AgentState>,
    ) {
        cancelPermissionTimer(agentId)
        val future = bridge.schedule({
            permissionTimers.remove(agentId)
            val agent = agents[agentId] ?: return@schedule

            // Check parent tools for non-exempt
            var hasNonExempt = false
            for (toolId in agent.activeToolIds) {
                val toolName = agent.activeToolNames[toolId] ?: ""
                if (toolName !in PERMISSION_EXEMPT_TOOLS) {
                    hasNonExempt = true
                    break
                }
            }

            // Check sub-agent tools for non-exempt
            val stuckSubagentParentToolIds = mutableListOf<String>()
            for ((parentToolId, subToolNames) in agent.activeSubagentToolNames) {
                for ((_, toolName) in subToolNames) {
                    if (toolName !in PERMISSION_EXEMPT_TOOLS) {
                        stuckSubagentParentToolIds.add(parentToolId)
                        hasNonExempt = true
                        break
                    }
                }
            }

            if (hasNonExempt) {
                agent.permissionSent = true
                LOG.info("Agent $agentId: possible permission wait detected")
                bridge.postMessage(mapOf("type" to "agentToolPermission", "id" to agentId))
                for (parentToolId in stuckSubagentParentToolIds) {
                    bridge.postMessage(mapOf(
                        "type" to "subagentToolPermission",
                        "id" to agentId,
                        "parentToolId" to parentToolId,
                    ))
                }
            }
        }, PERMISSION_TIMER_DELAY_MS, TimeUnit.MILLISECONDS)
        permissionTimers[agentId] = future
    }

    fun dispose() {
        waitingTimers.values.forEach { it.cancel(false) }
        waitingTimers.clear()
        permissionTimers.values.forEach { it.cancel(false) }
        permissionTimers.clear()
    }

    companion object {
        val PERMISSION_EXEMPT_TOOLS = setOf("Task", "AskUserQuestion")
    }
}
