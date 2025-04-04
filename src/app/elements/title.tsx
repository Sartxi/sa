import Image from "next/image";
import { useSectionIcon } from "../hooks/scheme";
import { PageSections } from "./header";

interface SectionTitle {
  id?: string;
  section: PageSections;
  text: string;
  activeSelect?: any;
  selects?: any;
  setSelect?: any;
  hideIcon?: boolean;
}

function getSelects(props: SectionTitle) {
  if (!props.selects) return <span />;
  const { activeSelect, selects, setSelect } = props;
  return (
    <div className="selects">
      {Object.keys(selects).map((select) => {
        const active = `select tooltip top ${activeSelect === select ? 'active' : ''}`;
        return (
          <span
            key={select}
            data-tooltip={select}
            className={active}
            onClick={() => setSelect(select)} />
        )
      })}
    </div>
  )
}

export function Title(props: SectionTitle) {
  const icon = useSectionIcon(props.section);
  return (
    <div className="title-wrapper">
      {getSelects(props)}
      <h2 className="title">
        {!props.hideIcon && (
          <span className="icon">
            <Image
              src={icon}
              alt={`${props.section} icon`}
              width={45}
              height={45}
            />
          </span>
        )}
        <span id={props.id ?? props.text.replaceAll(' ', '')}>{props.text}</span>
      </h2>
    </div>
  )
}