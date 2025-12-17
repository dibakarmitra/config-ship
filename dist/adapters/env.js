import { dotSet } from "../utils/dot.js";
import { parseEnv } from "../utils/parseEnv.js";
import * as fs from "node:fs";
export function loadEnv(platform, prefix = "", envFile) {
    let source = {};
    if (envFile && platform === "node" && fs.existsSync(envFile)) {
        try {
            const content = fs.readFileSync(envFile, "utf-8");
            const fileEnv = parseEnv(content);
            source = { ...fileEnv };
        }
        catch {
            // ignore
        }
    }
    if (platform === "deno") {
        source = { ...source, ...Deno.env.toObject() };
    }
    else if (platform === "bun") {
        source = { ...source, ...Bun.env };
    }
    else {
        source = { ...source, ...process.env };
    }
    const result = {};
    for (const key in source) {
        if (prefix && !key.startsWith(prefix))
            continue;
        const clean = prefix ? key.slice(prefix.length) : key;
        const path = clean.toLowerCase().split("__").join(".");
        dotSet(result, path, parse(source[key]));
    }
    return result;
}
function parse(value) {
    if (value === "true")
        return true;
    if (value === "false")
        return false;
    if (!isNaN(Number(value)))
        return Number(value);
    try {
        return JSON.parse(value);
    }
    catch {
        return value;
    }
}
