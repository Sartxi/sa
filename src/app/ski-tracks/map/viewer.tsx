import Image from "next/image";
import { GameMap } from "./data";
import { useEffect, useState } from "react";

export default function MapViewer({ map, close }: { map: GameMap, close: () => void }) {
  return (
    <div id="MapViewer">
      <Image id="MapViewed" src={map.src} alt={`${map.id} map`} fill />
    </div>
  )
}
