import Image from "next/image";
import { GameProps } from "../../game/data";

export default function StartMenu({ rider, setMenu }: GameProps) {
  return (
    <div className="menu">
      <div className="menu-header">
        <Image height={140} width={140} src='./skitrax.svg' alt="Ski Tracks" />
        <span>
          <h4>Welcome to</h4>
          <h1>Skin Tracks</h1>
          <p>A backcountry skiing game by Sean Archibeque</p>
        </span>
      </div>
      <div className="menu-body">
        <div>
          <p><strong>Objective:</strong></p><br />
          <p>Find courses, bag peaks, then rally down and crack a cold one. But watch out for trouble and stay out of avalanches!</p>
        </div>
        <div className="player">
          <p>Playing As:</p>
          <Image className="rider" height={100} width={100} src={rider} alt="rider" />
        </div>
      </div>
      <button className="sa-cta" onClick={() => setMenu(null)}>
        Start Game
      </button>
    </div>
  )
}
