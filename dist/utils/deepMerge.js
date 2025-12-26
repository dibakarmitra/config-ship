export function deepMerge(target, source) {
    if (!isObject(target) || !isObject(source))
        return source;
    for (const key in source) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            continue;
        }
        target[key] =
            key in target
                ? deepMerge(target[key], source[key])
                : source[key];
    }
    return target;
}
function isObject(val) {
    return val && typeof val === "object" && !Array.isArray(val);
}
