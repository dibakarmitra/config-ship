declare const Deno:
    | {
        env: {
            toObject(): Record<string, string>
        }
    }
    | undefined

declare const Bun:
    | {
        env: Record<string, string>
    }
    | undefined
