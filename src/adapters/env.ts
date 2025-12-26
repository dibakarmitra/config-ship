import { dotSet } from "../utils/dot.js"
import { parseEnv } from "../utils/parseEnv.js"
import * as fs from "node:fs"

export function loadEnv(
    platform: "node" | "deno" | "bun",
    prefix = "",
    envFile?: string
) {
    let source: any = {}

    if (envFile && platform === "node" && fs.existsSync(envFile)) {
        try {
            const content = fs.readFileSync(envFile, "utf-8")
            const fileEnv = parseEnv(content)
            source = { ...fileEnv }
        } catch {
            // ignore
        }
    }
    if (platform === "deno" && typeof Deno !== "undefined") {
        source = { ...source, ...Deno.env.toObject() }
    } else if (platform === "bun" && typeof Bun !== "undefined") {
        source = { ...source, ...Bun.env }
    } else {
        source = { ...source, ...process.env }
    }

    const result: any = {}
    const rawEnvMap: Record<string, any> = {}

    for (const key in source) {
        if (prefix && !key.startsWith(prefix)) continue

        // Store raw env name
        rawEnvMap[key] = parse(source[key])

        // Transform and store
        const clean = prefix ? key.slice(prefix.length) : key
        const path = clean.toLowerCase().split("__").join(".")

        dotSet(result, path, parse(source[key]))
    }

    return { transformed: result, raw: rawEnvMap }
}

function parse(value: string) {
    if (value === "") return value;
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "null") return null;
    if (value === "undefined") return undefined;

    const num = Number(value);
    if (!isNaN(num) && value.trim() !== "") return num;

    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}
