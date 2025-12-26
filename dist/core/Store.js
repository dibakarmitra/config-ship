import { dotGet, dotSet } from "../utils/dot.js";
export class Store {
    constructor() {
        this.data = {};
        this.runtime = {};
        this.rawEnv = {};
    }
    setAll(obj) {
        this.data = obj;
    }
    setRawEnv(rawEnvMap) {
        this.rawEnv = rawEnvMap;
    }
    get(path, fallback) {
        const val = dotGet(this.data, path);
        if (val !== undefined)
            return val;
        if (path in this.rawEnv)
            return this.rawEnv[path];
        return fallback;
    }
    set(path, value) {
        dotSet(this.runtime, path, value);
        dotSet(this.data, path, value);
    }
    has(path) {
        return dotGet(this.data, path) !== undefined || path in this.rawEnv;
    }
    all() {
        return this.data;
    }
}
