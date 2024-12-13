import { Buttons } from "@/app/elements";
import { DevMode, DevModes } from "../../game/data";

interface DevMenuProps {
  mode: DevMode;
  setModes: (modes: DevModes) => void;
}

export default function DevModeMenu({ mode, setModes }: DevMenuProps) {
  if (!mode.enabled) return <span />;

  const current: DevModes = {
    mapPlotting: mode.mapPlotting,
    skipTransition: mode.skipTransition
  };

  const modes = [
    { style: 'small inverse', text: mode.mapPlotting ? 'ON' : 'OFF', callback: () => setModes({ ...current, mapPlotting: !current.mapPlotting }) },
    { style: 'small inverse', text: mode.skipTransition ? 'ON' : 'OFF', callback: () => setModes({ ...current, skipTransition: !current.skipTransition }) }
  ];

  return (
    <div className="dev-mode-menu">
      {mode.mapPlotting ? <div id="MapPlotPoint" /> : ''}
      <Buttons buttons={modes} />
    </div>
  )
};
