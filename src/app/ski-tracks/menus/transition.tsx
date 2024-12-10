export interface TransProps {
  direction: string;
  close: () => void;
  callback: () => void;
}

export default function Transition(props: TransProps) {
  return (
    <div className="transition-puzzle">
      trans puzzle
    </div>
  )
}