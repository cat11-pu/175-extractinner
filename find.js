// find.js：单次从左往右扫描（预算五万字符，每个字符只看一次），找出成对圆括号的区间。
// 区间形如 [左括号下标, 右括号下标]；嵌套、缺右括号、多出右括号一律报 E_UNPAIRED。

function unpairedError(message) {
  const error = new Error(message);
  error.code = "E_UNPAIRED";
  return error;
}

export function findSpans(text) {
  const spans = [];
  let openAt = -1;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "(") {
      if (openAt !== -1) {
        throw unpairedError("位置 " + i + " 出现嵌套的左括号");
      }
      openAt = i;
    } else if (ch === ")") {
      if (openAt === -1) {
        throw unpairedError("位置 " + i + " 多出右括号");
      }
      spans.push([openAt, i]);
      openAt = -1;
    }
  }
  if (openAt !== -1) {
    throw unpairedError("位置 " + openAt + " 的左括号没有配对的右括号");
  }
  return spans;
}
