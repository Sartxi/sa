import Image from "next/image";
import { MapIcon } from "../../map/data";
import { useEffect, useState } from "react";
import { getDuration } from "../../map/animation";
import { ButtonProps, Buttons } from "@/app/elements/buttons";

export interface ResultProps {
  wrong: boolean;
  close: () => void;
  buttons?: ButtonProps[];
}

export default function Result(props: ResultProps) {
  const { wrong, buttons, close } = props;
  const [show, setShow] = useState(false);

  const icon = wrong ? MapIcon.death : MapIcon.apres;
  const title = wrong ? 'Oops, you made a wrong turn.' : 'You chose wisely!';

  useEffect(() => {
    setTimeout(() => {
      if (!wrong) close();
      else setShow(true);
    }, getDuration(wrong ? 'die' : 'skin'));
  }, []);

  return (
    <div className="consequence">
      <div>
        <Image src={icon} className={`consequence-icon${wrong ? ' death' : ''}`} width={200} height={200} alt="Consequence Icon" />
        <h1>{title}</h1>
      </div>
      <div className="choices">
        {buttons && show ? (
          <Buttons buttons={buttons} />
        ) : ''}
      </div>
    </div >
  )
}
