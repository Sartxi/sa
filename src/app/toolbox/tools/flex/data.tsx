import { CodeProp, CodeType } from "../../elements/code";
import { getFlexCss, getFlexHtml } from "./copy";

export interface FlexData {
  direction: any;
  items?: number;
  align?: string;
  justify?: string;
  wrap?: string;
  gap?: number;
  grow?: number;
}

interface FlexCode {
  code: CodeProp[];
}

function useFlex() {
  return (data: FlexData): FlexCode => {
    const css = getFlexCss(data);
    const html = getFlexHtml(data);
    return {
      code: [
        { code: css, type: CodeType.css },
        { code: html, type: CodeType.html }
      ]
    };
  }
}

export enum FlexValue { direction, items, align, justify, wrap };
type FlexValues = { [key in FlexValue]: string[]; };

export const flexValues: FlexValues = {
  [FlexValue.direction]: ['row', 'column'],
  [FlexValue.items]: ['2', '3', '4', '5', '6', '7', '8'],
  [FlexValue.align]: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
  [FlexValue.justify]: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
  [FlexValue.wrap]: ['nowrap', 'wrap', 'wrap-reverse'],
};

export function useFlexData() {
  const flex = useFlex();
  return { flex };
}