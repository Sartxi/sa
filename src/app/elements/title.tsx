import Image from "next/image";

interface SectionTitle {
  id?: string;
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
  return (
    <div className="title-wrapper">
      {getSelects(props)}
      <h2 className="title">
        {!props.hideIcon && (
          <span className="icon">
            <Image
              src="/element.svg"
              alt="icon"
              width={45}
              height={45}
              priority
            />
          </span>
        )}
        <span id={props.id ?? props.text.replaceAll(' ', '')}>{props.text}</span>
      </h2>
    </div>
  )
}