import { ColorTheme, HarmonyData } from "./data";

function write(vars: string[]) {
  return `:root {\n  ${vars.join('\n  ')}\n}`;
}

export function getColorShadeCss(shades: string[] | undefined) {
  if (!shades) return '';
  const colors = shades.map((color: string, i: number) => (`--${i > 0 ? `shade-${i}` : 'primary'}: ${color};`));
  return write(colors);
};

export function getColorThemeCss(theme: ColorTheme | undefined) {
  if (!theme) return '';
  const vars: string[] = [];
  Object.entries(theme).forEach(([key, value]: string[]) => {
    vars.push(`--${key}: ${value};`);
  });
  return write(vars);
}

export function getColorHarmonyCss(harmony: HarmonyData | undefined) {
  if (!harmony) return '';
  const vars: string[] = [];
  Object.entries(harmony).forEach(([key, values]: [string, string[]]) => {
    const colors = values.map((color: string, i: number) => (`--${key}${i > 0 ? `-${i + 1}` : ''}: ${color};`));
    vars.push(...colors);
  });
  return write(vars);
}
