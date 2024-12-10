import Image from "next/image";
import { GameProps } from "../game/data";
import { MapIcon } from "../map/data";

export default function ToolMenu({ close, game }: { game: GameProps; close: () => void }) {
  const completes = game.progress?.current.filter(r => r.finished);
  return (
    <div className="tool-menu">
      {completes?.map(r => <Image key={`fin${r.id}`} src={MapIcon.apres} width={25} height={25} alt="finish" />)}
      <button className="close-game" onClick={() => close()}>Quit Game</button>
    </div>
  )
}