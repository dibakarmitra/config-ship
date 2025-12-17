export function detectPlatform(): "node" | "deno" | "bun" {
    if (typeof Deno !== "undefined") return "deno"
    if (typeof Bun !== "undefined") return "bun"
    return "node"
}
