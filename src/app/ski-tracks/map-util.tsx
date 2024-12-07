import { useEffect, useState } from "react";
import { GameProgress, RouteProgress } from "./game";
import { routes } from "./routes";
import { useMedia } from "../hooks/viewport";

const duration = 2000;
const animate = { duration, easing: 'ease-in-out' };

function track(a: string, b: string) {
  const p1 = document.getElementById(a);
  const p2 = document.getElementById(b);
  if (p1 && p2) {
    const line = document.getElementById(`Trail${b}`);
    if (!line) return;
    const start = p1.getBoundingClientRect();
    const end = p2.getBoundingClientRect();
    const hasTrail = line.querySelector(`#Line${b}`);
    const trail = hasTrail ?? document.createElementNS('http://www.w3.org/2000/svg', 'line');
    trail.setAttribute('x1', `${start.left + start.width / 2}`);
    trail.setAttribute('y1', `${start.top + start.height / 2}`);
    trail.setAttribute('x2', `${end.left + end.width / 2}`);
    trail.setAttribute('y2', `${end.top + end.height / 2}`);
    if (!hasTrail) {
      trail.setAttribute('id', `Line${b}`);
      trail.setAttribute('style', 'stroke: rgba(172, 172, 172, 0.5); stroke-width: 3; stroke-dasharray: 10, 10;');
      document.getElementById(`Trail${b}`)?.append(trail);
    }
  }
}

function location(id: string, [a, c]: number[], [b, d]: number[]) {
  const el = document.getElementById(id);
  if (el) {
    el.style.left = `${a + b}px`;
    el.style.top = `${c + d}px`;
  }
}

function getBgAxis(map: HTMLElement) {
  return window.getComputedStyle(map).getPropertyValue('background-position').split(' ');
}

export function plan(map: HTMLElement | null, progress: GameProgress | undefined) {
  if (!map) return;
  const [x, y] = getBgAxis(map);
  const mapBg = [parseInt(x), parseInt(y)];
  routes.forEach(({ id, start, points, finish }) => {
    location(`${id}Start`, mapBg, start);
    const reached = progress?.routes.find((route) => route.id === id);
    points.forEach((point, i) => {
      if (reached?.points[i]) {
        location(`${id}${i + 1}`, mapBg, point);
        const trail = i === 0 ? `${id}Start` : `${id}${i}`;
        track(trail, `${id}${i + 1}`);
      }
      if (reached?.finished && reached?.points && i === (reached.points.length - 1)) {
        const rider = document.getElementById(`${id}Finish`);
        if (rider) ski(rider, finish, mapBg);
      }
    });
  });
}

export function skin(a: string, b: string, callback: any) {
  const skinner = document.getElementById('Skinner');
  const st = document.getElementById(a);
  const en = document.getElementById(b);
  if (skinner && st && en) {
    const start = st.getBoundingClientRect();
    const end = en.getBoundingClientRect();
    skinner.animate([
      { left: `${start.left}px`, top: `${start.top}px`, visibility: 'visible' },
      { left: `${end.left}px`, top: `${end.top}px`, visibility: 'hidden' }
    ], animate).onfinish = () => callback();
  }
}

function ski(rider: HTMLElement, finish: number[][], [a, c]: number[]) {
  if (rider) {
    const frames = finish.map(([b, d]) => ({ left: `${a + b}px`, top: `${c + d}px` }));
    rider.animate(frames, { duration: 5000, easing: 'ease-in-out' }).onfinish = () => {
      const last = frames[frames.length - 1]
      rider.style.left = last.left;
      rider.style.top = last.top;
      setTimeout(() => rider.style.display = 'none', 1000);
    };
  }
}

function getAxis(e: any, isTouch: boolean) {
  const x = isTouch ? e.touches[0].clientX : e.clientX;
  const y = isTouch ? e.touches[0].clientY : e.clientY;
  return [x, y];
}

function listeners(isTouch: boolean) {
  return isTouch
    ? ['touchstart', 'touchmove', 'touchend']
    : ['mousedown', 'mousemove', 'mouseup'];
}

function autoCenterMap(
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
    ], { duration: 500, easing: 'ease-in-out' }).onfinish = () => {
      map.style.backgroundPosition = `${end[0]}px ${end[1]}px`;
      map.classList.remove('auto-centering');
      callback();
    };
  }
}

function useDrag(map: HTMLElement | null, setMap: () => void) {
  const { mobile, tablet } = useMedia();
  const [locked, setLocked] = useState(false);
  const [stPos, setStPos] = useState([0, 0]);
  const [bgPos, setBgPos] = useState([0, 0]);
  const [dragging, setDragging] = useState(false);

  // turn on to set centers
  // console.log(bgPos);

  useEffect(() => {
    if (!map || locked) return;
    const isTouch = mobile || tablet;
    const [starting, moving, ending] = listeners(isTouch);

    const down = (e: any) => {
      setDragging(true);
      const [x, y] = getAxis(e, isTouch);
      setStPos([x - bgPos[0], y - bgPos[1]]);
      map.style.cursor = 'grabbing';
    };

    const move = (e: any) => {
      if (!dragging) return;
      e.preventDefault();
      const [x, y] = getAxis(e, isTouch);
      setBgPos([x - stPos[0], y - stPos[1]]);
      map.style.backgroundPosition = `${bgPos[0]}px ${bgPos[1]}px`;
      setMap();
    }

    const up = () => {
      setDragging(false);
      map.style.cursor = 'grab';
    }

    map.addEventListener(starting, down);
    map.addEventListener(moving, move);
    document.addEventListener(ending, up);

    return () => {
      map.removeEventListener(starting, down);
      map.removeEventListener(moving, move);
      document.removeEventListener(ending, up);
    }
  }, [map, mobile, tablet, setMap]);

  return (axis?: [number, number][]) => {
    if (axis) {
      if (locked) return;
      setLocked(true);
      map?.classList.add('locked');
      const newPos = mobile ? axis[2] : tablet ? axis[1] : axis[0];
      setBgPos(newPos);
      autoCenterMap(map, setMap, bgPos, newPos);
    } else {
      setLocked(false);
      map?.classList.remove('locked');
    }
  };
}

export function useMap(map: HTMLElement | null, progress: GameProgress | undefined) {
  const center = useDrag(map, () => plan(map, progress));
  return {
    lockMap: (active: RouteProgress) => {
      const route = routes.find(r => r.id === active.id);
      if (route) center(route.center);
    },
    unlockMap: () => center()
  };
}
