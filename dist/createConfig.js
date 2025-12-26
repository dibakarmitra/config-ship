import { resolve } from "./core/Resolver.js";
import { Store } from "./core/Store.js";
import { detectPlatform } from "./platform/detect.js";
import { loadEnv, loadFile } from "./adapters/index.js";
export function createConfig(options = {}) {
    const store = new Store();
    const platform = detectPlatform();
    const envData = loadEnv(platform, options.envPrefix, options.envFile);
    const resolved = resolve({
        defaults: options.defaults || {},
        file: loadFile(platform, options.rootFile),
        env: envData.transformed,
        runtime: store.runtime,
    });
    store.setAll(resolved);
    store.setRawEnv(envData.raw);
    return {
        get: store.get.bind(store),
        set: store.set.bind(store),
        has: store.has.bind(store),
        all: store.all.bind(store),
    };
}
