import { useClickOutside } from "@/app/hooks/viewport";
import { useEffect, useState } from "react";

interface SelectProps {
  value: string | undefined;
  values: string[];
  changed: (value: string) => void;
}

export default function Select({ value, values, changed }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(value);

  useClickOutside('SaSelect', open, () => setOpen(false));
  useEffect(() => {
    if (active !== undefined) changed(active);
  }, [active]);

  return (
    <div id="SaSelect" className={`select-tool ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      {open ? (
        <div className="select-area">
          <div className="select-item main"><i>Select</i></div>
          {values.map(v => (<div key={v} className={`select-item ${active === v ? 'active' : ''}`} onClick={() => setActive(v)}>{v}</div>))}
        </div>
      ) : (
        <div className="select-item main">
          {active ? active : <i>Select</i>}
          <div className="arrow-down" />
        </div>
      )}
    </div>
  )
}
