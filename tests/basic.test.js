import { createConfig } from "../dist/index.js";

console.log("Running basic.test.js...", createConfig);

function assert(cond, msg) {
    if (!cond) {
        throw new Error(msg);
    }
}

const config = createConfig({
    defaults: {
        app: { name: "TestApp" },
        db: { host: "localhost", port: 3306 },
    },
});

assert(config.get("app.name") === "TestApp", "default app.name failed");
assert(config.get("db.host") === "localhost", "default db.host failed");

config.set("db.host", "127.0.0.1");
assert(config.get("db.host") === "127.0.0.1", "runtime override failed");

assert(config.has("db.port") === true, "has() failed");

console.log("✔ basic.test.js passed");
