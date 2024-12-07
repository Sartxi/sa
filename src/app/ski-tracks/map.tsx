import { useEffect, useState } from "react";
import { useMedia } from "../hooks/viewport";
import { useDraggable, setPoints, animatePoint } from "./util";
import { GameProgress, GameProps } from "./game";

function useGameMap(progress: GameProgress | undefined, play: any) {
  const map = document.getElementById('SkiMap');
  const [updated, setUpdated] = useState<number>(0);
  const { mobile, tablet } = useMedia();
  useDraggable(map, mobile, tablet, () => setPoints(map, progress));
  useEffect(() => setPoints(map, progress), [map]);
  useEffect(() => {
    const active = progress?.routes.find(r => r.active);
    const updates = active?.points.length;
    if (updates) {
      setPoints(map, progress);
      if (updates !== updated) {
        setUpdated(updates);
        const ind = active.points.findIndex(i => i === 1);
        const start = ind === 0 ? `${active.id}Start` : `${active.id}${ind}`;
        const end = `${active.id}${ind + 1}`;
        animatePoint(start, end);
        setTimeout(() => {
          active.points[ind] = 2;
          play(active);
        }, 1000);
      }
    }
  }, [map, progress]);
}

export default function SkiMap({ progress, play, children }: GameProps) {
  useGameMap(progress, play);
  return (
    <div id="SkiMap">
      {children}
    </div>
  );
}
