import Image from "next/image";
import { useEffect, useState } from "react";
import { GameProps, RouteProgress } from "../../game";
import { MapIcon } from "../../map/data";
import { Nav, Route } from "../../ski-routes";
import { getRandom } from "../../map/util";
import { ResultProps } from "./result";

import Compass from "./compass";
import Transition from "./transition";
import Result from "./result";

enum CtrlType {
  transition = 'Transition',
  navigation = 'Navigation'
}

interface GameCtrlProps {
  game: GameProps;
  route: Route;
  current: RouteProgress;
  quit: () => void;
}

export interface CtrlProps {
  id: CtrlType;
  callback: (r: any) => void;
  correct: Nav | null;
}

interface CtrlDeets {
  id: CtrlType;
  icon: MapIcon;
  title: string;
  description: string;
}

const details: CtrlDeets[] = [
  { id: CtrlType.transition, icon: MapIcon.report, title: 'Transition', description: 'Being prepared means always having the proper safety gear! Type all the combos before the timer runs out to complete your safety checks and be prepared.' },
  { id: CtrlType.navigation, icon: MapIcon.compass, title: 'Navigation', description: 'Use your compass to decide which direction to proceed. Be sure to consider the slope angle, snow quality, and avalanche report before making your decisions.' }
];

function CtrlDeets({ id }: { id: CtrlType }) {
  const deets = details.find(d => d.id === id);
  if (!deets) return <span />;
  const { title, description, icon } = deets;
  return (
    <div className="controller-details">
      <h2>
        <Image src={icon} width={20} height={20} alt="Navigation" />
        {title}
      </h2>
      <p>{description}</p>
    </div>
  );
}

function Navigation(props: CtrlProps) {
  return (
    <Compass correct={props.correct} navigate={props.callback} />
  )
}

function Controller(props: CtrlProps) {
  switch (props.id) {
    case CtrlType.transition:
      return <Transition {...props} />;
    default:
      return <Navigation {...props} />;
  }
}

function useController({ current, route, game, quit }: GameCtrlProps) {
  const [controller, setController] = useState<CtrlType>(CtrlType.transition);
  const [correct, setCorrect] = useState<Nav>(route.answers[current.points.length]);
  const [result, setResult] = useState<ResultProps | null>(null);

  useEffect(() => {
    const answer: Nav = route.answers[current.points.length];
    setCorrect(answer);
  }, [current, game]);

  const youDied = () => {
    const point = route.points[current.points.length];
    const death = [point[0] + getRandom(22, 32), point[1] - getRandom(42, 62)];
    current.deaths.push(death);
  };

  const controls: CtrlProps[] = [{
    id: CtrlType.transition,
    correct,
    callback: () => {
      setController(CtrlType.navigation)
      if (current.summit) {
        current.summit = 2;
        game.play(current);
      }
    }
  }, {
    id: CtrlType.navigation,
    correct,
    callback: (direction) => {
      const wrong = direction !== correct;
      if (wrong) youDied();
      else if (current.summit === 2) current.summit = 3;
      else if (current.summit === 3) current.finished = true;
      else {
        const atSummit = route.points.length === (current.points.length + 1);
        current.summit = atSummit ? 1 : 0;
        if (atSummit) setController(CtrlType.transition);
        current.points.push(1);
      }
      game.play(current);
      setResult({ wrong, close: () => setResult(null), callback: () => quit() });
    }
  }];

  return { controller: controls[controls.findIndex(c => c.id === controller)], result };
}

export default function GameController(props: GameCtrlProps) {
  const { controller, result } = useController(props);
  if (!controller) return <span />;
  return (
    <>
      <CtrlDeets id={controller.id} />
      <div className="action-area">
        {result ? <Result {...result} /> : <Controller {...controller} />}
      </div>
    </>
  );
}
