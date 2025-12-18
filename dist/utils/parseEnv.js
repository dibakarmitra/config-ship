export function parseEnv(content) {
    const result = {};
    const lines = content.split("\n");
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#"))
            continue;
        const [key, ...values] = trimmed.split("=");
        if (!key)
            continue;
        let value = values.join("=");
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        value = value.trim();
        if (value === "")
            continue;
        result[key.trim()] = value;
    }
    return result;
}
