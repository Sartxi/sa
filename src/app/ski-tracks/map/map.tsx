import { useState, useEffect } from "react";
import { useMedia } from "../../hooks/viewport";
import { GameProps, CourseProgress } from "../game/data";
import { skin, ski, died, centerMap } from "./animation";
import { listeners, getAxis, setPins, placePin, togglePin, getBgAxis } from "./util";
import { gameMaps, MapIcon } from "./data";

function useDrag(map: HTMLElement | null, setMap: () => void) {
  const { mobile, tablet, isDevice } = useMedia();
  const [locked, setLocked] = useState(false);
  const [stPos, setStPos] = useState<[number, number]>([0, 0]);
  const [bgPos, setBgPos] = useState<[number, number]>([0, 0]);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!map || locked) return;
    const isTouch = isDevice;
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

function useLog(game: GameProps) {
  const [log, setLog] = useState<[number, number]>([0, 0]);
  const [skins, deaths] = log;

  return {
    log: { skins, deaths },
    reset: () => setLog([0, 0]),
    update: (course: CourseProgress, updates: [number, number], mapBg: [number, number]) => {
      const playing = game.courses.find(r => r.id === course.id);
      if (!playing) return;

      const [hike, die] = updates;
      const rider = `${course.id}Finish`;
      const lastPin = `${course.id}${playing.points.length}`;

      if (course.summit > 1) {
        if (course.summit === 2) {
          placePin(rider, mapBg, playing.finish[0]);
          togglePin(lastPin, true);
        }
        if (course.summit === 3) {
          ski(rider, mapBg, playing.finish, () => {
            course.summit = 0;
            course.finished = true;
            game.play(course);
          });
        }
      }

      if (hike !== skins) {
        setLog([hike, deaths]);
        skin(course, point => {
          course.points[point] = 2;
          game.play(course);
        });
      }

      if (die !== deaths && course.active) {
        setLog([skins, die]);
        const start = playing.points[course.points.length - 1] ?? playing.start;
        const deathIndex = course.deaths.length - 1;
        const death = course.deaths[deathIndex];
        const rider = `Death${deathIndex}`;
        const startRider = course.summit === 2 ? game.rider : MapIcon.skinner;
        togglePin(`${course.id}${course.summit === 2 ? 'Finish' : course.points.length}`, true);
        died(rider, startRider, mapBg, start, death);
        placePin(rider, mapBg, death);
      }
    }
  };
}

function useMapEl() {
  const [map, setMap] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setMap(document.getElementById('SkiMap'));
  }, []);
  return map;
}

function useMap(game: GameProps) {
  const map = useMapEl();
  const { mapBg, center } = useDrag(map, () => setPins(map, game));
  return {
    map,
    mapBg,
    unlock: () => center(),
    lock: (active: CourseProgress) => {
      const course = game.courses.find(r => r.id === active.id);
      if (course) center(course.center);
    },
  };
}

function useSkiMap(game: GameProps) {
  const { progress } = game;
  const { map, mapBg, lock, unlock } = useMap(game);
  const { log, update, reset } = useLog(game);
  useEffect(() => setPins(map, game), [map]);
  useEffect(() => {
    const course = progress?.current.find(r => r.active);
    if (course && !course.finished) {
      lock(course);
      const skins = course.points.length;
      const deaths = course.deaths.length;
      if (skins !== log.skins || game.pastdeaths?.length) setPins(map, game);
      update(course, [skins, deaths], mapBg);
    } else {
      unlock();
      reset();
      setPins(map, game);
    };
  }, [map, progress]);
  return { hasMap: !!map };
}

function useMapPlotting(game: GameProps) {
  useEffect(() => {
    const map = document.getElementById('SkiMap');
    const getPosition = (event: any) => {
      if (map && game.devmode.enabled && game.devmode.mapPlotting) {
        const [a, c] = getBgAxis(map);
        const x = event.offsetX - parseInt(a);
        const y = event.offsetY - parseInt(c);
        console.log('clicked point:', x, y);
        console.log('background position:', a, c);
        const plotPoint = document.getElementById('MapPlotPoint');
        if (plotPoint) {
          plotPoint.style.left = `${x + parseInt(a)}px`;
          plotPoint.style.top = `${y + parseInt(c)}px`;
        }
      }
    }
    if (game.devmode.enabled) map?.addEventListener('click', getPosition);
    return () => {
      if (game.devmode.enabled) map?.removeEventListener('click', getPosition);
    }
  }, [game]);
}

export default function SkiMap(game: GameProps) {
  const { hasMap } = useSkiMap(game);
  useMapPlotting(game);
  const gameMap = gameMaps.find(map => map.id === game.map.id);
  if (!gameMap) return <div>No Game Map Selected</div>;
  return (
    <div id="SkiMap" style={{ backgroundImage: `url(${gameMap.src})` }}>
      {hasMap ? game.children : ''}
    </div>
  );
}
