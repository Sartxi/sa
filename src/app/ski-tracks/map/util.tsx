import { GameProps } from "../game";

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setSkinner(a: string, b: string) {
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

function placePin(id: string, [a, c]: number[], [b, d]: number[]) {
  const el = document.getElementById(id);
  if (el) {
    el.style.left = `${a + b}px`;
    el.style.top = `${c + d}px`;
  }
}

function getBgAxis(map: HTMLElement) {
  return window.getComputedStyle(map).getPropertyValue('background-position').split(' ');
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

function setPins(map: HTMLElement | null, game: GameProps) {
  if (!map) return;
  const [x, y] = getBgAxis(map);
  const mapBg = [parseInt(x), parseInt(y)];
  game.routes.forEach(({ id, start, points }) => {
    placePin(`${id}Start`, mapBg, start);
    const reached = game.progress?.current.find((route) => route.id === id);
    points.forEach((point, i) => {
      if (reached?.points[i]) {
        placePin(`${id}${i + 1}`, mapBg, point);
        const trail = i === 0 ? `${id}Start` : `${id}${i}`;
        setSkinner(trail, `${id}${i + 1}`);
      }
    });
    if (reached?.deaths.length) {
      reached.deaths.forEach((death, index) => placePin(`Death${index}`, mapBg, death));
    }
  });
}

export {
  setPins,
  listeners,
  getAxis,
  getRandom,
  getBgAxis,
  placePin
}
