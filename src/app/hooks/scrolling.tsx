import { useEffect, useState } from "react";
import { useMedia } from "./viewport";

enum PageSections {
  Landing = 'Landing',
  About = 'About',
  Work = 'Work',
  Skills = 'Skills',
  Contact = 'Contact'
};

interface Axis {
  top: number;
  left: number;
  width: number;
  height: number;
  section: PageSections;
}

interface RoamConfig {
  el: string;
  frames: Frame[];
}

interface Roamer {
  element: string;
  frames: (Axis | null)[];
}

interface Frame {
  section: PageSections;
  axis: string[];
  offset: number[];
}

const keys: any[] = ['width', 'height', 'top', 'left'];
const config: RoamConfig = {
  el: 'Roamer',
  frames: [
    { section: PageSections.Landing, axis: ['ilike', 'iam'], offset: [25, 20, -15, -15] },
    { section: PageSections.About, axis: ['Profile', 'Profile'], offset: [0, 0, -25, 50] },
    { section: PageSections.Work, axis: ['WorkBlock', 'WorkBlock'], offset: [-95, 27, 0, 12] },
    { section: PageSections.Skills, axis: ['SkillsAccent', 'SkillsAccent'], offset: [0, 0, 0, 0] },
    { section: PageSections.Contact, axis: ['Socials', 'Socials'], offset: [0, -25, -39, 0] },
  ],
};

class EnumX {
  static of<T extends object>(e: T) {
    const values = Object.values(e)
    const nextMap = new Map(values.map((k, i) => [k, values[i + 1]]));
    const prevMap = new Map(values.map((k, i) => [k, values[i - 1]]));
    return {
      prev: <K extends keyof T>(v: T[K]) => prevMap.get(v),
      next: <K extends keyof T>(v: T[K]) => nextMap.get(v),
    }
  }
}

function inScreen(element: HTMLElement | null) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const visibleHeight = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
  const visibleWidth = Math.max(0, Math.min(rect.right, windowWidth) - Math.max(rect.left, 0));
  const visibleArea = visibleHeight * visibleWidth;
  const elementArea = rect.width * rect.height;
  const percentageVisible = (visibleArea / elementArea) * 100;
  return percentageVisible;
}

function shouldScroll(active: PageSections) {
  const prev = EnumX.of(PageSections).prev(PageSections[active]);
  const next = EnumX.of(PageSections).next(PageSections[active]);
  const prevSection = document.getElementById(prev);
  const nextSection = document.getElementById(next);
  const scrollPrev = inScreen(prevSection) ?? 0;
  const scrollNext = inScreen(nextSection) ?? 0;
  const [ajacent, section] = scrollPrev === 0 ? [scrollNext, next] : [scrollPrev, prev];
  if (ajacent >= 35) return section;
  return null;
}

function offsets(axis: any, offsets: number[]) {
  offsets.forEach((o: number, i: number) => {
    axis[keys[i]] = o < 0 ? axis[keys[i]] - (o *= -1) : axis[keys[i]] + o;
  });
  return axis;
}

function getFrames({ section, axis, offset }: Frame): Axis | null {
  const frames: HTMLElement[] = axis.map((el) => document.getElementById(el)).filter((i) => i !== null);
  if (!frames.length) return null;
  const [{ width, left }, { height, top }] = frames.map((x: HTMLElement) => (x.getBoundingClientRect()));
  return offsets({ section, width, height, top, left }, offset);
}

function setAxis(styles: any | null, roamer: HTMLElement | null) {
  if (styles && roamer) {
    Object.keys(styles)
      .filter((i) => i !== 'section')
      .forEach((key: any) => roamer.style[key] = `${styles[key]}px`);
  }
}

function getInitSection() {
  const checks: { visible: number[], sections: PageSections[] } = { visible: [], sections: [] };
  const { visible, sections } = Object.keys(PageSections).reduce((r, s) => {
    const el = PageSections[s as keyof typeof PageSections];
    r['visible'].push(inScreen(document.getElementById(el)) ?? 0);
    r['sections'].push(el);
    return r;
  }, checks);
  const isVisible = visible.indexOf(Math.max(...visible));
  return sections[isVisible] ?? PageSections.Landing;
}

function useRoam(mobile: boolean) {
  const [roam, setRoam] = useState<Roamer | null>(null);
  useEffect(() => init(getInitSection()), [mobile]);

  const init = (active?: PageSections) => {
    const { el, frames } = config;
    const start: Roamer = {
      element: el,
      frames: frames.map((frame: Frame) => getFrames(frame))
    };
    if (start.frames.some((frame) => (frame?.top)) && !mobile) {
      setRoam(start);
      const frame = start.frames.find((frame: any) => frame.section === active);
      setAxis(frame, document.getElementById(start.element));
    } else setRoam(null);
  };

  const scroll = (active: PageSections) => {
    if (roam) {
      const section: HTMLElement | null = document.getElementById(active);
      section?.scrollIntoView({ behavior: 'smooth' });
      if (!mobile) {
        const nextFrame = roam.frames.find((frame: any) => frame.section === active);
        setAxis(nextFrame, document.getElementById(roam.element));
      }
    }
  };

  return { scroll, refresh: (active: PageSections) => setTimeout(() => init(active), 0) };
}

export function useScrolling(active: PageSections, setActive: any) {
  const [isScrolling, setIsScrolling] = useState(false);
  const { mobile } = useMedia();
  const { scroll, refresh } = useRoam(mobile);

  useEffect(() => {
    const scrollEvent = () => {
      if (isScrolling || mobile) return;
      const toSection = shouldScroll(active);
      if (toSection) setActive(toSection);
    };
    window.addEventListener('scroll', scrollEvent);
    window.addEventListener('resize', () => refresh(active));
    return () => {
      window.removeEventListener('scroll', scrollEvent);
      window.removeEventListener('resize', () => refresh(active));
    }
  }, [isScrolling]);

  useEffect(() => {
    setIsScrolling(true);
    scroll(active);
    // wait for animation to finish
    setTimeout(() => setIsScrolling(false), 1000);
  }, [active]);

  return { refresh };
};
