import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { MapIcon } from "./map/data";
import { GameMap, maps } from "./game/data";
import Game from "./game/game";

export interface SkiTracksProps {
  rider: MapIcon | boolean;
  map: GameMap;
  setMap: (map: GameMap) => void;
  setPlayer: (player: MapIcon) => void;
  closeGame?: () => void;
}

export default function SkiTracks() {
  const router = useRouter();
  const [play, setPlayer] = useState<MapIcon | boolean>(MapIcon.skier);
  const [map, setMap] = useState(maps[0]);

  useEffect(() => {
    document.documentElement.setAttribute('data-scrolling', 'false');
  }, []);

  return (
    <div id="SkiTracksGame">
      <Game
        map={map}
        setMap={(map: GameMap) => setMap(map)}
        setPlayer={(rider: MapIcon) => setPlayer(rider)}
        rider={play}
        closeGame={() => router.push('/')} />
    </div>
  );
}
