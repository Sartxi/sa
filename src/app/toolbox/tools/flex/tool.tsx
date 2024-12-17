import { useEffect, useState } from "react";
import { Tool, useToolIcon } from "../../toolbox";
import Image from "next/image";
import Code, { CodeProp } from "../../elements/code";
import { FlexValue, flexValues, useFlexData } from "./data";
import Select from "../../elements/select";
import FlexPreview from "./preview";

export default function FlexTool() {
  const icon = useToolIcon(Tool.Flex);
  const [code, setCode] = useState<CodeProp[] | null>(null);

  const [direction, setDirection] = useState('row');
  const [items, setItems] = useState<number>(2);
  const [align, setAlign] = useState<string | undefined>('center');
  const [justify, setJustify] = useState<string | undefined>('center');
  const [wrap, setWrap] = useState<string>('nowrap');
  const [gap, setGap] = useState<number | undefined>(1);
  const [grow, setGrow] = useState<number | undefined>();

  const { flex } = useFlexData();

  useEffect(() => {
    const data = flex({ direction, gap, items, align, justify, wrap, grow });
    setCode(data.code);
  }, [direction, gap, items, align, justify, wrap, grow]);

  const getElems = (length: number) => Array.from({ length }, (_, i) => i + 1);
  const getValues = (type: FlexValue) => {
    return flexValues[type];
  };

  return (
    <div id="FlexTool" className="section">
      <div className="toolbox">
        <h1>
          <Image src={icon} alt="Flex Tool Icon" width={35} height={35} />
          Flex Tool
        </h1>
        <div className="tool-content">
          <div className="inputs">
            <div className="result">
              <div className="flex-tools">
                <div className="tool-row">
                  <div className="tool-col">
                    <h3>Direction</h3>
                    <div className="select-btns direction">
                      {getValues(FlexValue.direction).map((type: string) => (
                        <div key={type} onClick={() => setDirection(type)} className={`${type} ${type === direction ? 'active' : ''}`}>
                          {getElems(3).map(i => (<span key={`${type}${i}`} className='psuedo-elem' />))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="tool-col">
                    <h3>Items</h3>
                    <div className="input">
                      <Select value={items.toString()} values={getValues(FlexValue.items)} changed={(val) => setItems(parseInt(val))} />
                    </div>
                  </div>
                </div>
                <div className="tool-row">
                  <div className="tool-col">
                    <h3>Align</h3>
                    <div className="input">
                      <Select value={align} values={getValues(FlexValue.align)} changed={(val) => setAlign(val)} />
                    </div>
                  </div>
                  <div className="tool-col">
                    <h3>Justify</h3>
                    <div className="input">
                      <Select value={justify} values={getValues(FlexValue.justify)} changed={(val) => setJustify(val)} />
                    </div>
                  </div>
                </div>
                <div className="tool-row">
                  <div className="tool-col">
                    <h3>Wrap</h3>
                    <div className="input">
                      <Select value={wrap} values={getValues(FlexValue.wrap)} changed={(val) => setWrap(val)} />
                    </div>
                  </div>
                  <div className="tool-col">
                    <h3>Gap</h3>
                    <div className="input">
                      <input className="tiny" type="number" value={gap} onChange={((event: any) => setGap(event.target.value))} />
                    </div>
                  </div>
                </div>
                <div className="result">
                  <FlexPreview data={{ direction, gap, items, align, justify, wrap }} grow={grow} setGrow={setGrow} />
                </div>
              </div>
            </div>
          </div>
          <Code code={code} />
        </div>
      </div>
    </div>
  )
}
