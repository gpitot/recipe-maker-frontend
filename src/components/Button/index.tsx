import React from "react";

interface IProps {
  handleClick: () => void;
  text: string;
  disabled?: boolean;
}

const Button = ({ disabled = false, handleClick, text }: IProps) => {
  return (
    <button disabled={disabled} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
