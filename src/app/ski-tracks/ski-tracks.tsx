import { useState } from "react";
import Image from "next/image";
import Game from "./game";

const downski = '/skidown.svg';
const downboard = '/boardown.svg';


export default function SkiTracks() {
  const [play, setPlay] = useState<string | boolean>(false);

  if (!play) return (
    <>
      <Image
        src={downski}
        width={20}
        height={20}
        className="skier egg"
        alt="ski codes"
        onClick={() => setPlay(downski)} />
      <Image
        src={downboard}
        width={20}
        height={20}
        className="boarder egg"
        alt="snowboard codes"
        onClick={() => setPlay(downboard)} />
    </>
  )
  return <Game rider={play} closeGame={() => setPlay(false)} />
}