import { useEffect, useState } from "react";
import { GameProgress } from "./game";
import { routes } from "./routes";

function setTrail(a: string, b: string) {
  const p1 = document.getElementById(a);
  const p2 = document.getElementById(b);
  if (p1 && p2) {
    const trailimg = document.getElementById(`Trail${b}`);
    if (!trailimg) return;
    const b1 = p1.getBoundingClientRect();
    const b2 = p2.getBoundingClientRect();
    const hasTrail = trailimg.querySelector(`#Line${b}`);
    const trail = hasTrail ?? document.createElementNS('http://www.w3.org/2000/svg', 'line');
    trail.setAttribute('x1', `${b1.left + b1.width / 2}`);
    trail.setAttribute('y1', `${b1.top + b1.height / 2}`);
    trail.setAttribute('x2', `${b2.left + b2.width / 2}`);
    trail.setAttribute('y2', `${b2.top + b2.height / 2}`);
    if (!hasTrail) {
      trail.setAttribute('id', `Line${b}`);
      trail.setAttribute('style', 'stroke: #666; stroke-width: 3; stroke-dasharray: 10,10;');
      document.getElementById(`Trail${b}`)?.append(trail);
    }
  }
}

function setPoint(id: string, [a, c]: number[], [b, d]: number[]) {
  const el = document.getElementById(id);
  if (el) {
    el.style.left = `${a + b}px`;
    el.style.top = `${c + d}px`;
  }
}

export function setPoints(map: HTMLElement | null, progress: GameProgress | undefined) {
  if (!map) return;
  const [x, y] = window.getComputedStyle(map).getPropertyValue('background-position').split(' ');
  const pos = [parseInt(x), parseInt(y)];
  routes.forEach(({ id, start, points, finish }) => {
    setPoint(`${id}Start`, pos, start);
    const reached = progress?.routes.find((route) => route.id === id);
    points.forEach((point, i) => {
      if (reached?.points[i]) {
        setPoint(`${id}${i + 1}`, pos, point);
        const trail = i === 0 ? `${id}Start` : `${id}${i}`;
        setTrail(trail, `${id}${i + 1}`);
      }
    });
  });
}

export function animatePoint(a: string, b: string) {
  const skinner = document.getElementById('Skinning');
  const st = document.getElementById(a);
  const en = document.getElementById(b);
  if (skinner && st && en) {
    const start = st.getBoundingClientRect();
    const end = en.getBoundingClientRect();
    skinner.animate([
      { left: `${start.left}px`, top: `${start.top}px`, visibility: 'visible' },
      { left: `${end.left}px`, top: `${end.top}px`, visibility: 'hidden' }
    ], {
      duration: 1000,
      easing: 'ease-in-out'
    });
  }
}

export function useDraggable(map: HTMLElement | null, mobile: boolean, tablet: boolean, setPins: any) {
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState([0, 0]);
  const [bgPos, setBgPos] = useState([0, 0]);

  return useEffect(() => {
    if (!map) return;
    const isTouch = mobile || tablet;
    const down = (e: any) => {
      setDragging(true);
      const x = isTouch ? e.touches[0].clientX : e.clientX;
      const y = isTouch ? e.touches[0].clientY : e.clientY;
      setStart([x - bgPos[0], y - bgPos[1]]);
      map.style.cursor = `grabbing`;
    };
    const move = (e: any) => {
      if (!dragging) return;
      e.preventDefault();
      const x = isTouch ? e.touches[0].clientX : e.clientX;
      const y = isTouch ? e.touches[0].clientY : e.clientY;
      setBgPos([x - start[0], y - start[1]]);
      map.style.backgroundPosition = `${bgPos[0]}px ${bgPos[1]}px`;
      setPins();
    }
    const up = () => {
      setDragging(false);
      map.style.cursor = `grab`;
    }
    const [starting, moving, ending] = isTouch ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
    map.addEventListener(starting, down);
    map.addEventListener(moving, move);
    document.addEventListener(ending, up);
    return () => {
      map.removeEventListener(starting, down);
      map.removeEventListener(moving, move);
      document.removeEventListener(ending, up);
    }
  }, [map, mobile, tablet, setPins]);
}
