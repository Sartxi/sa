import { ColorTheme, HarmonyData } from "./data";

export const getColorShadeCss = (shades: string[]) => {
  return `:root {
  --color: ${shades[0]};
  --color-shade1: ${shades[1]};
  --color-shade2: ${shades[2]};
  --color-shade3: ${shades[3]};
  --color-shade4: ${shades[4]};
}
`;
};

export const getColorThemeCss = (theme: ColorTheme | undefined) => {
  if (!theme) return '';
  return `:root {
  --primary: ${theme.primary};
  --secondary: ${theme.secondary};
  --tertiary: ${theme.tertiary};
  --complimentary: ${theme.complimentary};
  --primary-shade1: ${theme.shade1};
  --primary-shade2: ${theme.shade2};
  --primary-shade3: ${theme.shade3};
  --primary-shade4: ${theme.shade4};
}
`;
}

export const getColorHarmonyCss = (harmony: HarmonyData | undefined) => {
  if (!harmony) return '';
  const variables: any = [];
  Object.entries(harmony).forEach(([key, values]: any) => {
    const colors = values.map((color: string, i: number) => (`--${key}${i > 0 ? `-${i + 1}` : ''}: ${color};`));
    variables.push(...colors);
  });
  return `:root {
  ${variables.join('\n  ')}
}`
}
