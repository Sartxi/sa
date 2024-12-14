import { useState, useEffect, useRef } from "react";
import { CtrlProps } from "./data";
import Image from "next/image";
import { Difficulty } from "../../game/data";
import { Buttons } from "@/app/elements";

const matchs = (a: number[], b: number[]) => (a?.sort().join() === b?.sort().join());
const digits = (num: number) => String(num).padStart(2, '0');

interface TimerProps {
  show: boolean;
  startText: string;
  count: number;
  callback: () => void;
}

enum TimerStatus { started, stopped, ended };

function useTimer(callback: any, delay: any) {
  const ref = useRef<() => void | undefined>();
  useEffect(() => ref.current = callback, [callback]);
  useEffect(() => {
    function tick() {
      if (ref.current) ref.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function GameTimer(props: TimerProps) {
  const [remaining, setRemaining] = useState(props.count);
  const [status, setStatus] = useState(TimerStatus.stopped);

  useEffect(() => {
    if (status === TimerStatus.started) props.callback();
  }, [status]);

  useTimer(() => {
    if (remaining > 0) {
      setRemaining(remaining - 1);
    } else {
      setRemaining(props.count);
      setStatus(TimerStatus.ended);
    }
  }, status === TimerStatus.started ? 1000 : null);

  if (!props.show) return '';

  const seconds = remaining % 60;
  const minutes = ((remaining - seconds) / 60) % 60;

  const timer = status === TimerStatus.ended ? 'Timer Ended' : `${digits(minutes)}:${digits(seconds)}`

  return (
    <div id="GameTimer" className="countdown">
      {status !== TimerStatus.started && (
        <div className="ctrl-overlay">
          <Buttons buttons={[{ text: props.startText, callback: () => setStatus(TimerStatus.started) }]} />
        </div>
      )}
      <span key={timer} className="time">{timer}</span>
    </div>
  );
}

function useDifficulty(difficulty: Difficulty) {
  let length = 9;
  if (difficulty === Difficulty.blue) length = 6;
  if (difficulty === Difficulty.green) length = 3;
  const random = () => (Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)));
  const puzzles = [...Array(length).keys().map(() => random().filter((b, t, n) => b && n.indexOf(b) === t))];
  const answers = Array.from({ length }, () => []);
  return { puzzles, answers, timer: 81 };
}

export default function Transition(props: CtrlProps) {
  const [puzzles, setPuzzles] = useState<number[][]>([]);
  const [answers, setAnswers] = useState<number[][]>([]);
  const [active, setActive] = useState(0);
  const [won, setWon] = useState(false);

  const init = useDifficulty(props.difficulty);
  const btns = [...Array(9).keys()];

  useEffect(() => {
    setPuzzles(init.puzzles);
    setAnswers(init.answers);
  }, []);

  useEffect(() => {
    if (answers.length && matchs(puzzles[active], answers[active])) {
      const next = active + 1;
      setActive(next);
      if (next === puzzles.length) {
        setWon(true);
        setTimeout(() => props.callback('won'), 2000);
      }
    }
  }, [answers]);

  const click = (b: number) => {
    const newAns = [...answers];
    if (!newAns[active].includes(b)) newAns[active].push(b);
    else newAns[active].splice(newAns[active].indexOf(b), 1);
    setAnswers(newAns);
  };

  const puzzle = (i: number) => {
    let style = '';
    if (active === i) style = style += ' active';
    else if (i < active) style = style += ' done';
    return style;
  };

  const highlight = (p: number[], i: number, b: number) => {
    let style = '';
    if (p.includes(b)) style = style += ' on';
    if (i == active) {
      const isOn = puzzles[i].includes(b);
      if (answers[i].includes(b) && isOn) style = style += ' correct';
      else if (answers[i].includes(b) && !isOn) style = style += ' wrong';
    }
    return style;
  };

  return (
    <div id="Pzl" className="transition">
      {won && <div className="ctrl-overlay"><h2>You did it!</h2></div>}
      <div className="area preps">
        <div className="prep">
          Safety Check
        </div>
        <div className="prep">
          <GameTimer {...{
            show: active !== puzzles.length,
            startText: 'Start Timer',
            count: init.timer,
            callback: () => {
              setActive(0);
              setAnswers(init.answers);
            }
          }} />
        </div>
      </div>
      <div className="area combos">
        {puzzles.map((p, i) => (
          <div key={`p-${i}`} className={`combo${puzzle(i)}`}>
            {i < active ? <Image fill src="./check.svg" className="check" alt="puzzle done" /> : ''}
            {btns.map(b => <span key={b} className={highlight(p, i, b)} />)}
          </div>
        ))}
      </div>
      <div className="area selector">
        {btns.map(b => <div key={`${b}-btn`} className="select" onClick={() => click(b)} />)}
      </div>
    </div>
  )
}
