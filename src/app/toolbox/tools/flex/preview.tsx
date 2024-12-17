import { FlexData } from "./data";

interface FlexPreviewProps {
  data: FlexData;
  grow?: number;
  setGrow: (index: number | undefined) => void;
}

export default function FlexPreview({ data, grow, setGrow }: FlexPreviewProps) {
  const items = data.items ? Array.from({ length: data.items }, (_, i) => i + 1) : [1];
  let style: any = { display: 'flex', flexDirection: data.direction };

  if (data.align) style.alignItems = data.align;
  if (data.justify) style.justifyContent = data.justify;
  if (data.wrap) style.flexWrap = data.wrap;
  if (data.gap) style.gap = `${data.gap}px`;

  return (
    <div className="flex-preview" style={style}>
      {items.map(i => {
        return (
          <div
            key={i}
            onClick={() => setGrow(i === grow ? undefined : i)}
            className={`pod item${i} ${grow === i ? 'grow' : ''}`}>
            {i}
          </div>
        )
      })}
    </div>
  )
}