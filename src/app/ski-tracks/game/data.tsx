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

export enum Snow {
  pow = 'Pow',
  crust = 'Crust',
  ice = 'Ice',
  crud = 'Crud'
}

export enum Rose {
  ne = 'North East'
}

export interface DevModes {
  mapPlotting: boolean;
  skipTransition: boolean;
}
export interface DevMode extends DevModes {
  enabled: string | null;
}

export interface GameProps {
  children?: any;
  map: GameMap;
  courses: Course[];
  rider: MapIcon | any;
  menu: MenuProps | null;
  progress: GameProgress | undefined;
  pastdeaths: number[][] | null;
  devmode: DevMode;
  setPastDeaths: (deaths: number[][] | null) => void;
  setMenu: (menu: MenuProps | null) => void;
  setPlayer: (player: MapIcon) => void;
  setMap: (map: GameMap) => void;
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


export const maps: GameMap[] = [{
  id: Map.central,
  courses: [{
    id: 'toledo',
    title: 'Toledo Bowl',
    description: 'Toledo Bowl is a low angle bowl to the north west of the peak of Flagstaff mountain. With under 2k in elevation gain this tour is great for a quick morning hike.',
    elevation: 1900,
    distance: 3.5,
    difficulty: Difficulty.blue,
    start: [1608, 1232],
    points: [[1515, 1110], [1398, 1075], [1412, 948], [1354, 917], [1453, 846], [1417, 765], [1336, 723]],
    finish: [[1336, 723], [1275, 813], [1310, 824], [1311, 859], [1347, 861], [1344, 940], [1391, 1071], [1370, 1204], [1525, 1250], [1608, 1232]],
    center: [[-1047, -485], [-1213.44, -516.258], [-1274.31, -555.383]],
    answers: [Nav.northwest, Nav.west, Nav.north, Nav.northwest, Nav.northeast, Nav.north, Nav.northwest, Nav.southwest],
  }]
}];
