// extract.js：提取（基线：一律给空表）
import { findSpans } from "./find.js";

export function extractInner(text) {
  return { inners: [], longest: 0 };
}
