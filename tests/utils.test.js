import { describe, it } from "node:test";
import assert from "node:assert";
import { deepMerge } from "../dist/utils/deepMerge.js";
import { dotGet, dotSet } from "../dist/utils/dot.js";
import { parseEnv } from "../dist/utils/parseEnv.js";

describe("Utils", () => {
    describe("deepMerge", () => {
        it("should merge two objects deeply", () => {
            const target = { a: 1, b: { c: 2 } };
            const source = { b: { d: 3 }, e: 4 };
            const result = deepMerge(target, source);

            assert.deepStrictEqual(result, { a: 1, b: { c: 2, d: 3 }, e: 4 });
        });

        it("should overwrite non-object values", () => {
            const target = { a: 1 };
            const source = { a: 2 };
            const result = deepMerge(target, source);

            assert.strictEqual(result.a, 2);
        });

        it("should handle arrays by replacing them (not merging)", () => {
            const target = { a: [1, 2] };
            const source = { a: [3, 4] };
            const result = deepMerge(target, source);

            assert.deepStrictEqual(result.a, [3, 4]);
        });

        it("should return source if target is not an object", () => {
            const result = deepMerge(null, { a: 1 });
            assert.deepStrictEqual(result, { a: 1 });
        });
    });

    describe("dot", () => {
        it("dotGet should retrieve nested values", () => {
            const obj = { a: { b: { c: 1 } } };
            assert.strictEqual(dotGet(obj, "a.b.c"), 1);
        });

        it("dotGet should return undefined for missing paths", () => {
            const obj = { a: 1 };
            assert.strictEqual(dotGet(obj, "a.b.c"), undefined);
        });

        it("dotSet should set nested values", () => {
            const obj = {};
            dotSet(obj, "a.b.c", 1);
            assert.deepStrictEqual(obj, { a: { b: { c: 1 } } });
        });

        it("dotSet should merge into existing objects", () => {
            const obj = { a: { other: 2 } };
            dotSet(obj, "a.b", 1);
            assert.deepStrictEqual(obj, { a: { other: 2, b: 1 } });
        });
    });

    describe("parseEnv", () => {
        it("should parse basic key-value pairs", () => {
            const content = "KEY=value\nOTHER=123";
            const result = parseEnv(content);
            assert.deepStrictEqual(result, { KEY: "value", OTHER: "123" });
        });

        it("should handle comments and empty lines", () => {
            const content = "# comment\n\nKEY=value\n  # another comment";
            const result = parseEnv(content);
            assert.deepStrictEqual(result, { KEY: "value" });
        });

        it("should strip quotes", () => {
            const content = "KEY=\"value\"\nOTHER='value'";
            const result = parseEnv(content);
            assert.deepStrictEqual(result, { KEY: "value", OTHER: "value" });
        });

        it("should trim whitespace", () => {
            const content = "  KEY  =  value  ";
            const result = parseEnv(content);
            assert.deepStrictEqual(result, { KEY: "value" });
        });
    });
});
