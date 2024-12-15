import { useState } from "react";
import { Tool, useToolIcon } from "./header";
import { getColorShadeCss } from "./data";
import { getColorShades } from "./util";
import Image from "next/image";
import Code, { CodeType } from "./code";

function useShades() {
  const createShades = (hex: string | null) => {
    const shades = getColorShades(hex);
    let code = '';
    if (shades?.length) code = getColorShadeCss(shades);
    return { shades, code };
  };
  return createShades;
}

enum Process {
  Shades = 'Shades',
  Theme = 'Theme',
  Filter = 'Filter',
}

function Processor({ process, vars, code }: { process: Process; vars: any; code: any }) {
  if (!code || !vars) return <span className="nohex">Add hex code to see preview</span>
  switch (process) {
    case Process.Shades:
      return (
        <div className="processor">
          {vars.map((shade: string, i: number) => {
            return (
              <div key={shade}>
                <span className="cube" style={{ backgroundColor: shade }} />
                color{i ? `-shade${i}` : ''}
              </div>
            )
          })}
        </div>
      )
    default:
      return <span />
  }
}

export default function ColorTool() {
  const icon = useToolIcon(Tool.Color);
  const [process, setProcess] = useState<Process>(Process.Shades);
  const [hex, setHex] = useState<string | null>(null);
  const [vars, setVars] = useState<any>(null);
  const [code, setCode] = useState<string | null>(null);
  const createShades = useShades();

  const handleChange = (event: any) => {
    setHex(event.target.value.toUpperCase());
  };

  const submit = () => {
    if (process === Process.Shades && hex) {
      const { shades, code } = createShades(hex);
      setCode(code);
      setVars(shades);
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') submit();
  };

  return (
    <div id="ColorTool" className="section">
      <div className="toolbox">
        <h1>
          <Image src={icon} alt="Color Tool Icon" width={35} height={35} />
          Color Tools
        </h1>
        <div className="tool-content">
          <div className="inputs">
            <div className="input">
              <label>Hex Value</label>
              <Image className={`submit-btn ${hex ? 'val' : ''}`} src="./check.svg" width={20} height={20} alt="Submit" onClick={() => submit()} />
              <input name="color" type="text" placeholder="#" onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
            <div className="processes">
              {Object.keys(Process).map((p: string) => {
                const key = Process[p as keyof typeof Process];
                return (
                  <div key={key} onClick={() => setProcess(key)} className={`process${process === key ? ' active' : ''}`}>
                    {key}
                  </div>
                );
              })}
            </div>
            <div className="result">
              <Processor code={code} vars={vars} process={process} />
            </div>
          </div>
          <Code type={CodeType.css} code={code} cleared={() => console.log('clear')} />
        </div>
      </div>
    </div>
  )
}