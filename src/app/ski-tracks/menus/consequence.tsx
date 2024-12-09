import Image from "next/image";
import { MapIcon } from "../map";
import { useEffect, useState } from "react";

export interface ConsequenceProps {
  wrong: boolean;
  close: () => void;
  callback: () => void;
}

export default function Consequence(props: ConsequenceProps) {
  const { wrong, close, callback } = props;
  const [canGo, setCanGo] = useState(false);

  const icon = wrong ? MapIcon.death : MapIcon.apres;
  const title = wrong ? 'Oops, you made a wrong turn.' : 'Congrats! You stayed on top!';

  useEffect(() => {
    setTimeout(() => setCanGo(true), 2000);
  }, [props]);

  return (
    <div className="consequence">
      <Image src={icon} className={`consequence-icon${wrong ? ' death' : ''}`} width={200} height={200} alt="Consequence Icon" />
      <h1>{title}</h1>
      {canGo && (
        <div className="choices">
          {wrong ? (
            <div className="options">
              <button className="sa-cta" onClick={() => callback()}>
                Restart Game
              </button>
              <button className="sa-cta" onClick={() => close()}>
                Pretend it didn't happen
              </button>
            </div>
          ) : (
            <button className="sa-cta" onClick={() => close()}>
              Let's Go!
            </button>
          )}
        </div>
      )}
    </div>
  )
}
