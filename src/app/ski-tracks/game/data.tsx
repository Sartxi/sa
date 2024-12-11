import { Map, MapIcon } from "../map/data";
import { MenuProps } from "../menu/data";

export enum Nav {
  northwest = 'NW',
  north = 'N',
  northeast = 'NE',
  west = 'W',
  east = 'E',
  southwest = 'SW',
  south = 'S',
  southeast = 'SE',
}

export enum Difficulty {
  green = 'Easy',
  blue = 'Intermediate',
  black = 'Hard'
}

export interface GameProps {
  children?: any;
  courses: Course[];
  rider: MapIcon | any;
  menu: MenuProps | null;
  progress: GameProgress | undefined;
  setMenu: (menu: MenuProps | null) => void;
  play: (event: CourseProgress) => void;
}

export interface GameProgress {
  current: CourseProgress[];
}

export interface CourseProgress {
  id: string;
  active: boolean;
  points: number[];
  summit: number;
  rally: boolean;
  finished: boolean;
  deaths: number[][];
}

export interface GameMap {
  id: Map,
  courses: Course[];
};

export const maps: GameMap[] = [{
  id: Map.west,
  courses: [{
    id: 'StormMountain',
    title: 'Storm Mountain',
    description: 'Storm Mountain lies on the western end of the Cottonwood Ridge. Rising nearly 5,000 feet directly out of the valley, any approach requires significant elevation gain.',
    elevation: 2300,
    distance: 2.3,
    difficulty: Difficulty.green,
    start: [410, 1200],
    points: [[315, 1295], [320, 1530], [510, 1580], [455, 1675]],
    finish: [[455, 1675], [570, 1610], [590, 1564], [660, 1314], [560, 1244], [410, 1200]],
    center: [[-9, -908], [-195.94921875, -904.5390625], [-272.39453125, -1152.640625]],
    answers: [Nav.southwest, Nav.south, Nav.southeast, Nav.southwest, Nav.northeast],
  }]
}];

export interface Course {
  id: string;
  title: string;
  description: string;
  elevation: number;
  distance: number;
  start: [number, number];
  points: [number, number][];
  finish: [number, number][];
  answers: Nav[];
  center: [number, number][];
  difficulty: Difficulty;
}
