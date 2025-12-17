import { describe, it } from "node:test";
import assert from "node:assert";
import { loadEnv } from "../dist/adapters/env.js";
import { loadFile } from "../dist/adapters/file.js";
import { resolve } from "node:path";

describe("Adapters", () => {
    describe("loadEnv", () => {
        it("should load process.env values", () => {
            process.env.TEST_APP__PORT = "8080";
            const result = loadEnv("node", "TEST_");
            assert.strictEqual(result.app.port, 8080);
            delete process.env.TEST_APP__PORT;
        });

        it("should parse boolean and numbers", () => {
            process.env.TEST_BOOL = "true";
            process.env.TEST_NUM = "123";
            const result = loadEnv("node", "TEST_");
            assert.strictEqual(result.bool, true);
            assert.strictEqual(result.num, 123);
            delete process.env.TEST_BOOL;
            delete process.env.TEST_NUM;
        });

        it("should handle nested keys with double underscore", () => {
            process.env.TEST_DB__HOST = "localhost";
            const result = loadEnv("node", "TEST_");
            assert.strictEqual(result.db.host, "localhost");
            delete process.env.TEST_DB__HOST;
        });
    });

    describe("loadFile", () => {
        it("should return empty object if path is missing", () => {
            const result = loadFile("node", undefined);
            assert.deepStrictEqual(result, {});
        });

        it("should return empty object if file not found", () => {
            const result = loadFile("node", "./non-existent.js");
            assert.deepStrictEqual(result, {});
        });

        it("should load package.json as a config file", () => {
            // Using package.json as a stable existing file
            const result = loadFile("node", "package.json");
            assert.strictEqual(result.name, "config-ship");
        });
    });
});
