import { useState } from "react";
import SkiMenu, { MenuType } from "./menu";
import SkiRoutes, { Route } from "./routes";
import SkiMap, { MapIcon } from "./map";

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
      setProgress({ routes: [...routes, choice] });
    }
  };

  if (typeof rider === 'boolean') return <span />;
  return (
    <div id="SkiTracks">
      <button className="close-game" onClick={() => closeGame?.()}>End Game</button>
      <SkiMenu {...game} />
      <div id="GameArea">
        <SkiMap {...game}>
          <SkiRoutes {...game} />
        </SkiMap>
      </div>
    </div>
  )
}
