import Image from "next/image";
import { MapIcon } from "../../map/data";
import { useEffect, useState } from "react";
import { getDuration } from "../../map/animation";
import { ButtonProps, Buttons } from "@/app/elements/buttons";

export interface ResultProps {
  wrong: boolean;
  close: () => void;
  buttons: ButtonProps[] | null;
}

export default function Result(props: ResultProps) {
  const { wrong, buttons, close } = props;
  const [disable, setDisable] = useState(true);

  const icon = wrong ? MapIcon.death : MapIcon.apres;
  const title = wrong ? 'Oops, you made a wrong turn.' : 'You chose wisely!';

  useEffect(() => {
    setTimeout(() => {
      if (!wrong) close();
      setDisable(false);
    }, getDuration(wrong ? 'die' : 'skin'));
  }, []);

  return (
    <div className="consequence">
      <div>
        <Image src={icon} className={`consequence-icon${wrong ? ' death' : ''}`} width={200} height={200} alt="Consequence Icon" />
        <h1>{title}</h1>
      </div>
      {buttons ? (
        <div className="choices">
          <Buttons buttons={buttons} disabled={disable} />
        </div>
      ) : ''}
    </div >
  )
}
