import React from "react";
import style from "./style.module.scss";
import classnames from "classnames";
import { ClassValue } from "classnames/types";
interface IProps {
  handleClick?: (e: any) => void;
  text: string;
  disabled?: boolean;
  type?: "link" | "submit";
  href?: string;
  primary?: boolean;
  extraClasses?: ClassValue;
}

const Button = ({
  type,
  disabled = false,
  handleClick,
  text,
  href,
  primary = true,
  extraClasses,
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

  const classes = classnames(
    style.button,
    !primary && style.secondary,
    extraClasses
  );

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
