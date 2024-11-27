import Image from "next/image";

interface SectionTitle {
  text: string;
  activeSelect?: any;
  selects?: any;
  setSelect?: any;
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
  return (
    <div className="title-wrapper">
      {getSelects(props)}
      <h2 className="title">
        <span>
          <Image
            src="/element.svg"
            alt="icon"
            width={45}
            height={45}
            priority
          />
        </span>
        {props.text}
      </h2>
    </div>
  )
}