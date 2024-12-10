import { useState, useEffect } from "react";
import { CtrlProps } from "./controller";

export default function Transition(props: CtrlProps) {
  console.log(props);
  
  const [puzzles, setPuzzles] = useState<number[][]>([]);
  const [answers, setAnswers] = useState<number[][]>([]);
  const [active, setActive] = useState(0);

  const btns = [...Array(9).keys()];
  const random = () => (Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)));

  useEffect(() => {
    const dice = btns.map(() => random().filter((b, t, n) => b && n.indexOf(b) === t));
    setPuzzles(dice);
    setAnswers(Array.from({ length: 9 }, () => []));
  }, []);

  useEffect(() => {
    const hasMatch = (a: number[], b: number[]) => (a?.sort().join() === b?.sort().join());
    if (answers.length && hasMatch(puzzles[active], answers[active])) {
      setActive(active + 1);
    }
    if (answers.length && active === puzzles.length) {
      console.log('beat it');
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
      <div className="area preps">
        <div className="prep">
          Safety
        </div>
        <div className="prep">
          Beacon
        </div>
        <div className="prep">
          Gear
        </div>
      </div>
      <div className="area combos">
        {puzzles.map((p, i) => (
          <div key={`p-${i}`} className={`combo${puzzle(i)}`}>
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
