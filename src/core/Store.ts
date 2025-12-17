import { dotGet, dotSet } from "../utils/dot.js"

export class Store {
    data: any = {}
    runtime: any = {}

    setAll(obj: any) {
        this.data = obj
    }

    get(path: string, fallback?: any) {
        const val = dotGet(this.data, path)
        return val === undefined ? fallback : val
    }

    set(path: string, value: any) {
        dotSet(this.runtime, path, value)
        dotSet(this.data, path, value)
    }

    has(path: string) {
        return dotGet(this.data, path) !== undefined
    }

    all() {
        return this.data
    }
}
