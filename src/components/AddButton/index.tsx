import React from "react";

type Props = {
  text: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const AddButton = ({ text, handleClick, disabled=false }: Props) => (
  <button onClick={handleClick} disabled={disabled}>
    {text}
  </button>
);

export default AddButton;
