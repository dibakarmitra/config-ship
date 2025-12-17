import { deepMerge } from "../utils/deepMerge.js";
export function resolve(layers) {
    let result = {};
    result = deepMerge(result, layers.defaults);
    result = deepMerge(result, layers.file);
    result = deepMerge(result, layers.env);
    result = deepMerge(result, layers.runtime);
    return result;
}
