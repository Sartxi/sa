import Image from "next/image";

export interface ButtonProps {
  text: string;
  callback?: () => void;
  icon?: string;
  link?: string;
  style?: string;
}

interface ButtonsProps {
  buttons: ButtonProps[];
}

function Button({ callback, text, icon, style = '' }: ButtonProps) {
  return (
    <button className={`sa-cta ${style}`} onClick={() => callback?.()}>
      {icon && (
        <Image
          src={icon}
          className="button-icon"
          alt={`${text} button icon`}
          width="17"
          height="17"
        />
      )}
      {text}
    </button>
  )
}

export function Buttons({ buttons }: ButtonsProps) {
  const style = `sa-button${buttons.length > 1 ? 's' : ''}`;
  return (
    <span className={style}>
      {buttons.map((button: ButtonProps) => {
        if (button.link) return (
          <a key={button.text} href={button.link} target="_blank">
            <Button {...button} />
          </a>
        )
        return <Button key={button.text} {...button} />;
      })}
    </span>
  )
}
