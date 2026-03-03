package com.pixelagents

import com.google.gson.Gson
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import com.google.gson.reflect.TypeToken
import java.awt.image.BufferedImage
import java.io.File
import java.io.InputStream
import javax.imageio.ImageIO

/**
 * Loads PNG assets and converts them to SpriteData format (2D hex color arrays)
 * for sending to the webview. All assets are loaded from plugin resources.
 */
class AssetLoader {

    private val gson = Gson()

    data class FurnitureAsset(
        val id: String,
        val name: String,
        val label: String,
        val category: String,
        val file: String,
        val width: Int,
        val height: Int,
        val footprintW: Int,
        val footprintH: Int,
        val isDesk: Boolean,
        val canPlaceOnWalls: Boolean,
        val partOfGroup: Boolean? = null,
        val groupId: String? = null,
        val canPlaceOnSurfaces: Boolean? = null,
        val backgroundTiles: Int? = null,
        val orientation: String? = null,
        val state: String? = null,
    )

    data class LoadedAssets(
        val catalog: List<FurnitureAsset>,
        val sprites: Map<String, List<List<String>>>,
    )

    data class CharacterDirectionSprites(
        val down: List<List<List<String>>>,
        val up: List<List<List<String>>>,
        val right: List<List<List<String>>>,
    )

    /**
     * Load the bundled default layout from resources.
     */
    fun loadDefaultLayout(): JsonObject? {
        return try {
            val stream = resourceStream("/webview/assets/default-layout.json") ?: return null
            val content = stream.bufferedReader().use { it.readText() }
            JsonParser.parseString(content).asJsonObject
        } catch (e: Exception) {
            LOG.warn("Error loading default layout", e)
            null
        }
    }

    /**
     * Load 6 pre-colored character sprites from resources.
     * Each PNG is 112x96: 7 frames x 16px wide, 3 direction rows x 32px tall.
     */
    fun loadCharacterSprites(): List<CharacterDirectionSprites>? {
        return try {
            val characters = mutableListOf<CharacterDirectionSprites>()
            for (ci in 0 until CHAR_COUNT) {
                val stream = resourceStream("/webview/assets/characters/char_$ci.png") ?: return null
                val image = ImageIO.read(stream)

                val charData = mutableMapOf<String, MutableList<List<List<String>>>>()
                for (dir in CHARACTER_DIRECTIONS) charData[dir] = mutableListOf()

                for (dirIdx in CHARACTER_DIRECTIONS.indices) {
                    val dir = CHARACTER_DIRECTIONS[dirIdx]
                    val rowOffsetY = dirIdx * CHAR_FRAME_H
                    val frames = mutableListOf<List<List<String>>>()

                    for (f in 0 until CHAR_FRAMES_PER_ROW) {
                        val frameOffsetX = f * CHAR_FRAME_W
                        val sprite = extractRegion(image, frameOffsetX, rowOffsetY, CHAR_FRAME_W, CHAR_FRAME_H)
                        frames.add(sprite)
                    }
                    charData[dir] = frames
                }

                characters.add(CharacterDirectionSprites(
                    down = charData["down"]!!,
                    up = charData["up"]!!,
                    right = charData["right"]!!,
                ))
            }
            LOG.info("Loaded ${characters.size} character sprites")
            characters
        } catch (e: Exception) {
            LOG.warn("Error loading character sprites", e)
            null
        }
    }

    /**
     * Load floor tile patterns from floors.png (7 tiles, 16px each, horizontal strip).
     */
    fun loadFloorTiles(): List<List<List<String>>>? {
        return try {
            val stream = resourceStream("/webview/assets/floors.png") ?: return null
            val image = ImageIO.read(stream)
            val sprites = mutableListOf<List<List<String>>>()
            for (t in 0 until FLOOR_PATTERN_COUNT) {
                val sprite = extractRegion(image, t * FLOOR_TILE_SIZE, 0, FLOOR_TILE_SIZE, FLOOR_TILE_SIZE)
                sprites.add(sprite)
            }
            LOG.info("Loaded ${sprites.size} floor tile patterns")
            sprites
        } catch (e: Exception) {
            LOG.warn("Error loading floor tiles", e)
            null
        }
    }

    /**
     * Load wall tiles from walls.png (64x128, 4x4 grid of 16x32 pieces).
     */
    fun loadWallTiles(): List<List<List<String>>>? {
        return try {
            val stream = resourceStream("/webview/assets/walls.png") ?: return null
            val image = ImageIO.read(stream)
            val sprites = mutableListOf<List<List<String>>>()
            for (mask in 0 until WALL_BITMASK_COUNT) {
                val ox = (mask % WALL_GRID_COLS) * WALL_PIECE_WIDTH
                val oy = (mask / WALL_GRID_COLS) * WALL_PIECE_HEIGHT
                val sprite = extractRegion(image, ox, oy, WALL_PIECE_WIDTH, WALL_PIECE_HEIGHT)
                sprites.add(sprite)
            }
            LOG.info("Loaded ${sprites.size} wall tile pieces")
            sprites
        } catch (e: Exception) {
            LOG.warn("Error loading wall tiles", e)
            null
        }
    }

    /**
     * Load furniture assets from resources.
     */
    fun loadFurnitureAssets(): LoadedAssets? {
        return try {
            val catalogStream = resourceStream("/webview/assets/furniture/furniture-catalog.json") ?: return null
            val catalogContent = catalogStream.bufferedReader().use { it.readText() }
            val catalogData = JsonParser.parseString(catalogContent).asJsonObject
            val assetsArray = catalogData.getAsJsonArray("assets") ?: return null

            val listType = object : TypeToken<List<FurnitureAsset>>() {}.type
            val catalog: List<FurnitureAsset> = gson.fromJson(assetsArray, listType)
            val sprites = mutableMapOf<String, List<List<String>>>()

            for (asset in catalog) {
                try {
                    var filePath = asset.file
                    if (!filePath.startsWith("assets/")) {
                        filePath = "assets/$filePath"
                    }
                    val assetStream = resourceStream("/webview/$filePath") ?: continue
                    val image = ImageIO.read(assetStream)
                    val spriteData = extractRegion(image, 0, 0, asset.width, asset.height)
                    sprites[asset.id] = spriteData
                } catch (e: Exception) {
                    LOG.warn("Error loading asset ${asset.id}", e)
                }
            }

            LOG.info("Loaded ${sprites.size} / ${catalog.size} furniture sprites")
            LoadedAssets(catalog, sprites)
        } catch (e: Exception) {
            LOG.warn("Error loading furniture assets", e)
            null
        }
    }

    /**
     * Extract a rectangular region from a BufferedImage and convert to SpriteData.
     * SpriteData format: 2D array of hex color strings, '' for transparent pixels.
     */
    private fun extractRegion(image: BufferedImage, x: Int, y: Int, width: Int, height: Int): List<List<String>> {
        val sprite = mutableListOf<List<String>>()
        for (row in 0 until height) {
            val rowData = mutableListOf<String>()
            for (col in 0 until width) {
                val px = x + col
                val py = y + row
                if (px >= image.width || py >= image.height) {
                    rowData.add("")
                    continue
                }
                val argb = image.getRGB(px, py)
                val a = (argb shr 24) and 0xFF
                if (a < PNG_ALPHA_THRESHOLD) {
                    rowData.add("")
                } else {
                    val r = (argb shr 16) and 0xFF
                    val g = (argb shr 8) and 0xFF
                    val b = argb and 0xFF
                    rowData.add("#${r.hex()}${g.hex()}${b.hex()}")
                }
            }
            sprite.add(rowData)
        }
        return sprite
    }

    private fun Int.hex(): String = toString(16).padStart(2, '0').uppercase()

    private fun resourceStream(path: String): InputStream? {
        return javaClass.getResourceAsStream(path)
    }
}
