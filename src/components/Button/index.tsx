import React from "react";
import style from "./style.module.scss";
interface IProps {
  handleClick?: (e: any) => void;
  text: string;
  disabled?: boolean;
  type?: "button" | "link";
  href?: string;
}

const Button = ({
  type = "button",
  disabled = false,
  handleClick,
  text,
  href,
}: IProps) => {
  if (type === "link") {
    return (
      <a
        className={style.button}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  }

  return (
    <button className={style.button} disabled={disabled} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
