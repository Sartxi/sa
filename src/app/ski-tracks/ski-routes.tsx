import Image from "next/image";
import { GameProps } from "./game";
import { MenuType } from "./menu";
import { MapIcon, useMapIconSize } from "./map";

export interface Route {
  id: string;
  title: string;
  description: string;
  elevation: number;
  distance: number;
  start: [number, number];
  points: [number, number][];
  finish: [number, number][];
  answers: Nav[];
  center: [number, number][];
}

export enum Nav {
  northwest = 'NW',
  north = 'N',
  northeast = 'NE',
  west = 'W',
  east = 'E',
  southwest = 'SW',
  south = 'S',
  southeast = 'SE',
}

export const routes: Route[] = [{
  id: 'StormMountain',
  title: 'Storm Mountain',
  description: 'Storm Mountain lies on the western end of the Cottonwood Ridge. Rising nearly 5,000 feet directly out of the valley, any approach requires significant elevation gain. Stay out of avalanche terrain!',
  elevation: 2300,
  distance: 2.3,
  start: [410, 1200],
  points: [[315, 1295], [320, 1530], [510, 1580], [455, 1675]],
  answers: [Nav.southwest, Nav.south, Nav.southeast, Nav.southwest, Nav.northeast],
  finish: [[450, 1665], [570, 1610], [590, 1564], [660, 1314], [560, 1244], [410, 1200]],
  center: [[-9, -908], [-195.94921875, -904.5390625], [-272.39453125, -1152.640625]]
}];

interface SkiRoute extends GameProps {
  route: Route;
}

interface RoutePoint {
  id: string;
  icon: MapIcon;
  desc: string;
  click?: any;
  trail?: boolean;
  death?: boolean;
}

function Point({ id, icon, desc, click, trail, death = false }: RoutePoint) {
  const size = useMapIconSize(icon);
  const style = `point${click ? ' link' : ''}${death ? ' death' : ''}`;
  return (
    <>
      {trail && <svg id={`Trail${id}`} className="trail" />}
      <Image id={id} className={style} height={size} width={size} src={icon} alt={desc} onClick={() => click && click?.()} />
    </>
  )
}

function SkiRoute({ rider, route, progress, deaths, setMenu, play }: SkiRoute) {
  const getPointId = (point: string) => (`${route.id}${point}`);
  const routes = progress?.routes ?? [];
  const active = routes.find((p) => p.id === route.id);
  const points = route.points.filter((p, i) => active?.points[i]);

  const startRoute = () => {
    if (points.length) return;
    play({ id: route.id, active: true, points: [], summit: false, finished: false });
    setMenu({ type: MenuType.route });
  }

  return (
    <div id={route.id} className="route">
      <Point id={getPointId('Start')} icon={MapIcon.trailhead} desc={`${route.id} trail head`} click={startRoute} />
      <Point id="Skinner" icon={MapIcon.skinner} desc="Skinner skinning" />
      {points.map((p, i) => {
        const index = `${i + 1}`;
        const next = active?.points[i];
        let icon = points.length === (i + 1) ? next === 1 ? MapIcon.pin : MapIcon.skinner : MapIcon.point;
        if (active?.finished && points.length === (i + 1)) icon = MapIcon.apres;
        return (
          <Point
            trail
            key={`point${index}`}
            id={getPointId(index)}
            icon={icon}
            desc={`Point ${index}`} />
        )
      })}
      {active?.finished && <Point id={getPointId('Finish')} icon={rider} desc="Rallying down" />}
      {deaths.map((d, index) => <Point key={`Death${index}`} death id={`Death${index}`} icon={MapIcon.death} desc="Death" />)}
    </div>
  )
}

export default function SkiRoutes(game: GameProps) {
  return <>{routes.map((route: Route) => <SkiRoute key={route.id} route={route} {...game} />)}</>;
}
