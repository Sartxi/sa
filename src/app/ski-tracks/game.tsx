import { useState } from "react";
import SkiMenu, { MenuType } from "./menu/menu";
import SkiRoutes, { Route, GameMap } from "./ski-routes";
import SkiMap from "./map/ski-map";
import { MapIcon } from "./map/data";
import Image from "next/image";
import { ToolMenu } from "./menu";

export interface SkiTracksGame {
  rider: MapIcon | boolean;
  map: GameMap;
  closeGame?: () => void;
}

export interface GameProps {
  children?: any;
  routes: Route[];
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
  summit: number;
  rally: boolean;
  finished: boolean;
  deaths: number[][];
}

export interface GameProgress {
  current: RouteProgress[];
}

export default function Game({ map, rider, closeGame }: SkiTracksGame) {
  const [menu, setMenu] = useState<MenuProps | null>({ type: MenuType.start });
  const [progress, setProgress] = useState<GameProgress>({ current: [] });

  const game: GameProps = {
    rider,
    routes: map?.routes ?? [],
    menu,
    setMenu,
    progress,
    play: (choice) => {
      const routes = progress?.current.filter((r) => r.id !== choice.id) ?? [];
      setProgress({ current: [...routes.map(r => ({ ...r, active: false })), choice] });
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
