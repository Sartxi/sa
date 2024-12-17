import { useEffect, useState } from "react";
import ToolBoxHeader from "./elements/header";
import { ColorTool, FlexTool } from "./tools/tools";

export interface ToolsProps {
  activeTool: Tool;
  setTool: (tool: Tool) => void;
}

export enum Tool {
  Color = 'Color',
  Flex = 'Flex',
}

export function useToolIcon(tool: Tool) {
  switch (tool) {
    case Tool.Color:
      return '/color.svg';
    case Tool.Flex:
      return '/flex.svg';
    default:
      return '/element.svg';
  }
}

function Tools({ activeTool }: ToolsProps) {
  switch (activeTool) {
    case Tool.Color:
      return <ColorTool />
    case Tool.Flex:
      return <FlexTool />
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
