import { useState } from "react";
import SkiMenu from "../menu/menu";
import SkiCourses from "./courses";
import SkiMap from "../map/map";
import Image from "next/image";
import DevModeMenu from "../menu/menus/devmode";
import { ToolMenu } from "../menu/menus";
import { MenuType, MenuProps } from "../menu/data";
import { SkiTracksGame } from "../ski-tracks";
import { GameProps, GameProgress, DevModes } from "../game/data";
import { useSearchParams } from "next/navigation";

export default function Game({ map, rider, closeGame }: SkiTracksGame) {
  const searchParams = useSearchParams();
  const devmode = searchParams.get('devmode');

  const [menu, setMenu] = useState<MenuProps | null>({ type: MenuType.start });
  const [progress, setProgress] = useState<GameProgress>({ current: [] });
  const [gameDeaths, setGameDeaths] = useState<number[][] | null>(null);
  const [devmodes, setDevModes] = useState<DevModes>({
    mapPlotting: false,
    skipTransition: false
  });

  const game: GameProps = {
    rider,
    courses: map?.courses ?? [],
    menu,
    setMenu,
    progress,
    pastdeaths: gameDeaths,
    devmode: { enabled: devmode, ...devmodes },
    setPastDeaths: (deaths: number[][] | null) => setGameDeaths(deaths),
    play: (choice) => {
      const routes = progress?.current.filter((r) => r.id !== choice.id) ?? [];
      setProgress({ current: [...routes.map(r => ({ ...r, active: false })), choice] });
    }
  };

  if (typeof rider === 'boolean') return <span />;
  return (
    <div id="SkiTracks">
      {menu?.type !== MenuType.start && <Image className="trax-logo" height={80} width={80} src='./skitrax.svg' alt="Ski Tracks" />}
      <DevModeMenu mode={game.devmode} setModes={(modes: DevModes) => setDevModes(modes)} />
      <ToolMenu game={game} close={() => closeGame?.()} />
      <SkiMenu {...game} />
      <div id="GameArea">
        <SkiMap {...game}>
          <SkiCourses {...game} />
        </SkiMap>
      </div>
      <Image className="compass" height={70} width={70} src='./compass.svg' alt="Ski Compass" />
    </div>
  )
}
