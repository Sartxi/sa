import { useEffect, useState } from "react";
import Image from "next/image";
import Game from "./game";
import { MapIcon } from "./map/data";
import { maps } from "./ski-routes";


export default function SkiTracks() {
  const [play, setPlay] = useState<MapIcon | boolean>(false);
  const [map] = useState(maps[0]);

  useEffect(() => {
    document.documentElement.setAttribute('data-scrolling', play ? 'false' : 'true');
  }, [play]);

  if (!play) return (
    <>
      <Image
        src={MapIcon.skier}
        width={20}
        height={20}
        className="skier egg"
        alt="ski codes"
        onClick={() => setPlay(MapIcon.skier)} />
      <Image
        src={MapIcon.snowboarder}
        width={20}
        height={20}
        className="boarder egg"
        alt="snowboard codes"
        onClick={() => setPlay(MapIcon.snowboarder)} />
    </>
  )
  return <Game map={map} rider={play} closeGame={() => setPlay(false)} />
}