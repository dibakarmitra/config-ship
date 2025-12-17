export function detectPlatform() {
    if (typeof Deno !== "undefined")
        return "deno";
    if (typeof Bun !== "undefined")
        return "bun";
    return "node";
}
