import { deepMerge } from "../utils/deepMerge.js"

export function resolve(layers: {
    defaults: any
    file: any
    env: any
    runtime: any
}) {
    let result = {}
    result = deepMerge(result, layers.defaults)
    result = deepMerge(result, layers.file)
    result = deepMerge(result, layers.env)
    result = deepMerge(result, layers.runtime)
    return result
}
