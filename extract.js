// extract.js：按出现顺序取出每个成对圆括号区间里的内容（空内容也算一段）。
// 内容直接按区间切片，绝不做二次解析；最长段按字符数统计。
import { findSpans } from "./find.js";

export function extractInner(text) {
  const source = text == null ? "" : String(text);
  const spans = findSpans(source);
  const inners = [];
  let longest = 0;
  for (let i = 0; i < spans.length; i += 1) {
    const inner = source.slice(spans[i][0] + 1, spans[i][1]);
    inners.push(inner);
    if (inner.length > longest) {
      longest = inner.length;
    }
  }
  return { inners, longest };
}
