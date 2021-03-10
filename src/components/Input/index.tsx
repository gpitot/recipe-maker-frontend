import React from "react";
import style from "./style.module.scss";
interface IProps {
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  type?: string;
}

const Input = ({ type = "text", name, label, handleChange, value }: IProps) => {
  return (
    <div className={style.parent}>
      <label>{label}</label>
      <input name={name} type={type} value={value} onChange={handleChange} />
    </div>
  );
};

export default Input;
