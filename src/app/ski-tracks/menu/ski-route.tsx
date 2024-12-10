import { Route } from "../ski-routes";
import { GameProps, RouteProgress } from "../game";
import { RouteDetails } from ".";
import { MenuType } from "../menu/menu";
import GameController from "./controller/controller";


function useRouteMenu({ routes, progress, setMenu, play }: GameProps) {
  const current: RouteProgress | undefined = progress?.current.find((route) => route.active);
  const route: Route | undefined = routes.find((route) => route.id === current?.id);
  const quit = (menu: { type: MenuType } | null = null) => {
    if (!current) return;
    current.active = false;
    current.points = [];
    current.deaths = [];
    play(current);
    setMenu(menu);
  };
  return { route, current, quit };
}

export default function RouteMenu(game: GameProps) {
  const { route, current, quit } = useRouteMenu(game);
  if (!route || !current) return <span />;
  return (
    <div className="menu">
      <div className="route-info">
        <RouteDetails route={route} cancel={quit} />
        <div className="route-decision">
          <GameController game={game} route={route} current={current} quit={quit} />
        </div>
      </div>
    </div>
  )
}
