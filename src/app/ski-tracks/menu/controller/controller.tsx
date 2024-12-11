import Image from "next/image";
import { useEffect, useState } from "react";
import { Difficulty, GameProps, Nav, Course } from "../../game/data";
import { MapIcon } from "../../map/data";
import { getRandom } from "../../map/util";
import { ResultProps } from "./result";

import Compass from "./compass";
import Transition from "./transition";
import Result from "./result";
import { CourseProgress } from "../../game/game";

enum CtrlType {
  transition = 'Transition',
  navigation = 'Navigation'
}

interface GameCtrlProps {
  game: GameProps;
  course: Course;
  current: CourseProgress;
  quit: () => void;
}

export interface CtrlProps {
  id: CtrlType;
  difficulty: Difficulty;
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
  { id: CtrlType.transition, icon: MapIcon.report, title: 'Transitioning', description: 'Being prepared means always having the proper safety gear! Type all the combos before the timer runs out to complete your safety checks.' },
  { id: CtrlType.navigation, icon: MapIcon.compass, title: 'Navigating', description: 'Use your compass to decide which direction to proceed. Consider slope angle, snow quality, and avalanche report before making your decisions.' }
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

function useController({ current, course, game, quit }: GameCtrlProps) {
  const [controller, setController] = useState<CtrlType>(CtrlType.transition);
  const [correct, setCorrect] = useState<Nav>(course.answers[current.points.length]);
  const [result, setResult] = useState<ResultProps | null>(null);

  useEffect(() => {
    const answer: Nav = course.answers[current.points.length];
    setCorrect(answer);
  }, [current, game]);

  const youDied = () => {
    const point = course.points[current.points.length];
    const death = [point[0] + getRandom(22, 32), point[1] - getRandom(42, 62)];
    current.deaths.push(death);
  };

  const controllers: CtrlProps[] = [{
    id: CtrlType.transition,
    difficulty: course.difficulty,
    correct,
    callback: () => {
      setController(CtrlType.navigation);
      if (current.summit) {
        current.summit = 2;
        game.play(current);
      }
    }
  }, {
    id: CtrlType.navigation,
    difficulty: course.difficulty,
    correct,
    callback: (direction) => {
      const wrong = direction !== correct;
      if (wrong) youDied();
      else if (current.summit === 2) current.summit = 3;
      else {
        const atSummit = course.points.length === (current.points.length + 1);
        current.summit = atSummit ? 1 : 0;
        if (atSummit) setController(CtrlType.transition);
        current.points.push(1);
      }
      game.play(current);
      setResult({ wrong, close: () => setResult(null), callback: () => quit() });
    }
  }];

  return { controller: controllers[controllers.findIndex(c => c.id === controller)], result };
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
