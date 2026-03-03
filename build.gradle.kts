plugins {
    id("java")
    id("org.jetbrains.kotlin.jvm") version "2.1.0"
    id("org.jetbrains.intellij.platform") version "2.5.0"
}

group = providers.gradleProperty("pluginGroup").get()
version = providers.gradleProperty("pluginVersion").get()

repositories {
    mavenCentral()
    intellijPlatform {
        defaultRepositories()
    }
}

dependencies {
    intellijPlatform {
        create(providers.gradleProperty("platformType").get(), providers.gradleProperty("platformVersion").get())
        pluginVerifier()
    }
    implementation("com.google.code.gson:gson:2.11.0")
}

kotlin {
    jvmToolchain(providers.gradleProperty("javaVersion").get().toInt())
}

intellijPlatform {
    pluginConfiguration {
        id = "com.pixelagents.jetbrains"
        name = "Stormies - Pixel Agents"
        version = providers.gradleProperty("pluginVersion").get()
        description = """
            Pixel art office where your Claude Code agents come to life as animated characters.
            Watch your AI coding assistants work in a charming virtual office environment.
        """.trimIndent()
        vendor {
            name = "Stormies"
        }
        ideaVersion {
            sinceBuild = "243"
        }
    }
    buildSearchableOptions = false
}

// Task to build the webview UI
val buildWebview by tasks.registering(Exec::class) {
    workingDir = file("webview-ui")
    commandLine("npm", "run", "build")
    // Only run if webview-ui sources changed
    inputs.dir("webview-ui/src")
    inputs.file("webview-ui/package.json")
    inputs.file("webview-ui/vite.config.ts")
    outputs.dir("webview-ui/dist")
}

// Copy built webview assets to resources
val copyWebviewAssets by tasks.registering(Copy::class) {
    dependsOn(buildWebview)
    from("webview-ui/dist")
    into("src/main/resources/webview")
}

tasks.named("processResources") {
    dependsOn(copyWebviewAssets)
}
