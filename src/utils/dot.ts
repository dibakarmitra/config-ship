export function dotGet(obj: any, path: string) {
    return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj)
}

export function dotSet(obj: any, path: string, value: any) {
    const keys = path.split(".")
    let cur = obj

    for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] ??= {}
        cur = cur[keys[i]]
    }

    cur[keys[keys.length - 1]] = value
}
