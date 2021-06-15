import React from "react";
import style from "./style.module.scss";
interface IProps {
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  name: string;
  type?: string;
  checked?: boolean;
}

const Input = ({
  type = "text",
  name,
  label,
  handleChange,
  value,
  checked,
}: IProps) => {
  const valueProp = value !== undefined ? { value } : {};
  return (
    <div className={style.parent}>
      <label>{label}</label>
      <input
        name={name}
        type={type}
        onChange={handleChange}
        checked={checked}
        {...valueProp}
      />
    </div>
  );
};

export default Input;
