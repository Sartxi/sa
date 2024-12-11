import { GameProps, Course, CourseProgress, Difficulty, Nav, Snow, Rose } from "../../game/data";
import { MapIcon } from "../../map/data";

export enum CtrlType {
  transition = 'Transition',
  navigation = 'Navigation'
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
  correct: Nav | null;
  callback: (r: any) => void;
}

export interface CtrlDeets {
  id: CtrlType;
  icon: MapIcon;
  title: string;
  description: string;
}

interface CompassPoints {
  angle: string;
  quality: Snow;
}

export interface SafetyMetrix {
  points: CompassPoints[];
  rose: Rose;
}

export const details: CtrlDeets[] = [{
  id: CtrlType.transition,
  icon: MapIcon.report,
  title: 'Transitioning',
  description: 'Being prepared means always having the proper safety gear! Type all the combos before the timer runs out to complete your safety checks.'
}, {
  id: CtrlType.navigation,
  icon: MapIcon.compass,
  title: 'Navigating', description: 'Use your compass to decide which direction to proceed. Consider slope angle, snow quality, and avalanche report before making your decisions.'
}];
