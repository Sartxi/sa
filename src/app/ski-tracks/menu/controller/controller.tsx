import { useEffect, useState } from "react";
import Image from "next/image";
import { Nav } from "../../game/data";
import { GameCtrlProps, CtrlProps, CtrlType, details } from "./data";
import { ResultProps } from "./result";
import { getRandom, togglePin } from "../../map/util";
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

function getDirection(start: number[], direction: Nav) {
  const axis = [...start];
  const x = getRandom(62, 92);
  const y = getRandom(42, 62);
  switch (direction) {
    case Nav.north:
    case Nav.south:
      axis[1] = direction === Nav.north ? axis[1] - x : axis[1] + x;
      break;
    case Nav.east:
    case Nav.west:
      axis[0] = direction === Nav.west ? axis[0] - y : axis[0] + y;
      break;
    default:
      const northaxis = [Nav.northwest, Nav.northeast].includes(direction);
      const westaxis = [Nav.northwest, Nav.southwest].includes(direction);
      axis[1] = northaxis ? axis[1] - x : axis[1] + x;
      axis[0] = westaxis ? axis[0] - y : axis[0] + y;
      break;
  }
  return axis;
}

function useController({ current, course, game, quit }: GameCtrlProps) {
  const [ctrl, setCtrl] = useState<CtrlType>(CtrlType.trs);
  const [correct, setCorrect] = useState<Nav>(course.answers[current.points.length]);
  const [result, setResult] = useState<ResultProps | null>(null);

  useEffect(() => {
    const answer: Nav = course.answers[current.points.length];
    setCorrect(answer);
  }, [current, game]);

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
      if (wrong) {
        const startPoint = course.points[current.points.length - 1] ?? course.start;
        const death = getDirection(startPoint, direction);
        current.deaths.push(death);
      } else if (current.summit === 2) {
        current.summit = 3;
      } else {
        const atSummit = course.points.length === (current.points.length + 1);
        current.summit = atSummit ? 1 : 0;
        if (atSummit) setCtrl(CtrlType.trs);
        current.points.push(1);
      }
      game.play(current);
      setResult({
        wrong, close: (action) => {
          if (action === 'respawn') {
            const last = `${course.id}${current.summit === 2 ? 'Finish' : current.points.length}`;
            togglePin(last, false);
          }
          setResult(null);
        }, callback: () => quit()
      });
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
