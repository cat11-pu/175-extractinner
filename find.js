// find.js：从左往右一次扫描找成对圆括号区间。
// 每个字符只看一次：遇 '(' 记起点并等待最近的 ')'；
// 未闭合、嵌套（内层再遇 '('）、或在括号外遇到 ')' 都算不配对，报 E_UNPAIRED。
export const PAREN_ERROR_CODE = "E_UNPAIRED";

export function parenError(message) {
  const error = new Error(message);
  error.code = PAREN_ERROR_CODE;
  return error;
}

export function findSpans(text) {
  const source = text == null ? "" : String(text);
  const spans = [];
  let openAt = -1;
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === "(") {
      if (openAt !== -1) {
        throw parenError("检测到嵌套的圆括号");
      }
      openAt = i;
    } else if (ch === ")") {
      if (openAt === -1) {
        throw parenError("出现多余的右括号");
      }
      spans.push([openAt, i]);
      openAt = -1;
    }
  }
  if (openAt !== -1) {
    throw parenError("存在未闭合的左括号");
  }
  return spans;
}
