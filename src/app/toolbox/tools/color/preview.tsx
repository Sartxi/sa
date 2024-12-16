import Image from "next/image";
import { Process, ProcessResult } from "./data";

interface ColorPreviewProps extends ProcessResult {
  process: Process;
}

export default function ColorPreview({ process, data, code }: ColorPreviewProps) {
  if (!code || !data) return <span className="nohex">Add hex code to see preview</span>
  switch (process) {
    case Process.Shades:
      return (
        <div className="preview shades">
          {data.shades?.map((shade: string, i: number) => {
            return (
              <div key={shade}>
                <span className="sample" style={{ backgroundColor: shade }} />
                {i ? `Shade ${i}` : 'Original'}
              </div>
            )
          })}
        </div>
      )
    case Process.Filter:
      const compare = ['before', 'after'];
      return (
        <div className="preview filters">
          <div>
            {compare.map(i => {
              const style = i === 'after' ? { filter: data.filter } : {};
              return (
                <div key={i} className='image'>
                  {i}<Image style={style} src="./beer.svg" height={100} width={100} alt={i} />
                </div>
              )
            })}
          </div>
          {data.message}
        </div>
      )
    case Process.Theme:
      const themedata = data?.theme ?? {};
      const theme = Object.entries(themedata).map(([key, value]) => ({ key, value }));
      return (
        <div className="preview theme">
          {theme ? theme.map(({ key, value }: any) => {
            return (
              <div key={key}>
                <span className="sample" style={{ backgroundColor: value }} />
                {key}
              </div>
            )
          }) : <span className="nohex">No theme generated</span>}
        </div>
      )
    case Process.Harmony:
      const HarmonyData = data?.harmony ?? {};
      const harmony = Object.entries(HarmonyData).map(([key, value]) => ({ key, value }));
      return (
        <div className="preview theme">
          {harmony ? harmony.map(({ key, value }: any) => {
            return (
              <div key={key}>
                {value.map((v: string) => (<span key={`key${v}`} className="sample" style={{ backgroundColor: v }} />))}
                {key}
              </div>
            )
          }) : <span className="nohex">No harmony generated</span>}
        </div>
      )
    default:
      return <span />
  }
}
