import { resolve } from "./core/Resolver.js"
import { Store } from "./core/Store.js"
import { detectPlatform } from "./platform/detect.js"
import { loadEnv, loadFile } from "./adapters/index.js"

export function createConfig(options: {
    defaults?: any
    envPrefix?: string
    envFile?: string
    rootFile?: string
} = {}) {
    const store = new Store()
    const platform = detectPlatform()

    const resolved = resolve({
        defaults: options.defaults || {},
        file: loadFile(platform, options.rootFile),
        env: loadEnv(platform, options.envPrefix, options.envFile),
        runtime: store.runtime,
    })

    store.setAll(resolved)

    return {
        get: store.get.bind(store),
        set: store.set.bind(store),
        has: store.has.bind(store),
        all: store.all.bind(store),
    }
}
