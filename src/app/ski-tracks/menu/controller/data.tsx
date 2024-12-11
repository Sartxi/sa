import { Course, Difficulty, GameProps, Nav, CourseProgress } from "../../game/data";
import { MapIcon } from "../../map/data";

export enum CtrlType {
  trs = 'Transition',
  nav = 'Navigation'
}

export interface GameCtrlProps {
  game: GameProps;
  course: Course;
  current: CourseProgress;
  quit: () => void;
}

export interface CtrlProps {
  id: CtrlType;
  difficulty: Difficulty;
  callback: (r: any) => void;
  correct: Nav | null;
}

export interface CtrlDeets {
  id: CtrlType;
  icon: MapIcon;
  title: string;
  description: string;
}

export const details: CtrlDeets[] = [
  { id: CtrlType.trs, icon: MapIcon.report, title: 'Transitioning', description: 'Being prepared means always having the proper safety gear! Type all the combos before the timer runs out to complete your safety checks.' },
  { id: CtrlType.nav, icon: MapIcon.compass, title: 'Navigating', description: 'Use your compass to decide which direction to proceed. Consider slope angle, snow quality, and avalanche report before making your decisions.' }
];
