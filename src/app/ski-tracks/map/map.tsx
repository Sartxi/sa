import { useState, useEffect } from "react";
import { useMedia } from "../../hooks/viewport";
import { GameProps, RouteProgress } from "../game";
import { skin, ski, centerMap } from "./animation";
import { listeners, getAxis, setPins, placePin } from "./util";

function useDrag(map: HTMLElement | null, setMap: () => void) {
  const { mobile, tablet } = useMedia();
  const [locked, setLocked] = useState(false);
  const [stPos, setStPos] = useState<[number, number]>([0, 0]);
  const [bgPos, setBgPos] = useState<[number, number]>([0, 0]);
  const [dragging, setDragging] = useState(false);

  // turn on to set centers
  // console.log(bgPos);

  useEffect(() => {
    if (!map || locked) return;
    const isTouch = mobile || tablet;
    const [starting, moving, ending] = listeners(isTouch);

    const down = (e: any) => {
      setDragging(true);
      const [x, y] = getAxis(e, isTouch);
      setStPos([x - bgPos[0], y - bgPos[1]]);
      map.style.cursor = 'grabbing';
    };

    const move = (e: any) => {
      if (!dragging) return;
      e.preventDefault();
      const [x, y] = getAxis(e, isTouch);
      setBgPos([x - stPos[0], y - stPos[1]]);
      map.style.backgroundPosition = `${bgPos[0]}px ${bgPos[1]}px`;
      setMap();
    }

    const up = () => {
      setDragging(false);
      map.style.cursor = 'grab';
    }

    map.addEventListener(starting, down);
    map.addEventListener(moving, move);
    document.addEventListener(ending, up);

    return () => {
      map.removeEventListener(starting, down);
      map.removeEventListener(moving, move);
      document.removeEventListener(ending, up);
    }
  }, [map, mobile, tablet, setMap]);

  return {
    mapBg: bgPos,
    center: (axis?: [number, number][]) => {
      if (axis) {
        if (locked) return;
        setLocked(true);
        map?.classList.add('locked');
        const newPos = mobile ? axis[2] : tablet ? axis[1] : axis[0];
        setBgPos(newPos);
        centerMap(map, setMap, bgPos, newPos);
      } else {
        setLocked(false);
        map?.classList.remove('locked');
      }
    }
  };
}

export function useLog(game: GameProps) {
  const [log, setLog] = useState<[number, number]>([0, 0]);
  const [skins, deaths] = log;

  return {
    log: { skins, deaths },
    callLog: (route: RouteProgress, updates: [number, number], mapBg: [number, number]) => {
      const playing = game.routes.find(r => r.id === route.id);
      const [hike, die] = updates;
      const rider = `${route.id}Finish`;
      if (route.summit === 3 && playing) {
        ski(rider, mapBg, playing.finish, () => {
          route.summit = 0;
          game.play(route);
        });
      }
      if (hike !== skins) {
        setLog([hike, deaths]);
        skin(route, point => {
          route.points[point] = 2;
          if (route.summit === 1 && playing) placePin(rider, mapBg, playing.finish[0]);
          game.play(route);
        });
      }
      if (die !== deaths) {
        setLog([skins, die]);
      }
    }
  };
}

export function useMap(game: GameProps) {
  const map = document.getElementById('SkiMap');
  const { mapBg, center } = useDrag(map, () => setPins(map, game));
  return {
    map,
    mapBg,
    unlock: () => center(),
    lock: (active: RouteProgress) => {
      const route = game.routes.find(r => r.id === active.id);
      if (route) center(route.center);
    },
  };
}
