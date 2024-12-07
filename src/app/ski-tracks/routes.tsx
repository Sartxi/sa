import Image from "next/image";
import { GameProps } from "./game";
import { MenuType } from "./menu";
import { MapIcon, useMapIconSize } from "./map";

export interface Route {
  id: string;
  start: [number, number];
  points: [number, number][];
  finish: [number, number][];
  answers: Navigate[];
}

export enum Navigate {
  south,
  southeast,
  southwest,
  north,
  northeast,
  northwest
}

export const routes: Route[] = [{
  id: 'Boss',
  start: [410, 1200],
  points: [[315, 1295], [320, 1530], [510, 1580], [455, 1675]],
  answers: [Navigate.southeast, Navigate.south, Navigate.southwest, Navigate.southeast, Navigate.northeast],
  finish: [[410, 1200]],
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
}

function Point({ id, icon, desc, click, trail }: RoutePoint) {
  const size = useMapIconSize(icon);
  const style = `point ${click ? 'link' : ''}`;
  return (
    <>
      {trail && <svg id={`Trail${id}`} className="trail" />}
      <Image id={id} className={style} height={size} width={size} src={icon} alt={desc} onClick={() => click && click?.()} />
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
    play(active ?? { id: route.id, active: true, points: [], summit: false, finished: false });
    setMenu({ type: active?.summit ? MenuType.finish : MenuType.route });
  };

  return (
    <div id={route.id} className="route">
      <Point id={getPointId('Start')} icon={MapIcon.trailhead} desc={`${route.id} trail head`} click={!points.length && navigate} />
      <Point id="Skinner" icon={MapIcon.skinner} desc="Skinner skinning" />
      {points.map((p, i) => {
        const index = `${i + 1}`;
        const next = active?.points[i];
        const isSkinner = points.length === (i + 1) && next === 2;
        const icon = points.length === (i + 1) ? next === 1 ? MapIcon.pin : MapIcon.skinner : MapIcon.point;
        return (
          <Point
            key={`point${index}`}
            trail
            id={getPointId(index)}
            icon={icon}
            desc={`Point ${index}`}
            click={isSkinner && navigate} />
        )
      })}
      {active?.finished && <Point id={getPointId('Finish')} icon={rider} desc="Rallying down" click={navigate} />}
    </div>
  )
}

export default function SkiRoutes(game: GameProps) {
  return <>{routes.map((route: Route) => <SkiRoute key={route.id} route={route} {...game} />)}</>;
}
