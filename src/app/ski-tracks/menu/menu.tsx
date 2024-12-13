import { GameProps } from "../game/data";
import { StartMenu, CourseMenu, FinishMenu, HelpMenu } from "./menus";
import { MenuType } from "./data";

function Menu(game: GameProps) {
  const current = game.progress?.current?.find(i => i.active);
  const menu = game.menu?.type ?? '';
  const getMenu = () => {
    if (current?.finished) return <FinishMenu {...game} />;
    else if (game.menu?.type === MenuType.course) return <CourseMenu {...game} />;
    else return <StartMenu {...game} />;
  };
  return <div className={`ski-menu ${menu}`}>{getMenu()}</div>;
}

export default function SkiMenu(game: GameProps) {
  if (game.menu === null) return <HelpMenu />;
  return <Menu {...game} />;
}
