import { getColorHarmonyCss, getColorShadeCss, getColorThemeCss } from "./copy";
import { getColorHarmony, getColorFilter, getColorShades, getColorTheme } from "./util";
import { CodeType, CodeProp } from "../../elements/code";


export enum Process {
  Shades = 'Shades',
  Filter = 'Filter',
  Theme = 'Theme',
  Harmony = 'Harmony',
}

export interface ProcessResult {
  data: ColorData | null;
  code: CodeProp[] | null;
}

export interface ColorTheme {
  primary: string;
  secondary: string;
  tertiary: string;
  complement: string;
  shade1: string;
  shade2: string;
  shade3: string;
  shade4: string;
}

export interface ColorData {
  shades?: string[] | undefined;
  code?: string;
  filter?: string;
  message?: string;
  theme?: ColorTheme;
  harmony?: HarmonyData;
}

export interface HarmonyData {
  primary: string[];
  analogous: string[];
  complementary: string[];
  split: string[];
  tetradic: string[];
  triadic: string[];
}

function useShades() {
  return (hex: string | undefined, shades: number): ProcessResult => {
    let code = '';
    const data: ColorData = getColorShades(hex, shades);
    if (data.shades?.length) code = getColorShadeCss(data.shades);
    return { data, code: [{ code, type: CodeType.css }] };
  };
}

function useFilter() {
  return (hex: string | undefined): ProcessResult => {
    const { code, filter, message }: ColorData = getColorFilter(hex);
    return { data: { filter, message }, code: [{ code, type: CodeType.css }] };
  };
}

function useTheme() {
  return (hex: string | undefined, shades: number): ProcessResult => {
    const { theme }: ColorData = getColorTheme(hex, shades);
    return { data: { theme }, code: [{ code: getColorThemeCss(theme), type: CodeType.css }] };
  }
}

function useHarmony() {
  return (hex: string | undefined): ProcessResult => {
    const { harmony }: ColorData = getColorHarmony(hex);
    return { data: { harmony }, code: [{ code: getColorHarmonyCss(harmony), type: CodeType.css }] };
  }
}

export function useColorData() {
  const shades = useShades();
  const filter = useFilter();
  const theme = useTheme();
  const harmony = useHarmony();
  return { shades, filter, theme, harmony };
}
