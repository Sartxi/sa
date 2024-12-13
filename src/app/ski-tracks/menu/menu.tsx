import { GameProps } from "../game/data";
import { StartMenu, CourseMenu, FinishMenu, HelpMenu } from "./menus";
import { MenuType } from "./data";

function Menu(game: GameProps) {
  const current = game.progress?.current?.find(i => i.active);
  const isFinished = game.menu?.type === MenuType.course && current?.finished;
  const menu = game.menu?.type ?? '';
  const getMenu = () => {
    switch (game.menu?.type) {
      case MenuType.finish:
      case isFinished:
        return <FinishMenu {...game} />;
      case MenuType.course:
        return <CourseMenu {...game} />;
      default:
        return <StartMenu {...game} />;
    }
  };
  return <div className={`ski-menu ${menu}`}>{getMenu()}</div>;
}

export default function SkiMenu(game: GameProps) {
  if (game.menu === null) return <HelpMenu />;
  return <Menu {...game} />;
}
