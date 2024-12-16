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

export const getColorFilterCss = () => {
  return `
filter: invert(26%) sepia(86%) saturate(521%) hue-rotate(85deg) brightness(97%) contrast(95%);
filter: invert(26%) sepia(86%) saturate(521%) hue-rotate(85deg) brightness(97%) contrast(95%);
`;
};