import Image from "next/image";
import { Process, ProcessResult } from "./data";

interface ColorPreviewProps extends ProcessResult {
  process: Process;
}

export default function ColorPreview({ process, data, code }: ColorPreviewProps) {
  if (!code || !data) return <span className="nohex">Add hex value to preview</span>
  switch (process) {
    case Process.Shades:
      return (
        <div className="preview shades">
          {data.shades?.map((shade: string, i: number) => {
            return (
              <div key={shade}>
                <span className="sample" style={{ backgroundColor: shade }} />
                <span className="label">{i ? `Shade${i}` : 'Primary'}</span>
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
          <span className="nohex">{data.message}</span>
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
                <span className={`sample ${theme.length > 10 ? 'small' : ''}`} style={{ backgroundColor: value }} />
                <span className="label">{key}</span>
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
                {value.map((color: string) => (<span key={`key${color}`} className="sample" style={{ backgroundColor: color }} />))}
                <span className="label">{key}</span>
              </div>
            )
          }) : <span className="nohex">No harmony generated</span>}
        </div>
      )
    default:
      return <span />
  }
}
