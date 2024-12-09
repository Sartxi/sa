import Image from "next/image";
import Compass, { Snow } from "../compass";
import { Nav, Route, routes } from "../ski-routes";
import { GameProps } from "../game";
import { MapIcon } from "../map";
import { Consequence, RouteDetails } from "./";
import { getRandom } from "../map-util";
import { useState } from "react";
import { ConsequenceProps } from "./consequence";

function useSafetyMetrix(correct: Nav | undefined) {
  return Object.keys(Nav).map((s) => {
    const [min, max] = Nav[s as keyof typeof Nav] === correct ? [20, 29] : [30, 41];
    const snow = Object.keys(Snow).map((s) => Snow[s as keyof typeof Snow]);
    return {
      angle: getRandom(min, max).toString(),
      quality: snow[Math.floor(Math.random() * snow.length)]
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
        setDeaths([...deaths, [point[0] + getRandom(22, 32), point[1] - getRandom(42, 62)]]);
      } else {
        playing.points.push(1);
        playing.summit = route.points.length === playing.points.length;
        play(playing);
      }
      // setting a consequence of the players navigation choice
      setConsequence({
        wrong,
        close: () => setConsequence(null),
        callback: () => console.log('made dec')
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
          <p>Use your compass to decide which direction to proceed. Be sure to consider the avalanche report, slope angle, and snow quality.</p>
          <div className="action-area">{renderAction()}</div>
        </div>
      </div>
    </div>
  )
}
