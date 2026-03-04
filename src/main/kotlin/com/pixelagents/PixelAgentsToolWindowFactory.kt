package com.pixelagents

import com.google.gson.Gson
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import com.intellij.ide.util.PropertiesComponent
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.Disposable
import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.ToolWindow
import com.intellij.openapi.wm.ToolWindowFactory
import com.intellij.ui.content.ContentFactory
import com.intellij.ui.jcef.JBCefBrowser
import com.intellij.ui.jcef.JBCefBrowserBuilder
import com.intellij.ide.plugins.PluginManagerCore
import com.intellij.openapi.extensions.PluginId
import java.io.File
import java.io.InputStream
import java.net.URL
import java.net.URLDecoder
import java.util.concurrent.ConcurrentHashMap
import java.util.jar.JarFile
import javax.swing.JFileChooser
import javax.swing.JOptionPane
import javax.swing.filechooser.FileNameExtensionFilter

class PixelAgentsToolWindowFactory : ToolWindowFactory {

    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val panel = PixelAgentsPanel(project)
        val content = ContentFactory.getInstance().createContent(panel.browser.component, "", false)
        content.setDisposer(panel)
        toolWindow.contentManager.addContent(content)
    }
}

class PixelAgentsPanel(private val project: Project) : Disposable {

    private val gson = Gson()

    val browser: JBCefBrowser
    private val bridge: WebviewBridge
    private val timerManager: TimerManager
    private val transcriptParser: TranscriptParser
    private val agents = ConcurrentHashMap<Int, AgentState>()
    private val jsonlWatcher: JsonlWatcher
    private val agentManager: AgentManager
    private val layoutPersistence: LayoutPersistence
    private val assetLoader = AssetLoader()

    private var defaultLayout: JsonObject? = null
    private var tempWebviewDir: File? = null

    init {
        browser = JBCefBrowserBuilder().build()
        bridge = WebviewBridge(browser)
        timerManager = TimerManager(bridge)
        transcriptParser = TranscriptParser(bridge, timerManager)
        jsonlWatcher = JsonlWatcher(bridge, timerManager, transcriptParser, agents)
        agentManager = AgentManager(bridge, timerManager, jsonlWatcher, agents, project.basePath)
        layoutPersistence = LayoutPersistence(bridge)

        bridge.injectBridge()
        bridge.onMessage { message -> handleMessage(message) }

        loadWebview()
    }

    private fun loadWebview() {
        try {
            val webviewDir = resolveWebviewDirectory()
            if (webviewDir == null) {
                browser.loadHTML(errorHtml("Webview resources not found. Rebuild with: ./gradlew buildPlugin"))
                return
            }

            LOG.info("Webview directory: ${webviewDir.absolutePath}")

            // Patch index.html to inject acquireVsCodeApi mock
            val indexFile = File(webviewDir, "index.html")
            if (!indexFile.exists()) {
                browser.loadHTML(errorHtml("index.html not found in ${webviewDir.absolutePath}"))
                return
            }

            // If we're using a temp copy, patch it. If using original resources, copy first.
            val servingDir = if (tempWebviewDir != null) {
                webviewDir // already a temp copy we can modify
            } else {
                // Copy to temp so we can patch index.html
                val tmpDir = File(System.getProperty("java.io.tmpdir"), "pixel-agents-webview")
                if (tmpDir.exists()) tmpDir.deleteRecursively()
                webviewDir.copyRecursively(tmpDir, overwrite = true)
                tempWebviewDir = tmpDir
                tmpDir
            }

            val servingIndex = File(servingDir, "index.html")
            var html = servingIndex.readText(Charsets.UTF_8)
            if (!html.contains("acquireVsCodeApi")) {
                // Strip ES module attributes that break JCEF file:// loading
                // Add defer so script runs after DOM is parsed (module scripts are deferred by default)
                html = html.replace(" type=\"module\" crossorigin", " defer")
                html = html.replace(" type=\"module\"", " defer")
                html = html.replace(" crossorigin", "")
                html = html.replace("<head>", "<head>\n${vsCodeApiMockScript()}")
                servingIndex.writeText(html, Charsets.UTF_8)
            }

            val url = servingIndex.toURI().toString()
            LOG.info("Loading webview from: $url")
            browser.loadURL(url)

        } catch (e: Exception) {
            System.err.println("[PixelAgents] ERROR loading webview: ${e.message}")
            e.printStackTrace(System.err)
            LOG.error("Error loading webview", e)
            browser.loadHTML(errorHtml("Failed to load webview: ${e.message}"))
        }
    }

    /**
     * Find the webview resources directory. Handles both:
     * - Development (running from filesystem via `runIde`)
     * - Production (running from plugin JAR)
     *
     * Uses multiple strategies with fallbacks for robustness.
     */
    private fun resolveWebviewDirectory(): File? {
        // Strategy 1: Standard classloader resource lookup
        val resourceUrl: URL? = javaClass.getResource("/webview/index.html")
            ?: javaClass.classLoader.getResource("webview/index.html")

        if (resourceUrl != null) {
            LOG.info("Found webview resource via classloader: ${resourceUrl.protocol}")
            when (resourceUrl.protocol) {
                "file" -> {
                    val indexFile = File(resourceUrl.toURI())
                    val webviewDir = indexFile.parentFile
                    LOG.info("Running from filesystem: ${webviewDir.absolutePath}")
                    return webviewDir
                }
                "jar" -> {
                    LOG.info("Running from JAR, extracting webview resources...")
                    val result = extractJarResources(resourceUrl)
                    if (result != null) return result
                    LOG.warn("JAR extraction via classloader URL failed, trying fallback...")
                }
            }
        } else {
            LOG.info("Classloader resource lookup returned null, trying PluginManagerCore fallback...")
        }

        // Strategy 2: Use IntelliJ Platform API to locate the plugin JAR directly
        return resolveFromPluginPath()
    }

    /**
     * Fallback: use PluginManagerCore to find the plugin installation directory
     * and extract webview resources from the JAR.
     */
    private fun resolveFromPluginPath(): File? {
        try {
            val pluginId = PluginId.getId("com.pixelagents.jetbrains")
            val descriptor = PluginManagerCore.getPlugin(pluginId) ?: run {
                LOG.warn("Plugin descriptor not found for com.pixelagents.jetbrains")
                return null
            }
            val pluginPath = descriptor.pluginPath
            LOG.info("Plugin path from PluginManagerCore: $pluginPath")

            // The plugin is typically at: pluginDir/lib/stormies-pixel-agents-*.jar
            val libDir = pluginPath.resolve("lib").toFile()
            if (libDir.isDirectory) {
                val pluginJar = libDir.listFiles()?.find {
                    it.name.startsWith("stormies-pixel-agents") && it.name.endsWith(".jar")
                }
                if (pluginJar != null) {
                    LOG.info("Found plugin JAR via PluginManagerCore: ${pluginJar.absolutePath}")
                    return extractFromJarFile(pluginJar)
                }
            }

            // Single-JAR plugin (pluginPath itself is the JAR)
            val pluginFile = pluginPath.toFile()
            if (pluginFile.isFile && pluginFile.name.endsWith(".jar")) {
                LOG.info("Plugin is a single JAR: ${pluginFile.absolutePath}")
                return extractFromJarFile(pluginFile)
            }

            LOG.warn("Could not locate plugin JAR in: $pluginPath")
            return null
        } catch (e: Exception) {
            LOG.error("Failed to resolve webview from plugin path", e)
            return null
        }
    }

    /**
     * Extract all /webview/ resources from the JAR to a temp directory.
     */
    private fun extractJarResources(resourceUrl: URL): File? {
        try {
            // Parse JAR path from URL like "jar:file:/path/to/plugin.jar!/webview/index.html"
            val jarPath = URLDecoder.decode(
                resourceUrl.path.substringAfter("file:").substringBefore("!"),
                "UTF-8"
            )
            return extractFromJarFile(File(jarPath))
        } catch (e: Exception) {
            LOG.error("Failed to extract JAR resources from URL", e)
            return null
        }
    }

    /**
     * Extract all /webview/ entries from a JAR file to a temp directory.
     */
    private fun extractFromJarFile(jarFile: File): File? {
        val tmpDir = File(System.getProperty("java.io.tmpdir"), "pixel-agents-webview")
        if (tmpDir.exists()) tmpDir.deleteRecursively()
        tmpDir.mkdirs()
        tempWebviewDir = tmpDir

        try {
            JarFile(jarFile).use { jar ->
                val entries = jar.entries()
                while (entries.hasMoreElements()) {
                    val entry = entries.nextElement()
                    if (entry.name.startsWith("webview/") && !entry.isDirectory) {
                        val relativePath = entry.name.removePrefix("webview/")
                        val targetFile = File(tmpDir, relativePath)
                        targetFile.parentFile?.mkdirs()
                        jar.getInputStream(entry).use { input ->
                            targetFile.outputStream().use { output ->
                                input.copyTo(output)
                            }
                        }
                    }
                }
            }

            // Verify extraction worked
            if (File(tmpDir, "index.html").exists()) {
                LOG.info("Extracted webview resources to: ${tmpDir.absolutePath}")
                return tmpDir
            }

            LOG.warn("Extraction succeeded but index.html not found in output")
            return null
        } catch (e: Exception) {
            LOG.error("Failed to extract from JAR: ${jarFile.absolutePath}", e)
            return null
        }
    }

    private fun vsCodeApiMockScript(): String = """
        <script>
            window.__pixelAgentsMessageQueue = [];
            window.acquireVsCodeApi = function() {
                return {
                    postMessage: function(msg) {
                        if (window.__pixelAgentsPostMessage) {
                            window.__pixelAgentsPostMessage(msg);
                        } else {
                            window.__pixelAgentsMessageQueue.push(msg);
                        }
                    },
                    getState: function() { return null; },
                    setState: function(state) { return state; }
                };
            };
        </script>
    """.trimIndent()

    private fun errorHtml(message: String): String =
        "<html><body style='color:white;background:#1e1e2e;font-family:sans-serif;padding:20px'>" +
            "<h2>Stormies - Pixel Agents</h2><p>$message</p></body></html>"

    private fun handleMessage(message: Map<String, Any?>) {
        val type = message["type"] as? String ?: return
        LOG.info("Message from webview: $type")

        when (type) {
            "openClaude" -> {
                ApplicationManager.getApplication().invokeLater {
                    JOptionPane.showMessageDialog(
                        browser.component,
                        "To add a Claude Code agent, run 'claude' in your terminal.\n" +
                            "The agent will appear automatically when it starts working.",
                        "Stormies - Pixel Agents",
                        JOptionPane.INFORMATION_MESSAGE
                    )
                }
            }

            "closeAgent" -> {
                val id = (message["id"] as? Number)?.toInt() ?: return
                agentManager.removeAgent(id)
                bridge.postMessage(mapOf("type" to "agentClosed", "id" to id))
            }

            "saveAgentSeats" -> {
                val seats = message["seats"]
                val props = PropertiesComponent.getInstance()
                props.setValue(SETTING_KEY_AGENT_SEATS, gson.toJson(seats))
            }

            "saveLayout" -> {
                val layout = message["layout"] ?: return
                layoutPersistence.markOwnWrite()
                layoutPersistence.writeLayoutToFile(layout)
            }

            "setSoundEnabled" -> {
                val enabled = message["enabled"] as? Boolean ?: return
                val props = PropertiesComponent.getInstance()
                props.setValue(SETTING_KEY_SOUND_ENABLED, enabled.toString())
            }

            "webviewReady" -> {
                val props = PropertiesComponent.getInstance()
                val soundEnabled = props.getBoolean(SETTING_KEY_SOUND_ENABLED, true)
                bridge.postMessage(mapOf("type" to "settingsLoaded", "soundEnabled" to soundEnabled))

                bridge.schedule({
                    loadAndSendAssets()
                    sendLayout()
                    layoutPersistence.startWatching { layout ->
                        bridge.postMessage(mapOf("type" to "layoutLoaded", "layout" to jsonObjectToMap(layout)))
                    }
                    agentManager.startProjectScanning()
                    agentManager.sendExistingAgents()
                }, 100, java.util.concurrent.TimeUnit.MILLISECONDS)
            }

            "openSessionsFolder" -> {
                ApplicationManager.getApplication().invokeLater {
                    val claudeProjects = File(System.getProperty("user.home"), ".claude/projects")
                    if (claudeProjects.exists()) {
                        java.awt.Desktop.getDesktop().open(claudeProjects)
                    }
                }
            }

            "exportLayout" -> {
                ApplicationManager.getApplication().invokeLater {
                    val layout = layoutPersistence.readLayoutFromFile() ?: run {
                        JOptionPane.showMessageDialog(
                            browser.component,
                            "No saved layout to export.",
                            "Stormies - Pixel Agents",
                            JOptionPane.WARNING_MESSAGE
                        )
                        return@invokeLater
                    }
                    val chooser = JFileChooser().apply {
                        dialogTitle = "Export Layout"
                        selectedFile = File(System.getProperty("user.home"), "pixel-agents-layout.json")
                        fileFilter = FileNameExtensionFilter("JSON Files", "json")
                    }
                    if (chooser.showSaveDialog(browser.component) == JFileChooser.APPROVE_OPTION) {
                        chooser.selectedFile.writeText(gson.toJson(layout), Charsets.UTF_8)
                    }
                }
            }

            "importLayout" -> {
                ApplicationManager.getApplication().invokeLater {
                    val chooser = JFileChooser().apply {
                        dialogTitle = "Import Layout"
                        fileFilter = FileNameExtensionFilter("JSON Files", "json")
                    }
                    if (chooser.showOpenDialog(browser.component) == JFileChooser.APPROVE_OPTION) {
                        try {
                            val raw = chooser.selectedFile.readText(Charsets.UTF_8)
                            val imported = JsonParser.parseString(raw).asJsonObject
                            val version = imported.get("version")?.asInt
                            val tiles = imported.getAsJsonArray("tiles")
                            if (version != 1 || tiles == null) {
                                JOptionPane.showMessageDialog(
                                    browser.component,
                                    "Invalid layout file.",
                                    "Stormies - Pixel Agents",
                                    JOptionPane.ERROR_MESSAGE
                                )
                                return@invokeLater
                            }
                            layoutPersistence.markOwnWrite()
                            layoutPersistence.writeLayoutToFile(imported)
                            bridge.postMessage(mapOf("type" to "layoutLoaded", "layout" to jsonObjectToMap(imported)))
                        } catch (_: Exception) {
                            JOptionPane.showMessageDialog(
                                browser.component,
                                "Failed to read or parse layout file.",
                                "Stormies - Pixel Agents",
                                JOptionPane.ERROR_MESSAGE
                            )
                        }
                    }
                }
            }

            "focusAgent" -> { }
        }
    }

    private fun loadAndSendAssets() {
        try {
            defaultLayout = assetLoader.loadDefaultLayout()

            val charSprites = assetLoader.loadCharacterSprites()
            if (charSprites != null) {
                bridge.postMessage(mapOf(
                    "type" to "characterSpritesLoaded",
                    "characters" to charSprites,
                ))
            }

            val floorTiles = assetLoader.loadFloorTiles()
            if (floorTiles != null) {
                bridge.postMessage(mapOf(
                    "type" to "floorTilesLoaded",
                    "sprites" to floorTiles,
                ))
            }

            val wallTiles = assetLoader.loadWallTiles()
            if (wallTiles != null) {
                bridge.postMessage(mapOf(
                    "type" to "wallTilesLoaded",
                    "sprites" to wallTiles,
                ))
            }

            val furnitureAssets = assetLoader.loadFurnitureAssets()
            if (furnitureAssets != null) {
                bridge.postMessage(mapOf(
                    "type" to "furnitureAssetsLoaded",
                    "catalog" to furnitureAssets.catalog,
                    "sprites" to furnitureAssets.sprites,
                ))
            }
        } catch (e: Exception) {
            LOG.warn("Error loading assets", e)
        }
    }

    private fun sendLayout() {
        val layout = layoutPersistence.migrateAndLoadLayout(defaultLayout)
        if (layout != null) {
            bridge.postMessage(mapOf("type" to "layoutLoaded", "layout" to jsonObjectToMap(layout)))
        } else {
            bridge.postMessage(mapOf("type" to "layoutLoaded", "layout" to null))
        }
    }

    private fun jsonObjectToMap(obj: JsonObject): Map<String, Any?> {
        @Suppress("UNCHECKED_CAST")
        return gson.fromJson(obj, Map::class.java) as Map<String, Any?>
    }

    override fun dispose() {
        agentManager.dispose()
        jsonlWatcher.dispose()
        timerManager.dispose()
        layoutPersistence.dispose()
        bridge.dispose()
        tempWebviewDir?.deleteRecursively()
    }
}
