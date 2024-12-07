import Image from "next/image";
import { GameProps, RouteProgress } from "./game";
import { MenuType } from "./menu";

export interface Route {
  id: string;
  start: [number, number];
  points: [number, number][];
  finish: [number, number];
  answers: Nav[];
}

export enum Nav {
  south,
  southeast,
  southwest
}

export const routes: Route[] = [{
  id: 'Boss',
  start: [410, 1200],
  points: [[315, 1295], [320, 1530], [510, 1580], [455, 1675]],
  answers: [Nav.southeast, Nav.south, Nav.southwest, Nav.southeast],
  finish: [410, 1200],
}];

interface SkiRoute extends GameProps {
  route: Route;
}

interface RoutePoint {
  id: string;
  icon: string;
  desc: string;
  click?: any;
  trail?: boolean;
}

function Point({ id, icon, desc, click, trail }: RoutePoint) {
  return (
    <>
      {trail && <svg id={`Trail${id}`} className="trail" />}
      <Image id={id} className="point" height={30} width={30} src={icon} alt={desc} onClick={() => click?.()} />
    </>
  )
}

function SkiRoute({ rider, route, progress, setMenu, play }: SkiRoute) {
  const getPointId = (point: string) => (`${route.id}${point}`);
  const routes = progress?.routes ?? [];
  const active = routes.find((p) => p.id === route.id);
  const points = route.points.filter((p, i) => active?.points[i]);

  const navigate = () => {
    if (active) active.active = true;
    play(active ?? { id: route.id, active: true, points: [], finished: false });
    setMenu({ type: MenuType.route });
  };

  return (
    <div id={route.id} className="route">
      <Point id={getPointId('Start')} icon="./trailsign.svg" desc={`${route.id} trail head`} click={navigate} />
      <Point id="Skinning" icon="./skiup.svg" desc="Skinning" />
      {points.map((p, i) => {
        const index = `${i + 1}`;
        const next = active?.points[i];
        const icon = points.length === (i + 1) ? next === 1 ? './pin.svg' : './skiup.svg' : './point.svg';
        return <Point trail key={`point${index}`} id={getPointId(index)} icon={icon} desc={`Point ${index}`} click={navigate} />;
      })}
      {active?.finished && <Point id={getPointId('Finish')} icon={rider} desc="Rallying down" click={navigate} />}
    </div>
  )
}

export default function SkiRoutes(game: GameProps) {
  return <>{routes.map((route: Route) => <SkiRoute key={route.id} route={route} {...game} />)}</>;
}
