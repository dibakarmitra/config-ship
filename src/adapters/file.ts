import { createRequire } from "node:module"
import { resolve } from "node:path"

export function loadFile(
    platform: "node" | "deno" | "bun",
    path?: string
) {
    if (!path) return {}

    try {
        if (platform === "deno") {
            // async import planned for v0.2
            return {}
        }

        const require = createRequire(import.meta.url)
        const absPath = resolve(process.cwd(), path)

        const mod = require(absPath)
        return mod?.default ?? mod ?? {}
    } catch (error: any) {
        if (error?.code !== 'MODULE_NOT_FOUND') {
            console.warn(`[ConfigShip] Failed to load config file at "${path}":`, error.message)
        }
        return {}
    }
}
