import { test } from "node:test";
import assert from "node:assert";
import { deepMerge } from "../dist/utils/deepMerge.js";

test("should prevent prototype pollution via __proto__", (t) => {
    const payload = JSON.parse('{"__proto__":{"polluted":true}}');
    const target = {};

    deepMerge(target, payload);

    assert.strictEqual(
        {}.polluted,
        undefined,
        "Object.prototype should not be polluted"
    );
});

test("should prevent prototype pollution via constructor", (t) => {
    const payload = JSON.parse(
        '{"constructor":{"prototype":{"polluted":true}}}'
    );
    const target = {};

    deepMerge(target, payload);

    assert.strictEqual(
        {}.polluted,
        undefined,
        "Object.prototype should not be polluted via constructor"
    );
});

test("should prevent prototype pollution via prototype", (t) => {
    const payload = JSON.parse('{"prototype":{"polluted":true}}');
    const target = {};

    deepMerge(target, payload);

    assert.strictEqual(
        {}.polluted,
        undefined,
        "Object.prototype should not be polluted via prototype"
    );
});
