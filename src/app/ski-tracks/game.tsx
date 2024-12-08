import { useState } from "react";
import SkiMenu, { MenuType, ToolMenu } from "./menu";
import SkiRoutes, { Route } from "./routes";
import SkiMap, { MapIcon } from "./map";
import Image from "next/image";

export interface SkiTracksGame {
  rider: MapIcon | boolean;
  closeGame?: () => void;
}

export interface GameProps {
  children?: any;
  rider: MapIcon | any;
  menu: MenuProps | null;
  progress: GameProgress | undefined;
  setMenu: (menu: MenuProps | null) => void;
  play: (event: RouteProgress) => void;
}

interface MenuProps {
  type: MenuType;
  route?: Route;
}

export interface RouteProgress {
  id: string;
  active: boolean;
  points: number[];
  summit: boolean;
  finished: boolean;
}

export interface GameProgress {
  routes: RouteProgress[];
}

export default function Game({ rider, closeGame }: SkiTracksGame) {
  const [menu, setMenu] = useState<MenuProps | null>({ type: MenuType.start });
  const [progress, setProgress] = useState<GameProgress>({ routes: [] });

  const game: GameProps = {
    rider,
    menu,
    setMenu,
    progress,
    play: (choice) => {
      const routes = progress?.routes.filter((r) => r.id !== choice.id) ?? [];
      setProgress({ routes: [...routes.map(r => ({ ...r, active: false })), choice] });
    }
  };

  if (typeof rider === 'boolean') return <span />;
  return (
    <div id="SkiTracks">
      {menu?.type !== MenuType.start && <Image className="trax-logo" height={100} width={100} src='./skitrax.svg' alt="Ski Tracks" />}
      <ToolMenu game={game} close={() => closeGame?.()} />
      <SkiMenu {...game} />
      <div id="GameArea">
        <SkiMap {...game}>
          <SkiRoutes {...game} />
        </SkiMap>
      </div>
      <Image className="compass" height={70} width={70} src='./compass.svg' alt="Ski Compass" />
    </div>
  )
}
