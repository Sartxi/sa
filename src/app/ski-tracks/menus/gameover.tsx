import Image from "next/image";
import { GameProps } from "../game";
import { MapIcon } from "../map";
import { MenuType } from "../menu";

export default function GameOver({ play, setMenu, progress, setDeaths }: GameProps) {
  const active = progress?.routes.find((route) => route.active);
  const decide = (startOver: boolean) => {
    if (active) {
      active.active = false;
      active.points = [];
      if (startOver) setDeaths([]);
      play(active);
      setMenu(startOver ? { type: MenuType.start } : null);
    }
  }
  return (
    <div className="menu">
      <h1>
        <span className="icon">
          <Image
            src={MapIcon.death}
            alt="Game Over"
            width={35}
            height={35}
            priority
          />
        </span>
        Game Over
      </h1>
      <p>Dangit, you died in an avalanche. Checking the avalanche forcast and avoiding avalanche terrain is the best choice if you want to stay on top!</p>
      <div className="gameover-ctas">
        <button className="sa-cta" onClick={() => decide(false)}>
          Pretend I did not die
        </button>
        <button className="sa-cta" onClick={() => decide(true)}>
          Start Game Over
        </button>
      </div>
    </div>
  )
}