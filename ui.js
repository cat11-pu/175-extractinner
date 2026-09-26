// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "文本长度 " + String(spec.text || "").length + "，点提取看括号里的内容。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.inners.forEach(function (text, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 段";
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = text === "" ? "空内容" : text;
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "提取 " + view.count + " 段，最长 " + view.longest + " 个字符";
    parts.log.textContent = "拼接后长度 " + view.joined;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "提取括号内";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "末尾加一段";
  addButton.addEventListener("click", function () {
    spec.text = String(spec.text || "") + "(extra)";
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一段";
  dropButton.addEventListener("click", function () {
    spec.text = String(spec.text || "").slice(0, -7);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一段文本";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "a(x)b";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { text: box.value }));
      parts.out.textContent = box.value + " 提取出 " + JSON.stringify(view.inners);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看段数";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "段数 " + view.count + "，最长 " + view.longest;
  });
  parts.controls.appendChild(readButton);

  draw();
}
