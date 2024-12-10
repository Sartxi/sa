import { useEffect, useState } from "react";
import Image from "next/image";
import { MapIcon } from "./map/data";
import { GameMap, maps } from "./game/data";
import Game from "./game/game";

export interface SkiTracksGame {
  rider: MapIcon | boolean;
  map: GameMap;
  closeGame?: () => void;
}

function SkierEggs({ play }: { play: (player: any) => void }) {
  const riders = [MapIcon.skier, MapIcon.snowboarder];
  const getType = (rider: MapIcon) => {
    let type = 'skier';
    if (rider === MapIcon.snowboarder) type = 'boarder';
    return type;
  };
  return (
    riders.map((rider) => {
      const type = getType(rider);
      return (
        <Image
          key={rider}
          src={rider}
          width={20}
          height={20}
          className={`${type} ski-egg`}
          alt="ski tracks player"
          onClick={() => play(rider)} />
      )
    })
  );
}


export default function SkiTracks() {
  const [play, setPlay] = useState<MapIcon | boolean>(false);
  const [map] = useState(maps[0]);

  useEffect(() => {
    document.documentElement.setAttribute('data-scrolling', play ? 'false' : 'true');
  }, [play]);

  if (!play) return <SkierEggs play={setPlay} />;
  return <Game map={map} rider={play} closeGame={() => setPlay(false)} />;
}