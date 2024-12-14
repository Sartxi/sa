import Image from "next/image";
import { MapIcon } from "./map/data";
import { redirect } from 'next/navigation';

export default function SkierEggs() {
  const riders = [MapIcon.skier, MapIcon.snowboarder];
  const getType = (rider: MapIcon) => {
    let type = 'skier';
    if (rider === MapIcon.snowboarder) type = 'boarder';
    return type;
  };
  return (
    riders.map((rider) => {
      const type = getType(rider);
      return (
        <Image
          key={rider}
          src={rider}
          width={20}
          height={20}
          className={`${type} ski-egg`}
          alt="ski tracks player"
          onClick={() => redirect('/ski-tracks')} />
      )
    })
  );
}
