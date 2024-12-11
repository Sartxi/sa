import { useEffect, useState } from "react";
import Image from "next/image";
import { Nav, Rose, Snow } from "../../game/data";
import { GameCtrlProps, CtrlProps, CtrlType, details, SafetyMetrix } from "./data";
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

function useSafetyMetrix(nav: Nav | null): SafetyMetrix {
  const [points, setPoints] = useState<any[]>([]);
  useEffect(() => {
    setPoints(Object.keys(Nav).map((s) => {
      const correct = Nav[s as keyof typeof Nav] === nav;
      const [min, max] = correct ? [20, 29] : [30, 41];
      const snow = Object.keys(Snow).map((s) => Snow[s as keyof typeof Snow]);
      return {
        angle: getRandom(min, max).toString(),
        quality: correct ? Snow.pow : snow[Math.floor(Math.random() * snow.length)]
      };
    }));
  }, [nav]);
  return { points, rose: Rose.ne };
}

function Navigation(props: CtrlProps) {
  const metrix = useSafetyMetrix(props.correct);
  if (!metrix.points.length) return <span />;
  return (
    <Compass metrix={metrix} navigate={props.callback} />
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
  const [ctrl, setCtrl] = useState<CtrlType>(CtrlType.transition);
  const [correct, setCorrect] = useState<Nav>(course.answers[current.points.length]);
  const [result, setResult] = useState<ResultProps | null>(null);

  useEffect(() => {
    const answer: Nav = course.answers[current.points.length];
    setCorrect(answer);
  }, [current, game]);

  const ctrls: CtrlProps[] = [{
    id: CtrlType.transition,
    difficulty: course.difficulty,
    correct,
    callback: () => {
      setCtrl(CtrlType.navigation);
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
      if (wrong) {
        const startPoint = course.points[current.points.length - 1] ?? course.start;
        const death = getDirection(startPoint, direction);
        current.deaths.push(death);
      } else if (current.summit === 2) {
        current.summit = 3;
      } else {
        const atSummit = course.points.length === (current.points.length + 1);
        current.summit = atSummit ? 1 : 0;
        if (atSummit) setCtrl(CtrlType.transition);
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
