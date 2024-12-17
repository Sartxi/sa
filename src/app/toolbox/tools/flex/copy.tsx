import { FlexData } from "./data";

export function getFlexCss(data: FlexData) {
  const { direction, align, justify, wrap, gap, grow } = data;
  const alignItems = align ? `\n  align-items: ${align};` : '';
  const justifyContent = justify ? `\n  justify-content: ${justify};` : '';
  const wrapping = wrap ? `\n  flex-wrap: ${wrap};` : '';
  const flexgap = wrap ? `\n  gap: ${gap}px;` : '';
  const flexgrow = grow ? `\n\n.flex-layout .item${data.grow} {\n  flex-grow: 1;\n}` : '';
  return `.flex-layout {\n  display: flex;\n  flex-direction: ${direction};${alignItems}${justifyContent}${wrapping}${flexgap}\n}${flexgrow}`;
}

export function getFlexHtml(data: FlexData) {
  const { items } = data;
  const divs = items ? Array.from({ length: items }, (_, i) => i + 1) : [1];
  return `<div class="flex-layout">\n ${divs.map((i) => `<div class="item${i}">${i}</div>`).join('\n ')}\n</div>`;
};
