import { useEffect, useState } from "react";
import Image from "next/image";
import { Nav } from "../../game/data";
import { GameCtrlProps, CtrlProps, CtrlType, details } from "./data";
import { ResultProps } from "./result";
import { getRandom } from "../../map/util";
import Compass from "./compass";
import Transition from "./transition";
import Result from "./result";

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
    case CtrlType.trs:
      return <Transition {...props} />;
    default:
      return <Navigation {...props} />;
  }
}

function useController({ current, course, game, quit }: GameCtrlProps) {
  const [ctrl, setCtrl] = useState<CtrlType>(CtrlType.trs);
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

  const ctrls: CtrlProps[] = [{
    id: CtrlType.trs,
    difficulty: course.difficulty,
    correct,
    callback: () => {
      setCtrl(CtrlType.nav);
      if (current.summit) {
        current.summit = 2;
        game.play(current);
      }
    }
  }, {
    id: CtrlType.nav,
    difficulty: course.difficulty,
    correct,
    callback: (direction) => {
      const wrong = direction !== correct;
      if (wrong) youDied();
      else if (current.summit === 2) current.summit = 3;
      else {
        const atSummit = course.points.length === (current.points.length + 1);
        current.summit = atSummit ? 1 : 0;
        if (atSummit) setCtrl(CtrlType.trs);
        current.points.push(1);
      }
      game.play(current);
      setResult({ wrong, close: () => setResult(null), callback: () => quit() });
    }
  }];

  return { controller: ctrls[ctrls.findIndex(c => c.id === ctrl)], result };
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
