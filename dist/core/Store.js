import { dotGet, dotSet } from "../utils/dot.js";
export class Store {
    constructor() {
        this.data = {};
        this.runtime = {};
    }
    setAll(obj) {
        this.data = obj;
    }
    get(path, fallback) {
        const val = dotGet(this.data, path);
        return val === undefined ? fallback : val;
    }
    set(path, value) {
        dotSet(this.runtime, path, value);
        dotSet(this.data, path, value);
    }
    has(path) {
        return dotGet(this.data, path) !== undefined;
    }
    all() {
        return this.data;
    }
}
