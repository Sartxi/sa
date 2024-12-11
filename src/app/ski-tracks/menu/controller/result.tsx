import Image from "next/image";
import { MapIcon } from "../../map/data";
import { useEffect, useState } from "react";
import { getDuration } from "../../map/animation";

export interface ResultProps {
  wrong: boolean;
  close: (type?: string) => void;
  callback: () => void;
}

export default function Result(props: ResultProps) {
  const { wrong, close, callback } = props;
  const [showCta, setShowCta] = useState(false);

  const icon = wrong ? MapIcon.death : MapIcon.apres;
  const title = wrong ? 'Oops, you made a wrong turn.' : 'You chose wisely!';

  useEffect(() => {
    setTimeout(() => {
      if (!wrong) close();
      setShowCta(true);
    }, getDuration(wrong ? 'die' : 'skin'));
  }, []);

  return (
    <div className="consequence">
      <div>
        <Image src={icon} className={`consequence-icon${wrong ? ' death' : ''}`} width={200} height={200} alt="Consequence Icon" />
        <h1>{title}</h1>
      </div>
      <div className="choices">
        {showCta && (
          <span>
            {wrong ? (
              <div className="options">
                <button className="sa-cta" onClick={() => callback()}>
                  Restart Game
                </button>
                <button className="sa-cta" onClick={() => close('respawn')}>
                  Pretend it didnt happen
                </button>
              </div>
            ) : (
              <button className="sa-cta" onClick={() => close()}>
                Lets Go!
              </button>
            )}
          </span>
        )}
      </div>
    </div >
  )
}
