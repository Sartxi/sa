import { CSSProperties, useEffect, useState } from "react";
import { PageProps } from "../page";
import { PageSections } from "./header";
import { useMedia } from "../hooks/viewport";

interface Trailrun {
  [x: string]: CSSProperties;
}

interface Style {
  style?: CSSProperties | undefined;
  station?: PageSections;
}

function rect(el: HTMLElement | null) {
  if (!el) return { top: 0 };
  const { top } = el.getBoundingClientRect();
  return { top: top + window.scrollY };
}

function useTrail(section: PageSections): Trailrun {
  const [trail, setTrail] = useState({});
  const [run, setRun] = useState({});

  useEffect(() => {
    const halfway = '65%';
    switch (section) {
      case PageSections.Landing:
        const start = rect(document.getElementById('iam'));
        setTrail({ marginTop: start.top });
        setRun({ height: 0 });
        break;
      case PageSections.Contact:
        setTrail({ height: halfway });
        setRun({ marginBottom: '100px', height: halfway });
        break;
      default:
        setTrail({ marginTop: '150px', marginBottom: '150px' });
        setRun({ height: halfway });
        break;
    }
  }, [section]);

  return { run, trail };
}

function Aid({ station }: Style) {
  const stations = Object.keys(PageSections).map((s) => {
    const key = PageSections[s as keyof typeof PageSections];
    return key;
  });

  return (
    <span className={`aid-stations${station === PageSections.Contact ? ' last' : ''}`}>
      {stations.map((s) => {
        const style = s === station ? ' active' : '';
        return (
          <span key={s} className={`aid-station ${s}${style}`}>
            <span><code>{`<${s.toLowerCase()} />`}</code></span>
          </span>
        )
      })}
    </span>
  )
}

function Heatmap({ style }: Style) {
  return <span className="heat-map" style={style} />;
}

export function Trail(props: PageProps) {
  const { trail, run } = useTrail(props.active);
  const { mobile } = useMedia();
  if (mobile) return <span />;

  return (
    <div id="Trail" style={trail} className="run">
      <Heatmap style={run} />
      <Aid station={props.active} />
    </div>
  )
}
