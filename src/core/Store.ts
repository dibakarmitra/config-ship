import { dotGet, dotSet } from "../utils/dot.js"

export class Store {
    data: any = {}
    runtime: any = {}
    rawEnv: Record<string, any> = {}

    setAll(obj: any) {
        this.data = obj
    }

    setRawEnv(rawEnvMap: Record<string, any>) {
        this.rawEnv = rawEnvMap
    }

    get(path: string, fallback?: any) {
        const val = dotGet(this.data, path)
        if (val !== undefined) return val

        if (path in this.rawEnv) return this.rawEnv[path]

        return fallback
    }

    set(path: string, value: any) {
        dotSet(this.runtime, path, value)
        dotSet(this.data, path, value)
    }

    has(path: string) {
        return dotGet(this.data, path) !== undefined || path in this.rawEnv
    }

    all() {
        return this.data
    }
}
