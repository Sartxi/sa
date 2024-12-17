import { useEffect, useState } from "react";
import { Tool, useToolIcon } from "../../elements/header";
import { ColorData, Process, useColorData } from "./data";
import Image from "next/image";
import Code, { CodeProp } from "../../elements/code";
import ColorPreview from "./preview";

function useResults(type: Process, shades: number): {
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
    let result;
    switch (type) {
      case Process.Shades:
        result = write.shades(hex, shades);
        break;
      case Process.Filter:
        result = write.filter(hex);
        break;
      case Process.Theme:
        result = write.theme(hex, shades);
        break;
      case Process.Harmony:
        result = write.harmony(hex);
        break;
    }
    if (result) {
      setData(result.data);
      setCode(result.code);
    }
  };

  return { code, data, send };
}

export default function ColorTool() {
  const icon = useToolIcon(Tool.Color);

  const [process, setProcess] = useState<Process>(Process.Shades);
  const [hex, setHex] = useState<string | null>(null);
  const [shades, setShades] = useState<number>(5);
  const [selectShades, setSelectShades] = useState<boolean>(false);

  const { data, code, send } = useResults(process, shades);

  useEffect(() => {
    if (hex) send(hex);
  }, [hex, process]);

  const handleChange = (event: any) => {
    setHex(event.target.value);
    const sample = document.getElementById('InputColor');
    if (sample) sample.style.backgroundColor = event.target.value;
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
              <div id="InputColor" className="submit-btn" onClick={() => send(hex)}></div>
              <input
                name="color"
                type="text"
                placeholder="#"
                onChange={handleChange}
                onKeyDown={(event: any) => { if (event.key === 'Enter') send(hex) }} />
            </div>
            <div className="processes">
              {Object.keys(Process).map((p: string) => {
                const key = Process[p as keyof typeof Process];
                return (
                  <div
                    key={key}
                    onClick={() => setProcess(key)}
                    className={`process${process === key ? ' active' : ''}`}>
                    {key} {key === Process.Shades ? <span className="select-shade" onClick={() => setSelectShades(!selectShades)}>{shades}</span> : ''}
                  </div>
                );
              })}
            </div>
            <div className="result">
              {selectShades ? (
                <div className="shades-select">
                  {[3, 4, 5, 6, 7, 8].map((num: number) => (<div key={num} className={num === shades ? 'active' : ''} onClick={() => {
                    setShades(num);
                    setSelectShades(false);
                  }}>{num}</div>))}
                </div>
              ) : (
                <ColorPreview code={code} data={data} process={process} />
              )}
            </div>
          </div>
          <Code code={code} />
        </div>
      </div>
    </div>
  )
}
