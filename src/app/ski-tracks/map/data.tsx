enum Map {
  central = 'Central Wasatch'
}

enum MapIcon {
  trailhead = './trailsign.svg',
  point = './point.svg',
  pin = './pin.svg',
  skinner = './skiup.svg',
  skier = './skidown.svg',
  snowboarder = './boardown.svg',
  apres = './beer.svg',
  death = './death.svg',
  compass = './compassicon.svg',
  flake = './snowflake.svg',
  angle = './angle.svg',
  report = './report.svg'
}

enum Animate {
  skin = 2000,
  ski = 5000,
  die = 3000,
  center = 500
}

function useMapIconSize(icon: MapIcon) {
  switch (icon) {
    case MapIcon.point:
      return 15;
    case MapIcon.skinner:
    case MapIcon.skier:
    case MapIcon.snowboarder:
      return 35;
    case MapIcon.apres:
      return 45;
    default:
      return 30;
  }
}

export interface GameMap {
  id: Map;
  src: string;
}

const gameMaps: GameMap[] = [{ id: Map.central, src: "./alta-map.png" }];

export { gameMaps, Map, MapIcon, Animate, useMapIconSize };
