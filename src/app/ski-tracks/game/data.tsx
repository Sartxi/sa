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
  }, {
    id: 'holytoledo',
    title: 'Holy Toledo',
    description: 'Holy Toledo is a steep run to the northwest side of Flagstaff Mountain peak. Approached via Cardiff pass this tour offers a technical approach and a steep finish!',
    elevation: 1900,
    distance: 3.2,
    difficulty: Difficulty.black,
    start: [1015, 549],
    points: [[1081, 629], [1057, 727], [1049, 835], [1041, 926], [1130, 934], [1108, 989], [1222, 881], [1269, 801], [1319, 759]],
    finish: [[1319, 759], [1274, 737], [1267, 709], [1225, 712], [1162, 656], [1101, 514], [1015, 549]],
    center: [[-741, -178], [-913.307, -148.556], [-978.958, -137.781]],
    answers: [Nav.southeast, Nav.south, Nav.south, Nav.south, Nav.southeast, Nav.south, Nav.northeast, Nav.northeast, Nav.northeast, Nav.northwest],
  }, {
    id: 'superior',
    title: 'South Superior',
    description: 'The imposing south face of Mount Superior beckons many resort skiers across the street at Snowbird. This course offers a technical approach an steep descent.',
    elevation: 3000,
    distance: 3.2,
    difficulty: Difficulty.black,
    start: [931, 1530],
    points: [[995, 1356], [973, 1233], [1037, 1254], [1117, 1211], [1170, 1219], [1168, 1141], [1076, 1076], [1093, 995], [1041, 1039], [957, 1011], [730, 1134], [536, 1187], [453, 1204]],
    finish: [[453, 1204], [521, 1235], [555, 1306], [630, 1323], [709, 1394], [884, 1445], [941, 1535], [931, 1530]],
    center: [[-407, -869], [-422.891, -868.395], [-798.965, -759.223]],
    answers: [Nav.northeast, Nav.north, Nav.southeast, Nav.northeast, Nav.east, Nav.north, Nav.northwest, Nav.northeast, Nav.southwest, Nav.northwest, Nav.southwest, Nav.southwest, Nav.southwest, Nav.southeast],
  }, {
    id: 'michigan',
    title: 'Michigan City',
    description: 'Michigan City is the area on the north side of Grizzly Gulch, between Davenport Hill and Black Bess. This course will traverse freeland into Michigan gully.',
    elevation: 1700,
    distance: 3.1,
    difficulty: Difficulty.green,
    start: [2338, 1095],
    points: [[2429, 1047], [2547, 1114], [2661, 1068], [2760, 1095], [2820, 1069], [2841, 1019], [2791, 970], [2905, 963], [2869, 921], [2902, 889], [2790, 809]],
    finish: [[2790, 809], [2754, 881], [2686, 873], [2584, 907], [2463, 1000], [2337, 1046], [2338, 1095]],
    center: [[-2259, -497], [-2300.57, -413.473], [-2337.18, -464.66]],
    answers: [Nav.northeast, Nav.southeast, Nav.east, Nav.southeast, Nav.east, Nav.northeast, Nav.northwest, Nav.east, Nav.northwest, Nav.northeast, Nav.northwest, Nav.southwest],
  }, {
    id: 'wolvie',
    title: 'Wolverine Granny Chute',
    description: 'A peak with something for everyone, the eastern side of Mount Wolverine offers the intermediate Wolverine Bowl whereas the north-facing Wolverine Cirque proffers death-defying chutes.',
    elevation: 1900,
    distance: 2.9,
    difficulty: Difficulty.blue,
    start: [3128, 965],
    points: [[3011, 983], [2945, 982], [2908, 1067], [2923, 1138], [2942, 1363], [2921, 1422], [2953, 1527], [3024, 1605]],
    finish: [[3024, 1605], [3029, 1540], [3067, 1523], [3044, 1480], [3095, 1444], [3072, 1314], [3018, 1212], [3075, 1059], [3128, 965]],
    center: [[-2719, -631], [-2875.4, -773.285], [-2875.78, -874.141]],
    answers: [Nav.west, Nav.west, Nav.southwest, Nav.southeast, Nav.south, Nav.southwest, Nav.southeast, Nav.southeast, Nav.north],
  }]
}];
