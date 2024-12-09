import { GameProps } from "./game";
import { StartMenu, RouteMenu, FinishMenu, GameOver, HelpMenu } from "./menus";

export enum MenuType { start, finish, route, gameover };

function useMenu(game: GameProps): { style: string, menu: any } {
  switch (game.menu?.type) {
    case MenuType.gameover:
      return {
        style: 'gameover',
        menu: () => <GameOver {...game} />
      }
    case MenuType.route:
      return {
        style: 'route',
        menu: () => <RouteMenu {...game} />
      }
    case MenuType.finish:
      return {
        style: 'finish',
        menu: () => <FinishMenu {...game} />
      }
    default:
      return {
        style: 'start',
        menu: () => <StartMenu {...game} />
      };
  }
}

function Menu(game: GameProps) {
  const { style, menu } = useMenu(game);
  return (
    <div className={`ski-menu ${style}`}>
      {menu()}
    </div>
  )
}

export default function SkiMenu(game: GameProps) {
  if (game.menu === null) return <HelpMenu />;
  return <Menu {...game} />;
}
