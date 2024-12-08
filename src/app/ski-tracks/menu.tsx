import Image from "next/image";
import { GameProps } from "./game";
import { Nav, Route, routes } from "./routes";
import { MapIcon } from "./map";
import { useState } from "react";

export enum MenuType { start, finish, route, gameover };

function StartMenu({ rider, setMenu }: GameProps) {
  return (
    <div className="menu">
      <div className="menu-header">
        <Image height={140} width={140} src='./skitrax.svg' alt="Ski Tracks" />
        <span>
          <h4>Welcome to</h4>
          <h1>Skin Tracks</h1>
          <p>A backcountry skiing game by Sean Archibeque</p>
        </span>
      </div>
      <div className="menu-body">
        <div>
          <p><strong>Objective:</strong></p><br />
          <p>Find routes, bag peaks, then rally down and crack a cold one. But watch out for trouble and stay out of avalanches!</p>
        </div>
        <div className="player">
          <p>Playing As:</p>
          <Image className="rider" height={100} width={100} src={rider} alt="rider" />
        </div>
      </div>
      <button className="sa-cta" onClick={() => setMenu(null)}>
        Start Game
      </button>
    </div>
  )
}

function RouteDetails({ route }: { route: Route | undefined }) {
  if (!route) return;
  const { title, description, elevation, distance } = route;
  return (
    <div className="route-details">
      <h1>
        <span className="icon">
          <Image
            src={MapIcon.trailhead}
            alt="Route Details"
            width={35}
            height={35}
            priority
          />
        </span>
        {title}
      </h1>
      <p>{description}</p>
      <div className="route-stats">
        <div className="stat">
          <Image width={15} height={15} src="./distance.svg" alt="distance" />
          {distance} mi
        </div>
        <div className="stat">
          <Image width={15} height={15} src="./peak.svg" alt="distance" />
          {elevation} ft
        </div>
      </div>
    </div>
  )
}

function AvalancheReport() {
  return (
    <div className="avy-report">
      <Image src="./rose.png" width={150} height={200} alt="avy rose" />
      <div className="avy-details">
        <h3>Avalanche Report</h3>
        <p style={{ fontSize: '13px' }}>The persistent weak layer (PWL) making up most of the snowpack on the north east side of the compass continues to weaken. This structure is not going to be able to support much in the way of new snow or wind loading.</p>
        <div className="avy-type">
          <Image src="./avy-type.png" width={50} height={50} alt="avy rose" />
          <div>
            <h4>PWL</h4>
            <p>Persistent weak layer (PWL)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Navigation({ navigate, slopeAngles }: { navigate: (dir: Nav) => void; slopeAngles: string[]; }) {
  const directions: any = Object.keys(Nav).map((s, i) => {
    const key = Nav[s as keyof typeof Nav];
    return { key, angle: slopeAngles[i] };
  });
  directions.splice(4, 0, { key: 'compass' });
  return (
    <div className="nav-choices">
      {directions.map(({ key, angle }: any) => {
        if (key === 'compass') return <Image key="compassicon" src="./compassicon.svg" width={75} height={75} alt="compass" />;
        return (
          <button key={key} className="sa-cta" onClick={() => navigate(key)}>
            <strong>{key}</strong> {angle}%
          </button>
        )
      })}
    </div>
  )
}

function RouteMenu({ setMenu, progress, play, setDeaths, deaths }: GameProps) {
  const [showChoices, setShowChoices] = useState(true);
  const active = progress?.routes.find((route) => route.active);
  const data: Route | undefined = routes.find((route) => route.id === active?.id);
  const correctAnswer = active && data?.answers[active.points.length];

  const navigate = (direction: Nav) => {
    if (direction !== correctAnswer && active) {
      let newDeath = data?.points[active.points.length];
      if (newDeath) {
        setDeaths([...deaths, [newDeath[0] + getRandom(22, 32), newDeath[1] - getRandom(42, 62)]]);
      }
      setMenu({ type: MenuType.gameover });
      return;
    }
    if (active) {
      setShowChoices(false);
      active.points.push(1);
      const isSummit = data?.points.length === active.points.length;
      active.summit = isSummit;
      play(active);
      setTimeout(() => {
        if (isSummit) setMenu({ type: MenuType.finish });
        setShowChoices(true);
      }, 2000);
    }
  };

  const cancel = () => {
    if (active) {
      active.active = false;
      active.points = [];
      play(active);
      setMenu(null);
    }
  };

  function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const slopeAngles = Object.keys(Nav).map((s) => {
    const key = Nav[s as keyof typeof Nav];
    const safe = [20, 29];
    const danger = [30, 41];
    const [min, max] = key === correctAnswer ? safe : danger;
    return getRandom(min, max).toString();
  });

  return (
    <div className="menu">
      <div className="route-info">
        <RouteDetails route={data} />
        <AvalancheReport />
        <div className="route-decision">
          <h2>Make a Decision</h2>
          <p>Using the avalanche report and judging by the slope angle move forward by choosing which direction to go.</p>
          {showChoices ? (
            <Navigation slopeAngles={slopeAngles} navigate={(dir) => navigate(dir)} />
          ) : <p>Navigating...</p>}
        </div>
      </div>
      <div className="actions">
        <button className="sa-cta small" onClick={cancel}>
          Quit Route
        </button>
      </div>
    </div>
  )
}

function FinishMenu({ setMenu, progress, play }: GameProps) {
  const active = progress?.routes.find((route) => route.active);
  const data: Route | undefined = routes.find((route) => route.id === active?.id);
  const skiDown = () => {
    if (active) {
      active.finished = true;
      play(active);
      setMenu(null);
    }
  };
  return (
    <div className="menu">
      <div className="route-info">
        <RouteDetails route={data} />
        <AvalancheReport />
        <div className="route-decision">
          <h2>Make a Decision</h2>
          <p>Using the avalanche report and judging by the slope angle move forward by choosing which direction to go.</p>
          <button className="sa-cta" onClick={skiDown}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

function GameOver({ play, setMenu, progress, setDeaths }: GameProps) {
  const active = progress?.routes.find((route) => route.active);
  const decide = (startOver: boolean) => {
    if (active) {
      active.active = false;
      if (startOver) {
        active.points = [];
        setDeaths([]);
      }
      play(active);
      setMenu(startOver ? { type: MenuType.start } : null);
    }
  }

  return (
    <div className="menu">
      <h1>
        <span className="icon">
          <Image
            src={MapIcon.death}
            alt="Game Over"
            width={35}
            height={35}
            priority
          />
        </span>
        Game Over
      </h1>
      <p>Dangit, you died in an avalanche. Checking the avalanche forcast and avoiding avalanche terraign is the best choice if you want to stay on top!</p>
      <div className="gameover-ctas">
        <button className="sa-cta" onClick={() => decide(false)}>
          Pretend I did not die
        </button>
        <button className="sa-cta" onClick={() => decide(true)}>
          Start Game Over
        </button>
      </div>
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

function HelpMenu() {
  return (
    <div className="help-menu">
      <p>Drag on the map to discover routes <Image className="ex-icon color" src={MapIcon.trailhead} width={20} height={20} alt={`Trailhead icon example`} /> and click the desired route to start. Once you have completed all the routes on the map you win! Cheers! <Image className="ex-icon" src={MapIcon.apres} width={20} height={20} alt={`Cheers the beers`} /></p>
    </div>
  )
}

export function ToolMenu({ close, game }: { game: GameProps; close: () => void }) {
  return (
    <div className="tool-menu">
      <button className="close-game" onClick={() => close()}>Leave</button>
    </div>
  )
}

export default function SkiMenu(game: GameProps) {
  if (game.menu === null) return <HelpMenu />;
  return <Menu {...game} />;
}
