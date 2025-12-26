export declare function createConfig(options?: {
    defaults?: any;
    envPrefix?: string;
    envFile?: string;
    rootFile?: string;
}): {
    get: (path: string, fallback?: any) => any;
    set: (path: string, value: any) => void;
    has: (path: string) => boolean;
    all: () => any;
};
