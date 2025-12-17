import { describe, it } from "node:test";
import assert from "node:assert";
import { Store } from "../dist/core/Store.js";
import { resolve } from "../dist/core/Resolver.js";

describe("Core", () => {
    describe("Store", () => {
        it("should initialize empty", () => {
            const store = new Store();
            assert.deepStrictEqual(store.all(), {});
        });

        it("setAll should populate data", () => {
            const store = new Store();
            store.setAll({ a: 1 });
            assert.strictEqual(store.get("a"), 1);
        });

        it("get should retrieve nested values", () => {
            const store = new Store();
            store.setAll({ a: { b: 2 } });
            assert.strictEqual(store.get("a.b"), 2);
        });

        it("get should return fallback if undefined", () => {
            const store = new Store();
            assert.strictEqual(store.get("c", "default"), "default");
        });

        it("set should update runtime and data", () => {
            const store = new Store();
            store.setAll({ a: 1 });
            store.set("a", 2);
            assert.strictEqual(store.get("a"), 2);
            assert.strictEqual(store.runtime.a, 2);
        });

        it("has should return correct existence", () => {
            const store = new Store();
            store.setAll({ a: 1 });
            assert.strictEqual(store.has("a"), true);
            assert.strictEqual(store.has("b"), false);
        });
    });

    describe("Resolver", () => {
        it("should merge layers in correct order (defaults < file < env < runtime)", () => {
            const layers = {
                defaults: { a: 1, b: 1, c: 1, d: 1 },
                file: { b: 2, c: 2, d: 2 },
                env: { c: 3, d: 3 },
                runtime: { d: 4 },
            };
            const result = resolve(layers);

            assert.strictEqual(result.a, 1);
            assert.strictEqual(result.b, 2);
            assert.strictEqual(result.c, 3);
            assert.strictEqual(result.d, 4);
        });

        it("should deep merge layers", () => {
            const layers = {
                defaults: { app: { name: "Default", port: 3000 } },
                file: { app: { port: 4000 } },
                env: {},
                runtime: {},
            };
            const result = resolve(layers);

            assert.deepStrictEqual(result.app, { name: "Default", port: 4000 });
        });
    });
});
