import Image from "next/image";
import { GameProps } from "../game";
import { Nav, Route, routes } from "../routes";
import { MapIcon } from "../map";
import { useState } from "react";
import { getRandom } from "../map-util";
import { RouteDetails } from "../menus/index";
import { MenuType } from "../menu";
import NavButtons, { Snow } from "../compass";

function getDeathLocation(death: number[], deaths: number[][]) {
  return [...deaths, [death[0] + getRandom(22, 32), death[1] - getRandom(42, 62)]];
}

export default function RouteMenu({ setMenu, progress, play, setDeaths, deaths }: GameProps) {
  const [loading, setLoading] = useState(false);
  const active = progress?.routes.find((route) => route.active);
  const data: Route | undefined = routes.find((route) => route.id === active?.id);
  const correct = active && data?.answers[active.points.length];

  const navigate = (direction: Nav) => {
    if (direction !== correct && active) {
      const death = data?.points[active.points.length];
      if (death) setDeaths(getDeathLocation(death, deaths));
      setMenu({ type: MenuType.gameover });
      return;
    }
    if (active) {
      setLoading(true);
      active.points.push(1);
      const isSummit = data?.points.length === active.points.length;
      active.summit = isSummit;
      play(active);
      setTimeout(() => {
        if (isSummit) setMenu({ type: MenuType.finish });
        setLoading(false);
      }, 2000);
    }
  };

  const cancel = () => {
    if (active) {
      active.active = false;
      active.points = [];
      play(active);
      setMenu(null);
    }
  };

  const metrix = Object.keys(Nav).map((s) => {
    const key = Nav[s as keyof typeof Nav];
    const safe = [20, 29];
    const danger = [30, 41];
    const [min, max] = key === correct ? safe : danger;
    const snowTypes = Object.keys(Snow).map((s) => Snow[s as keyof typeof Snow]);
    return {
      angle: getRandom(min, max).toString(),
      quality: snowTypes[Math.floor(Math.random() * snowTypes.length)]
    };
  });

  return (
    <div className="menu">
      <div className="route-info">
        <RouteDetails route={data} cancel={cancel} />
        <div className="route-decision">
          <h2>
            <Image src={MapIcon.compass} width={20} height={20} alt="Navigation" />
            Navigation
          </h2>
          <p>Use your compass to decide which direction to proceed. Be sure to consider the avalanche report, slope angle, and snow quality.</p>
          <div className="action-area">
            <NavButtons
              angles={true}
              loading={loading}
              metrix={metrix}
              navigate={(dir) => navigate(dir)} />
          </div>
        </div>
      </div>
    </div>
  )
}
