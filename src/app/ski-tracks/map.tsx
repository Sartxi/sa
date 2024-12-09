import { useEffect, useState } from "react";
import { useMap, plan, skin } from "./map-util";
import { GameProgress, GameProps, RouteProgress } from "./game";

export enum MapIcon {
  trailhead = './trailsign.svg',
  point = './point.svg',
  pin = './pin.svg',
  skinner = './skiup.svg',
  skier = './skidown.svg',
  snowboarder = './boardown.svg',
  apres = './beer.svg',
  death = './death.svg',
  compass = './compassicon.svg',
  flake = './snowflake.svg',
  angle = './angle.svg',
  report = './report.svg'
}

export function useMapIconSize(icon: MapIcon) {
  switch (icon) {
    case MapIcon.point:
      return 15;
    case MapIcon.skinner:
    case MapIcon.skier:
    case MapIcon.snowboarder:
      return 35;
    case MapIcon.apres:
      return 45;
    default:
      return 30;
  }
}

function useSkiMap(progress: GameProgress | undefined, deaths: number[][], play: (event: RouteProgress) => void) {
  const map = document.getElementById('SkiMap');
  const [log, setLog] = useState<number>(0);
  const { lock, unlock } = useMap(map, progress, deaths);

  useEffect(() => plan(map, progress, deaths), [map, deaths]);
  useEffect(() => {
    const active = progress?.routes.find(r => r.active);
    if (active && !active.finished) lock(active);
    else unlock();
    const points = active?.points.length;
    if (points) {
      plan(map, progress, deaths);
      if (points !== log) {
        setLog(points);
        const index = active.points.findIndex(i => i === 1);
        const start = index === 0 ? `${active.id}Start` : `${active.id}${index}`;
        skin(start, `${active.id}${index + 1}`, () => {
          active.points[index] = 2;
          play(active);
        });
      }
    }
  }, [map, progress]);
}

export default function SkiMap({ children, progress, deaths, play }: GameProps) {
  useSkiMap(progress, deaths, play);
  return <div id="SkiMap">{children}</div>;
}
