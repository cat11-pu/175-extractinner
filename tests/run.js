import assert from "node:assert";
import { findSpans } from "../find.js";
import { extractInner } from "../extract.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("findSpans returns a list", () => {
  assert.ok(Array.isArray(findSpans("(a)")));
});

check("extractInner returns inners", () => {
  assert.ok(Array.isArray(extractInner("(a)").inners));
});

check("extractInner returns longest", () => {
  assert.strictEqual(typeof extractInner("(a)").longest, "number");
});

check("render counts inners", () => {
  assert.strictEqual(typeof render({ text: "(a)" }).count, "number");
});

check("render exposes original length", () => {
  assert.strictEqual(typeof render({ text: "(a)" }).original, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
