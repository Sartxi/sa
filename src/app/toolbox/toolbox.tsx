import { useEffect, useState } from "react";
import ToolBoxHeader, { Tool } from "./elements/header";
import { ColorTool, FlexTool, GridTool, ListTool } from "./elements/tools";

export interface ToolsProps {
  activeTool: Tool;
  setTool: (tool: Tool) => void;
}

function Tools({ activeTool }: ToolsProps) {
  switch (activeTool) {
    case Tool.Color:
      return <ColorTool />
    case Tool.Flex:
      return <FlexTool />
    case Tool.Grid:
      return <GridTool />
    case Tool.List:
      return <ListTool />
    default:
      return <span />;
  }
}

export default function ToolBox() {
  const [active, setActive] = useState(Tool.Color);

  useEffect(() => {
    document.documentElement.setAttribute('data-scrolling', 'false');
  }, []);

  return (
    <div id="ToolBox">
      <ToolBoxHeader active={active} setActive={setActive} />
      <div className="tools">
        <Tools activeTool={active} setTool={setActive} />
      </div>
    </div>
  );
}
