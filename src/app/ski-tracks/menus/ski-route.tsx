import Image from "next/image";
import Compass, { Snow } from "../compass";
import { Nav, Route, routes } from "../ski-routes";
import { GameProps } from "../game";
import { MapIcon } from "../map";
import { Consequence, RouteDetails } from "./";
import { getRandom } from "../map-util";
import { useState } from "react";
import { ConsequenceProps } from "./consequence";
import { MenuType } from "../menu";

function useSafetyMetrix(correct: Nav | undefined) {
  return Object.keys(Nav).map((s) => {
    const isRight = Nav[s as keyof typeof Nav] === correct;
    const [min, max] = isRight ? [20, 29] : [30, 41];
    const snow = Object.keys(Snow).map((s) => Snow[s as keyof typeof Snow]).filter(i => i !== 'Pow');
    return {
      angle: getRandom(min, max).toString(),
      quality: isRight ? Snow.pow : snow[Math.floor(Math.random() * snow.length)]
    };
  });
}

function usePlay({ progress, deaths, setMenu, setDeaths, play }: GameProps) {
  const [consequence, setConsequence] = useState<ConsequenceProps | null>();

  const playing = progress?.routes.find((route) => route.active);
  const route: Route | undefined = routes.find((route) => route.id === playing?.id);
  const correct = playing && route?.answers[playing.points.length];

  const navigate = (direction: Nav) => {
    if (playing && route) {
      const wrong = direction !== correct;
      const point = route.points[playing.points.length];
      if (wrong) {
        // set random location close to play to place death scenerio
        setDeaths([...deaths, [point?.[0] + getRandom(22, 32), point?.[1] - getRandom(42, 62)]]);
      } else if (playing.summit) {
        playing.finished = true;
        play(playing);
      } else {
        playing.points.push(1);
        playing.summit = route.points.length === playing.points.length;
        play(playing);
      }
      // setting a consequence of the players navigation choice
      setConsequence({
        wrong,
        close: () => setConsequence(null),
        callback: () => {
          playing.points = [];
          setDeaths([]);
          play(playing);
          setMenu({ type: MenuType.start });
        }
      });
    }
  };

  return {
    consequence,
    route,
    correct,
    navigate,
    quit: () => {
      if (playing) {
        playing.active = false;
        playing.points = [];
        play(playing);
        setMenu(null);
      }
    }
  };
}

export default function RouteMenu(game: GameProps) {
  const { consequence, route, correct, navigate, quit } = usePlay(game);
  const metrix = useSafetyMetrix(correct);

  const renderAction = () => {
    if (consequence) return <Consequence {...consequence} />;
    else return <Compass metrix={metrix} navigate={(dir) => navigate(dir)} />;
  };

  return (
    <div className="menu">
      <div className="route-info">
        <RouteDetails route={route} cancel={quit} />
        <div className="route-decision">
          <h2>
            <Image src={MapIcon.compass} width={20} height={20} alt="Navigation" />
            Navigation
          </h2>
          <p>Use your compass to decide which direction to proceed. Be sure to consider the slope angle, snow quality, and avalanche report before making your decisions.</p>
          <div className="action-area">{renderAction()}</div>
        </div>
      </div>
    </div>
  )
}
