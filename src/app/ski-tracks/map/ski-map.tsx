import { useEffect } from "react";
import { setPins } from "./util";
import { GameProps } from "../game";
import { useMap, useLog } from "./map";

function useSkiMap(game: GameProps) {
  const { progress } = game;
  const { map, mapBg, lock, unlock } = useMap(game);
  const { log, callLog } = useLog(game);
  useEffect(() => setPins(map, game), [map]);
  useEffect(() => {
    const route = progress?.current.find(r => r.active);
    if (route && !route.finished) {
      lock(route);
      const skins = route.points.length;
      const deaths = route.deaths.length;
      if (skins !== log.skins || deaths === log.deaths) setPins(map, game);
      callLog(route, [skins, deaths], mapBg);
    } else unlock();
  }, [map, progress]);
}

export default function SkiMap(game: GameProps) {
  useSkiMap(game);
  return <div id="SkiMap">{game.children}</div>;
}
