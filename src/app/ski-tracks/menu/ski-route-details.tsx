import Image from "next/image";
import { Route } from "../ski-routes";
import { MapIcon } from "../map/data";

export default function RouteDetails({ route, cancel }: { route: Route | undefined; cancel?: any }) {
  if (!route) return;
  const { title, description, elevation, distance } = route;
  return (
    <div className="route-details">
      <button className="sa-cta small close" onClick={() => cancel && cancel()}>Close</button>
      <h1>
        <span className="icon">
          <Image
            src={MapIcon.trailhead}
            alt="Route Details"
            width={35}
            height={35}
          />
        </span>
        {title}
      </h1>
      <p>{description}</p>
      <div className="route-stats">
        <div className="stat">
          <Image width={15} height={15} src="./distance.svg" alt="distance" />
          {distance}mi
        </div>
        <div className="stat">
          <Image width={15} height={15} src="./peak.svg" alt="distance" />
          {elevation}ft
        </div>
      </div>
    </div>
  )
}
