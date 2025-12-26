export declare class Store {
    data: any;
    runtime: any;
    rawEnv: Record<string, any>;
    setAll(obj: any): void;
    setRawEnv(rawEnvMap: Record<string, any>): void;
    get(path: string, fallback?: any): any;
    set(path: string, value: any): void;
    has(path: string): boolean;
    all(): any;
}
