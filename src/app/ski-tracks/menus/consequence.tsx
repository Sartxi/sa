export interface ConsequenceProps {
  wrong: boolean;
  close: () => void;
  callback: () => void;
}

export default function Consequence(props: ConsequenceProps) {
  const { callback } = props;
  return (
    <div className="consequence">
      Consequence
      <div className="choices">
        <button onClick={() => callback()}>
          Choose
        </button>
      </div>
    </div>
  )
}
