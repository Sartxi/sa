import { useState } from "react";
import SkiMenu, { MenuType } from "./menu";
import SkiRoutes, { Route } from "./routes";
import SkiMap from "./map";

export interface SkiTracksGame {
  rider: any;
  closeGame?: () => void;
}

export interface GameProps {
  rider: string;
  menu: MenuProps | null;
  setMenu: (m: MenuProps | null) => void;
  progress: GameProgress | undefined;
  play: (decision: RouteProgress) => void;
  children?: any;
}

interface MenuProps {
  type: MenuType;
  route?: Route;
}

export interface RouteProgress {
  id: string;
  active: boolean;
  points: number[];
  finished: boolean;
}

export interface GameProgress {
  routes: RouteProgress[];
}

export interface PlayGame {
  makeDecision: (update: RouteProgress) => void;
}

export default function Game({ rider, closeGame }: SkiTracksGame) {
  const [menu, setMenu] = useState<MenuProps | null>({ type: MenuType.start });
  const [progress, setProgress] = useState<GameProgress>({ routes: [] });

  const game: GameProps = {
    rider,
    menu,
    setMenu,
    progress,
    play: (decision) => {
      const routes = progress?.routes.filter((r) => r.id !== decision.id) ?? [];
      setProgress({ routes: [...routes, decision] });
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
