// app.js：渲染结果
import { findSpans } from "./find.js";
import { extractInner } from "./extract.js";

export function render(spec) {
  const text = String(spec.text || "");
  const spans = findSpans(text);
  const view = extractInner(text);
  const inners = view.inners || [];
  return { inners: inners, count: inners.length, longest: view.longest || 0,
           spans: spans.length,
           joined: inners.reduce((sum, item) => sum + item.length, 0),
           original: text.length };
}
