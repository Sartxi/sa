import { CourseProgress } from "../game/game";
import { Animate } from "./data";
import { getBgAxis } from "./util";

const animation: { [x: string]: { duration: number, easing: string } } = {};
Object.keys(Animate).forEach((s) => {
  const duration = Animate[s as keyof typeof Animate];
  if (typeof duration === "number") {
    animation[s as keyof typeof Animate] = { duration, easing: 'ease-in-out' };
  }
});

export function getDuration(type: string) {
  return animation[type].duration;
}

export function centerMap(
  map: HTMLElement | null,
  callback: () => void,
  bgPos: number[],
  axis?: [number, number]
) {
  if (map) {
    const [x, y] = getBgAxis(map);
    const current = [parseInt(x), parseInt(y)];
    const start = axis ? bgPos : current;
    const end = axis ?? bgPos;
    map.classList.add('auto-centering');
    map.animate([
      { backgroundPosition: `${start[0]}px ${start[1]}px` },
      { backgroundPosition: `${end[0]}px ${end[1]}px` }
    ], animation.center).onfinish = () => {
      map.style.backgroundPosition = `${end[0]}px ${end[1]}px`;
      map.classList.remove('auto-centering');
      callback();
    };
  }
}

export function skin(course: CourseProgress, callback: (index: number) => void) {
  const point = course.points.findIndex(i => i === 1);
  const start = point === 0 ? `${course.id}Start` : `${course.id}${point}`;
  const finish = `${course.id}${point + 1}`;
  const skinner = document.getElementById('Skinner');
  const st = document.getElementById(start);
  const en = document.getElementById(finish);
  if (skinner && st && en) {
    const start = st.getBoundingClientRect();
    const end = en.getBoundingClientRect();
    skinner.animate([
      { left: `${start.left}px`, top: `${start.top}px`, visibility: 'visible' },
      { left: `${end.left}px`, top: `${end.top}px`, visibility: 'hidden' }
    ], animation.skin).onfinish = () => callback(point);
  }
}

export function ski(
  rider: string,
  bg: number[],
  finish: number[][],
  callback: () => void
) {
  const el = document.getElementById(rider);
  const [a, c] = bg;
  if (el) {
    const frames = finish.map(([b, d]) => ({ left: `${a + b}px`, top: `${c + d}px` }));
    el.animate(frames, animation.ski).onfinish = () => {
      const last = frames[frames.length - 1]
      el.style.left = last.left;
      el.style.top = last.top;
      callback();
    };
  }
}
