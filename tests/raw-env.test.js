import { test } from "node:test";
import assert from "node:assert";
import { createConfig } from "../dist/index.js";

test("Raw Environment Variable Names", async (t) => {
    await t.test("should support raw env name lookup", () => {
        process.env.APP_NAME = "Test Application";

        const config = createConfig({
            defaults: {},
            envPrefix: "APP_",
        });

        assert.strictEqual(
            config.get("APP_NAME"),
            "Test Application",
            "Raw env name should work"
        );
        assert.strictEqual(
            config.get("name"),
            "Test Application",
            "Transformed name should still work"
        );
    });

    await t.test("should support raw nested env names", () => {
        process.env.APP_DB__HOST = "localhost";
        process.env.APP_DB__PORT = "5432";

        const config = createConfig({
            defaults: {},
            envPrefix: "APP_",
        });

        assert.strictEqual(
            config.get("APP_DB__HOST"),
            "localhost",
            "Raw nested name should work"
        );
        assert.strictEqual(
            config.get("db.host"),
            "localhost",
            "Transformed nested name should work"
        );
        assert.strictEqual(
            config.get("APP_DB__PORT"),
            5432,
            "Raw nested name with number should work"
        );
        assert.strictEqual(
            config.get("db.port"),
            5432,
            "Transformed should parse number"
        );
    });

    await t.test("transformed name should take priority over raw", () => {
        process.env.APP_TEST = "raw-value";

        const config = createConfig({
            defaults: { test: "default-value" },
            envPrefix: "APP_",
        });

        assert.strictEqual(
            config.get("test"),
            "raw-value",
            "Transformed lookup should work"
        );
        assert.strictEqual(
            config.get("APP_TEST"),
            "raw-value",
            "Raw lookup should also work"
        );
    });

    await t.test("fallback should work with raw names", () => {
        const config = createConfig({
            defaults: {},
            envPrefix: "APP_",
        });

        assert.strictEqual(
            config.get("APP_MISSING", "fallback"),
            "fallback",
            "Fallback should work for missing raw name"
        );
    });

    await t.test("has() should work with raw names", () => {
        process.env.APP_EXISTS = "yes";

        const config = createConfig({
            defaults: {},
            envPrefix: "APP_",
        });

        assert.strictEqual(
            config.has("APP_EXISTS"),
            true,
            "has() should return true for raw name"
        );
        assert.strictEqual(
            config.has("exists"),
            true,
            "has() should return true for transformed name"
        );
        assert.strictEqual(
            config.has("APP_NOT_EXISTS"),
            false,
            "has() should return false for missing name"
        );
    });

    await t.test("should auto-parse values from raw env names", () => {
        process.env.APP_BOOL = "true";
        process.env.APP_NUMBER = "42";
        process.env.APP_STRING = "hello";

        const config = createConfig({
            defaults: {},
            envPrefix: "APP_",
        });

        assert.strictEqual(
            config.get("APP_BOOL"),
            true,
            "Boolean should be parsed"
        );
        assert.strictEqual(
            config.get("APP_NUMBER"),
            42,
            "Number should be parsed"
        );
        assert.strictEqual(
            config.get("APP_STRING"),
            "hello",
            "String should remain string"
        );
    });
});
