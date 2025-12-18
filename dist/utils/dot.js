const pollutionKeywords = [
    '__proto__',
    'constructor',
    'prototype'
];
function isValidKey(key) {
    return typeof key === 'string' &&
        key !== '' &&
        !pollutionKeywords.includes(key);
}
export function dotGet(obj, path) {
    if (obj === null || typeof obj !== 'object')
        return undefined;
    return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}
export function dotSet(obj, path, value) {
    var _a;
    if (obj === null || typeof obj !== 'object')
        return false;
    const keys = path.split(".");
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!isValidKey(keys[i]))
            return false;
        cur[_a = keys[i]] ?? (cur[_a] = {});
        cur = cur[keys[i]];
    }
    const lastKey = keys[keys.length - 1];
    if (!isValidKey(lastKey))
        return false;
    cur[lastKey] = value;
    return true;
}
