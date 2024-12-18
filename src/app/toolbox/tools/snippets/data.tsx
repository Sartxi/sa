import { CodeType } from "../../elements/code";
import { getMapEnum, getMapObject, getReduceMulti, getReducePromise } from "./copy";

export enum Snippet {
  objectMap = 'Map object to array',
  enumMap = 'Map enum to array',
  reduceMulti = 'Reduce array to multiple arrays',
  reducePromise = 'Reduce array of promises'
}

export function useSnippet() {
  return (snippet: Snippet | undefined) => {
    if (snippet) {
      switch (snippet) {
        case Snippet.objectMap:
          const snip = getMapObject();
          return {
            code: [{ code: snip, type: CodeType.javascript }]
          };
        case Snippet.enumMap:
          const enMap = getMapEnum();
          return {
            code: [{ code: enMap, type: CodeType.typescript }]
          };
        case Snippet.reduceMulti:
          const reMulti = getReduceMulti();
          return {
            code: [{ code: reMulti, type: CodeType.javascript }]
          };
        case Snippet.reducePromise:
          const reProm = getReducePromise();
          return {
            code: [{ code: reProm, type: CodeType.javascript }]
          };
        default:
          return null;
      }
    }
  }
}
