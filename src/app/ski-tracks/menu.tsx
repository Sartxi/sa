import Image from "next/image";
import { GameProps } from "./game";

export enum MenuType { start, route, gameover };

function StartMenu({ rider, setMenu }: GameProps) {
  return (
    <div id="StartMenu" className="menu">
      <h2>Ski Tracks</h2>
      <Image height={100} width={100} src={rider} alt="rider" />
      <p>Find ski spots on the map, click trail signs to start routes.</p>
      <button className="menu-cta" onClick={() => setMenu(null)}>
        Play Game
      </button>
    </div>
  )
}

function RouteMenu({ setMenu, progress, play }: GameProps) {
  const active = progress?.routes.find((route) => route.active);
  const navigate = () => {
    if (active) {
      active.points.push(1);
      play(active);
      setMenu(null);
    }
  };

  return (
    <div id="StartMenu" className="menu">
      <h2>Navigate</h2>
      <button className="menu-cta" onClick={navigate}>
        Next
      </button>
    </div>
  )
}

function GameOver({ setMenu }: GameProps) {
  return (
    <div id="StartMenu" className="menu">
      <h2>Game Over</h2>
      <p>You died in an avalanche</p>
      <button className="menu-cta" onClick={() => setMenu({ type: MenuType.start })}>
        Start Over
      </button>
    </div>
  )
}

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
  if (game.menu === null) return <span />;
  return <Menu {...game} />;
}
