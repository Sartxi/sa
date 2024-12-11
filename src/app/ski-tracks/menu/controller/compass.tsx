import Image from "next/image";
import { useState } from "react";
import { MapIcon } from "../../map/data";
import { Nav, Snow } from "../../game/data";
import { SafetyMetrix } from "./data";

interface CompassProps {
  metrix: SafetyMetrix;
  navigate: (nav: Nav) => void;
}

function AvalancheReport({ show }: { show: boolean }) {
  return (
    <div className={`avy-report${show ? ' open' : ''}`}>
      <Image src="./rose.png" width={150} height={200} alt="avy rose" />
      <div className="avy-details">
        <h3>Avalanche Report</h3>
        <p>The persistent weak layer (PWL) making up most of the snowpack on the north east side of the compass continues to weaken. This structure is not going to be able to support much in the way of new snow or wind loading.</p>
        <div className="avy-type">
          <Image src="./avy-type.png" width={50} height={50} alt="avy rose" />
          <div>
            <h4>PWL</h4>
            <p>Persistent weak layer (PWL)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SnowQuality({ show }: { show: boolean }) {
  if (!show) return <span />;
  return (
    <div className="snow-quality">
      {Object.keys(Snow).map((s) => {
        const key = Snow[s as keyof typeof Snow];
        return (
          <div key={key} className="quality">
            <Image className={`snow-icon ${key.toLocaleLowerCase()}`} src={MapIcon.flake} width={17} height={17} alt="quality" />
            {key}
          </div>
        );
      })}
    </div>
  )
}

export default function Compass({ metrix, navigate }: CompassProps) {
  const [hovered, setHovered] = useState(null);
  const [showAngles, setShowAngles] = useState(false);
  const [showQuality, setShowQuality] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const buttons: any = Object.keys(Nav).map((s, i) => {
    const key = Nav[s as keyof typeof Nav];
    const { angle, quality } = metrix.points[i];
    return { key, angle: `${angle}%`, quality };
  });

  const decide = (dir: Nav) => {
    setShowAngles(false);
    setShowQuality(false);
    setShowReport(false);
    navigate(dir);
  };

  const toolbtns = [
    { show: showAngles, toggle: () => setShowAngles(!showAngles), icon: MapIcon.angle, alt: 'See slope angles' },
    { show: showQuality, toggle: () => setShowQuality(!showQuality), icon: MapIcon.flake, alt: 'See snow quality' },
    { show: showReport, toggle: () => setShowReport(!showReport), icon: MapIcon.report, alt: 'See avalanche report' },
  ];

  const snowsize = !showAngles ? 35 : 25;
  const openMetrix = showQuality || showAngles;

  return (
    <div className="compass-tool">
      <div className="tools">
        <div className="nav-buttons" onMouseLeave={() => setHovered(null)}>
          <span className={`nav-indicator${hovered ? ' show' : ''}`}>
            <span>GO</span>
            {hovered}
          </span>
          <Image fill src={MapIcon.compass} className="nav-icon" alt="compass" />
          {buttons.map(({ key, angle, quality }: any) => {
            return (
              <div
                key={key}
                className={`nav-button ${key.toLowerCase()}`}
                onMouseEnter={() => setHovered(key)}
                onClick={() => decide(key)}>
                <div className="nav-dir">
                  {openMetrix ?
                    <span className="metrix">
                      {showQuality && (
                        <Image
                          className={`snow-icon ${quality.toLowerCase()}`}
                          src={MapIcon.flake}
                          width={snowsize}
                          height={snowsize}
                          alt={`${quality} snow quality`} />
                      )}
                      <span className={`angle${!showQuality ? ' big' : ''}`}>
                        {showAngles ? angle : ''}
                      </span>
                    </span>
                    : <span />}
                  <strong className={openMetrix ? 'small' : ''}>
                    {['N', 'S', 'E', 'W'].includes(key) && key}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
        <div className="tool-buttons">
          {toolbtns.map((b, i) => {
            return (
              <div key={`toolbtn${i}`} className={`btn${b.show ? ' active' : ''}`} onClick={b.toggle}>
                <Image src={b.icon} width={30} height={30} alt={b.alt} />
              </div>
            )
          })}
        </div>
      </div>
      <SnowQuality show={showQuality} />
      <AvalancheReport show={showReport} />
    </div>
  )
}
