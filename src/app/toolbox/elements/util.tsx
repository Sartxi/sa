function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function getColorShades(hex: string | null, num: number = 6) {
  if (hex) {
    const shades = [];
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    const step = 255 / num;
    for (let i = 0; i < num; i++) {
      const r = Math.round(Math.max(0, rgb.r - i * step));
      const g = Math.round(Math.max(0, rgb.g - i * step));
      const b = Math.round(Math.max(0, rgb.b - i * step));
      if (!(r == 0 && g == 0 && b == 0)) shades.push(rgbToHex(r, g, b));
    }
    return shades;
  }
}
