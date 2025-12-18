const pollutionKeywords = [
    '__proto__',
    'constructor',
    'prototype'
];

function isValidKey(key: string): boolean {
    return typeof key === 'string' &&
        key !== '' &&
        !pollutionKeywords.includes(key);
}

export function dotGet(obj: any, path: string) {
    if (obj === null || typeof obj !== 'object') return undefined;

    return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj)
}

export function dotSet(obj: any, path: string, value: any) {
    if (obj === null || typeof obj !== 'object') return false;

    const keys = path.split(".")
    let cur = obj

    for (let i = 0; i < keys.length - 1; i++) {
        if (!isValidKey(keys[i])) return false;

        cur[keys[i]] ??= {}
        cur = cur[keys[i]]
    }

    const lastKey = keys[keys.length - 1]
    
    if (!isValidKey(lastKey)) return false;
    cur[lastKey] = value

    return true
}