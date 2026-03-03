package com.pixelagents

import com.google.gson.Gson
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import java.io.File
import java.nio.file.Files
import java.nio.file.StandardCopyOption
import java.util.concurrent.ScheduledFuture
import java.util.concurrent.TimeUnit

class LayoutPersistence(private val bridge: WebviewBridge) {

    private val gson = Gson()
    private val layoutDir = File(System.getProperty("user.home"), LAYOUT_FILE_DIR)
    private val layoutFile = File(layoutDir, LAYOUT_FILE_NAME)

    @Volatile
    private var skipNextChange = false

    @Volatile
    private var lastMtime = 0L

    @Volatile
    private var disposed = false
    private var pollTimer: ScheduledFuture<*>? = null

    fun readLayoutFromFile(): JsonObject? {
        return try {
            if (!layoutFile.exists()) return null
            val raw = layoutFile.readText(Charsets.UTF_8)
            JsonParser.parseString(raw).asJsonObject
        } catch (e: Exception) {
            LOG.warn("Failed to read layout file", e)
            null
        }
    }

    fun writeLayoutToFile(layout: Any) {
        try {
            layoutDir.mkdirs()
            val json = when (layout) {
                is JsonObject -> gson.toJson(layout)
                is Map<*, *> -> gson.toJson(layout)
                else -> gson.toJson(layout)
            }
            val tmpFile = File(layoutDir, "$LAYOUT_FILE_NAME.tmp")
            tmpFile.writeText(json, Charsets.UTF_8)
            Files.move(tmpFile.toPath(), layoutFile.toPath(), StandardCopyOption.REPLACE_EXISTING)
        } catch (e: Exception) {
            LOG.warn("Failed to write layout file", e)
        }
    }

    fun markOwnWrite() {
        skipNextChange = true
        try {
            if (layoutFile.exists()) {
                lastMtime = layoutFile.lastModified()
            }
        } catch (_: Exception) { }
    }

    /**
     * Load layout with fallback:
     * 1. If file exists -> return it
     * 2. If defaultLayout provided -> write to file, return it
     * 3. Return null
     */
    fun migrateAndLoadLayout(defaultLayout: JsonObject? = null): JsonObject? {
        // 1. Try file
        val fromFile = readLayoutFromFile()
        if (fromFile != null) {
            LOG.info("Layout loaded from file")
            return fromFile
        }

        // 2. Use bundled default
        if (defaultLayout != null) {
            LOG.info("Writing bundled default layout to file")
            writeLayoutToFile(defaultLayout)
            return defaultLayout
        }

        return null
    }

    fun startWatching(onExternalChange: (JsonObject) -> Unit) {
        try {
            if (layoutFile.exists()) {
                lastMtime = layoutFile.lastModified()
            }
        } catch (_: Exception) { }

        pollTimer = bridge.schedule({
            checkForChange(onExternalChange)
        }, LAYOUT_FILE_POLL_INTERVAL_MS, TimeUnit.MILLISECONDS, repeat = true)
    }

    private fun checkForChange(onExternalChange: (JsonObject) -> Unit) {
        if (disposed) return
        try {
            if (!layoutFile.exists()) return
            val mtime = layoutFile.lastModified()
            if (mtime <= lastMtime) return
            lastMtime = mtime

            if (skipNextChange) {
                skipNextChange = false
                return
            }

            val raw = layoutFile.readText(Charsets.UTF_8)
            val layout = JsonParser.parseString(raw).asJsonObject
            LOG.info("External layout change detected")
            onExternalChange(layout)
        } catch (e: Exception) {
            LOG.warn("Error checking layout file", e)
        }
    }

    fun dispose() {
        disposed = true
        pollTimer?.cancel(false)
        pollTimer = null
    }
}
