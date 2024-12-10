import { useState } from "react";
import SkiMenu from "../menu/menu";
import SkiCourses from "./courses";
import SkiMap from "../map/map";
import Image from "next/image";
import { ToolMenu } from "../menu";
import { MenuType, MenuProps } from "../menu/data";
import { SkiTracksGame } from "../ski-tracks";
import { GameProps, GameProgress } from "../game/data";

export interface CourseProgress {
  id: string;
  active: boolean;
  points: number[];
  summit: number;
  rally: boolean;
  finished: boolean;
  deaths: number[][];
}

export default function Game({ map, rider, closeGame }: SkiTracksGame) {
  const [menu, setMenu] = useState<MenuProps | null>({ type: MenuType.start });
  const [progress, setProgress] = useState<GameProgress>({ current: [] });

  const game: GameProps = {
    rider,
    courses: map?.courses ?? [],
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
          <SkiCourses {...game} />
        </SkiMap>
      </div>
      <Image className="compass" height={70} width={70} src='./compass.svg' alt="Ski Compass" />
    </div>
  )
}
