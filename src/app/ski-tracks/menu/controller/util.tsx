import { Nav } from "../../game/data";
import { getRandom } from "../../map/util";

export function getDirection(start: number[], direction: Nav) {
  let [a, b] = [...start];
  const [x, y] = [getRandom(62, 92), getRandom(42, 62)];
  switch (direction) {
    case Nav.north:
    case Nav.south:
      b = direction === Nav.north ? b - x : b + x;
      break;
    case Nav.east:
    case Nav.west:
      a = direction === Nav.west ? a - y : a + y;
      break;
    default:
      const northaxis = [Nav.northwest, Nav.northeast].includes(direction);
      const westaxis = [Nav.northwest, Nav.southwest].includes(direction);
      b = northaxis ? b - x : b + x;
      a = westaxis ? a - y : a + y;
      break;
  }
  return [a, b];
}
