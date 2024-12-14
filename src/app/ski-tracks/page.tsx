'use client'

import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { MapIcon } from "./map/data";
import { GameMap, maps } from "./game/data";
import Game from "./game/game";

export interface SkiTracksGame {
  rider: MapIcon | boolean;
  map: GameMap;
  setMap: (map: GameMap) => void;
  setPlayer: (player: MapIcon) => void;
  closeGame?: () => void;
}

export default function SkiTracksPage() {
  const [play, setPlayer] = useState<MapIcon | boolean>(MapIcon.skier);
  const [map, setMap] = useState(maps[0]);

  useEffect(() => {
    document.documentElement.setAttribute('data-scrolling', play ? 'false' : 'true');
  }, [play]);

  return (
    <div id="SkiTracksGame">
      <Game
        map={map}
        setMap={(map) => setMap(map)}
        setPlayer={(rider: MapIcon) => setPlayer(rider)}
        rider={play}
        closeGame={() => redirect('/')} />
    </div>
  );
}
