import { useEffect, useState } from "react";
import { useMap, plan, skin } from "./map-util";
import { GameProgress, GameProps } from "./game";

export enum MapIcon {
  trailhead = './trailsign.svg',
  point = './point.svg',
  pin = './pin.svg',
  skinner = './skiup.svg',
  skier = './skidown.svg',
  snowboarder = './boardown.svg',
  apres = './beer.svg'
}

export function useMapIconSize(icon: MapIcon) {
  switch (icon) {
    case MapIcon.point:
      return 15;
    case MapIcon.skinner:
    case MapIcon.skier:
    case MapIcon.snowboarder:
      return 35;
    default:
      return 30;
  }
}

function useSkiMap(progress: GameProgress | undefined, play: any) {
  const map = document.getElementById('SkiMap');
  const [updated, setUpdated] = useState<number>(0);
  const navigate = useMap(map, progress);

  useEffect(() => plan(map, progress), [map]);
  useEffect(() => {
    const active = progress?.routes.find(r => r.active);
    const updates = active?.points.length;
    if (updates) {
      plan(map, progress);
      if (updates !== updated) {
        setUpdated(updates);
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

export default function SkiMap({ progress, play, children }: GameProps) {
  useSkiMap(progress, play);
  return <div id="SkiMap">{children}</div>;
}
