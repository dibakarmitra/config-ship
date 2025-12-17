export function dotGet(obj, path) {
    return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}
export function dotSet(obj, path, value) {
    var _a;
    const keys = path.split(".");
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        cur[_a = keys[i]] ?? (cur[_a] = {});
        cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = value;
}
