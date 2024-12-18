import { useEffect, useState } from "react";
import { Tool, useToolIcon } from "../../toolbox";
import Image from "next/image";
import Code, { CodeProp } from "../../elements/code";
import { Snippet, useSnippet } from "./data";

export default function SnippetTool() {
  const icon = useToolIcon(Tool.Snippets);
  const [active, setActive] = useState<Snippet | undefined>(Snippet.objectMap);
  const [code, setCode] = useState<CodeProp[] | null>(null);

  const getSnippet = useSnippet();

  useEffect(() => {
    const snip = getSnippet(active);
    if (snip) setCode(snip.code);
  }, [active])

  return (
    <div id="SnippetTool" className="section">
      <div className="toolbox">
        <h1>
          <Image src={icon} alt="Snippet Tool Icon" width={35} height={35} />
          Snippet Tool
        </h1>
        <div className="tool-content">
          <div className="inputs">
            <div className="result">
              <div className="snip-tools">
                {Object.keys(Snippet).map((snip: string) => {
                  const text = Snippet[snip as keyof typeof Snippet];
                  return (
                    <div key={snip} className="pod snippet" onClick={() => setActive(text)}>
                      {text}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <Code code={code} />
        </div>
      </div>
    </div>
  )
}