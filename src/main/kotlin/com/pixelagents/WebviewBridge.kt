package com.pixelagents

import com.google.gson.Gson
import com.intellij.openapi.application.ApplicationManager
import com.intellij.ui.jcef.JBCefBrowser
import com.intellij.ui.jcef.JBCefJSQuery
import org.cef.browser.CefBrowser
import org.cef.browser.CefFrame
import org.cef.handler.CefDisplayHandlerAdapter
import org.cef.handler.CefLoadHandlerAdapter
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledFuture
import java.util.concurrent.TimeUnit

/**
 * Bridge between Kotlin backend and JCEF webview.
 * Handles bidirectional message passing:
 * - JS -> Kotlin: via JBCefJSQuery (acquireVsCodeApi mock calls postNativeMessage)
 * - Kotlin -> JS: via executeJavaScript (window.postMessage)
 */
class WebviewBridge(val browser: JBCefBrowser) {

    private val gson = Gson()
    private val scheduler = Executors.newScheduledThreadPool(2) { r ->
        Thread(r, "PixelAgents-Scheduler").apply { isDaemon = true }
    }

    // JS -> Kotlin query handler
    private val jsQuery = JBCefJSQuery.create(browser as com.intellij.ui.jcef.JBCefBrowserBase)

    // Registered message handler
    private var messageHandler: ((Map<String, Any?>) -> Unit)? = null

    init {
        jsQuery.addHandler { message ->
            try {
                @Suppress("UNCHECKED_CAST")
                val parsed = gson.fromJson(message, Map::class.java) as Map<String, Any?>
                messageHandler?.invoke(parsed)
            } catch (e: Exception) {
                LOG.warn("Error processing message from webview", e)
            }
            null
        }

        // Capture JS console errors for debugging
        browser.jbCefClient.addDisplayHandler(object : CefDisplayHandlerAdapter() {
            override fun onConsoleMessage(
                browser: CefBrowser?,
                level: org.cef.CefSettings.LogSeverity?,
                message: String?,
                source: String?,
                line: Int
            ): Boolean {
                if (level == org.cef.CefSettings.LogSeverity.LOGSEVERITY_ERROR
                    && message?.contains("preventDefault") != true) {
                    LOG.warn("JS Error: $message ($source:$line)")
                }
                return false
            }
        }, browser.cefBrowser)
    }

    /**
     * Register a handler for messages from the webview.
     */
    fun onMessage(handler: (Map<String, Any?>) -> Unit) {
        messageHandler = handler
    }

    /**
     * Send a message to the webview via window.postMessage.
     */
    fun postMessage(message: Map<String, Any?>) {
        val json = gson.toJson(message)
        // Escape for embedding in a JS string literal (single-quoted)
        val escaped = json
            .replace("\\", "\\\\")  // backslash first
            .replace("'", "\\'")
            .replace("\n", "\\n")
            .replace("\r", "\\r")
            .replace("\u2028", "\\u2028")  // JS line separator
            .replace("\u2029", "\\u2029")  // JS paragraph separator
        ApplicationManager.getApplication().invokeLater {
            try {
                browser.cefBrowser.executeJavaScript(
                    "window.postMessage(JSON.parse('$escaped'), '*');",
                    "", 0
                )
            } catch (e: Exception) {
                LOG.warn("Error posting message to webview", e)
            }
        }
    }

    /**
     * Inject the acquireVsCodeApi mock and the native message bridge
     * into the page after it loads.
     */
    fun injectBridge() {
        val injectionCode = jsQuery.inject("msg")
        browser.jbCefClient.addLoadHandler(object : CefLoadHandlerAdapter() {
            override fun onLoadEnd(cefBrowser: CefBrowser?, frame: org.cef.browser.CefFrame?, httpStatusCode: Int) {
                if (frame?.isMain != true) return
                // Inject acquireVsCodeApi mock that routes messages to Kotlin
                val js = """
                    (function() {
                        if (window.__pixelAgentsBridgeInjected) return;
                        window.__pixelAgentsBridgeInjected = true;

                        window.__pixelAgentsPostMessage = function(msg) {
                            ${injectionCode.replace("msg", "JSON.stringify(msg)")}
                        };

                        // Flush any messages queued before the bridge was ready
                        if (window.__pixelAgentsMessageQueue && window.__pixelAgentsMessageQueue.length > 0) {
                            var queue = window.__pixelAgentsMessageQueue.slice();
                            window.__pixelAgentsMessageQueue = [];
                            queue.forEach(function(msg) {
                                window.__pixelAgentsPostMessage(msg);
                            });
                        }
                    })();
                """.trimIndent()
                cefBrowser?.executeJavaScript(js, "", 0)
            }
        }, browser.cefBrowser)
    }

    /**
     * Schedule a task to run after a delay.
     */
    fun schedule(
        task: () -> Unit,
        delay: Long,
        unit: TimeUnit,
        repeat: Boolean = false,
    ): ScheduledFuture<*> {
        return if (repeat) {
            scheduler.scheduleAtFixedRate({
                try { task() } catch (e: Exception) { LOG.warn("Scheduled task error", e) }
            }, delay, delay, unit)
        } else {
            scheduler.schedule({
                try { task() } catch (e: Exception) { LOG.warn("Scheduled task error", e) }
            }, delay, unit)
        }
    }

    fun dispose() {
        scheduler.shutdownNow()
        jsQuery.dispose()
    }
}
