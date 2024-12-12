import Image from "next/image";

export interface ButtonProps {
  text: string;
  icon?: string;
  link?: string;
  style?: string;
  disable?: boolean;
  callback?: () => void;
}

interface ButtonsProps {
  buttons: ButtonProps[];
  disabled?: boolean;
}

function Button({ callback, text, icon, disable = false, style = '' }: ButtonProps) {
  return (
    <button className={`sa-cta${disable ? ' disabled ' : ''} ${style}`} onClick={() => !disable && callback?.()}>
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

export function Buttons({ buttons, disabled }: ButtonsProps) {
  const style = `sa-button${buttons.length > 1 ? 's' : ''}`;
  return (
    <span className={style}>
      {buttons.map((button: ButtonProps) => {
        button.disable = disabled;
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
