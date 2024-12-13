import Image from "next/image";
import { GameProps } from "../../game/data";
import { Buttons } from "@/app/elements";
import { useState } from "react";
import { GameMap, gameMaps } from "../../map/data";
import MapViewer from "../../map/viewer";

export default function StartMenu({ rider, setMenu }: GameProps) {
  const [viewMap, setViewMap] = useState<GameMap | null>(null);
  if (viewMap) return <MapViewer map={viewMap} close={() => setViewMap(null)} />;
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
          <br />
          <p><strong>Maps:</strong></p><br />
          <ul>
            {gameMaps.map((map: GameMap) => (<li key={map.id} onClick={() => setViewMap(map)}>{map.id}</li>))}
          </ul>
        </div>
        <div className="player">
          <p>Playing As:</p>
          <Image className="rider" height={100} width={100} src={rider} alt="rider" />
        </div>
      </div>
      <Buttons buttons={[{ text: 'Start Game', callback: () => setMenu(null) }]} />
    </div>
  )
}
