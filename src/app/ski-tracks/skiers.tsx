import Image from "next/image";
import { MapIcon } from "./map/data";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export function usePlayerParam(rider: boolean | MapIcon, player: string | null, setPlayer: (icon: MapIcon) => void) {
  return useEffect(() => {
    if (rider && player) {
      const playerIcon = player === 'skier' ? MapIcon.skier : MapIcon.snowboarder;
      if (rider !== playerIcon) setPlayer(playerIcon);
    }
  }, [player]);
}

export default function SkierEggs() {
  const router = useRouter();
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
          onClick={() => router.push(`/ski-tracks?rider=${rider === MapIcon.skier ? 'skier' : 'snowboarder'}`)} />
      )
    })
  );
}
