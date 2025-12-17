import { createConfig } from "../dist/index.js";

const config = createConfig({
    envPrefix: "PAY_",
    defaults: {
        app: { name: "PayFlow", env: "local" },
        db: { host: "localhost", port: 3306 },
        gateway: { default: "razorpay" },
    },
    envFile: ".env.example",
    rootFile: "test.config.ts",
});

console.log("App:", config.get("app.name"));
console.log("Env:", config.get("app.env"));
console.log("DB Host:", config.get("db.host"));
console.log("Gateway Default:", config.get("gateway.default"));

config.set("app.env", "production");
console.log("Runtime Env:", config.get("app.env"));
