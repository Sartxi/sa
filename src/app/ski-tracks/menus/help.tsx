import Image from "next/image";
import { MapIcon } from "../map";

export default function HelpMenu() {
  return (
    <div className="help-menu">
      <p>Drag on the map to discover routes <Image className="ex-icon color" src={MapIcon.trailhead} width={20} height={20} alt={`Trailhead icon example`} /> and click the desired route to start. Once you have completed all the routes on the map you win! Cheers! <Image className="ex-icon" src={MapIcon.apres} width={20} height={20} alt={`Cheers the beers`} /></p>
    </div>
  )
}