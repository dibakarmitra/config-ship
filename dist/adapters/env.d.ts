export declare function loadEnv(platform: "node" | "deno" | "bun", prefix?: string, envFile?: string): {
    transformed: any;
    raw: Record<string, any>;
};
