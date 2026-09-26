// extract.js：按区间把括号内的内容原样取出，不做二次解析。
import { findSpans } from "./find.js";

export function extractInner(text) {
  const spans = findSpans(text);
  const inners = spans.map(function (span) {
    return text.slice(span[0] + 1, span[1]);
  });
  let longest = 0;
  for (const inner of inners) {
    if (inner.length > longest) {
      longest = inner.length;
    }
  }
  return { inners: inners, longest: longest };
}
