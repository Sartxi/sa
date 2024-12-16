import { useEffect, useState } from "react";
import { Tool, useToolIcon } from "../../elements/header";
import { ColorData, Process, useColorData } from "./data";
import Image from "next/image";
import Code, { CodeProp } from "../../elements/code";
import ColorPreview from "./preview";

function useResults(type: Process): {
  code: CodeProp[] | null;
  data: ColorData | null;
  send: (hex: string | null) => void;
} {
  const write = useColorData();
  const [data, setData] = useState<ColorData | null>(null);
  const [code, setCode] = useState<CodeProp[] | null>(null);

  useEffect(() => {
    setData(null);
    setCode(null);
  }, [type]);

  const send = (hex: string | null) => {
    let res;
    switch (type) {
      case Process.Shades:
        res = write.shades(hex);
        break;
      case Process.Filter:
        res = write.filter(hex);
        break;
      case Process.Theme:
        res = write.theme(hex);
        break;
      case Process.Harmony:
        res = write.harmony(hex);
        break;
    }
    if (res) {
      setData(res.data);
      setCode(res.code);
    }
  };

  return { code, data, send };
}

export default function ColorTool() {
  const icon = useToolIcon(Tool.Color);

  const [process, setProcess] = useState<Process>(Process.Shades);
  const [hex, setHex] = useState<string | null>(null);

  const { data, code, send } = useResults(process);

  const handleChange = (event: any) => {
    setHex(event.target.value);
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
              <Image className={`submit-btn ${hex ? 'val' : ''}`} src="./check.svg" width={20} height={20} alt="Submit" onClick={() => send(hex)} />
              <input name="color" type="text" placeholder="#" onChange={handleChange} onKeyDown={(event: any) => { if (event.key === 'Enter') send(hex); }} />
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
              <ColorPreview code={code} data={data} process={process} />
            </div>
          </div>
          <Code code={code} />
        </div>
      </div>
    </div>
  )
}
