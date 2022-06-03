import React from "react";
import style from "./style.module.scss";
type Props = {
  id: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  placeholder? : string;
  type?: string;
};

const Input = ({ id, handleChange, value , placeholder="Search and add", type="text"}: Props) => (
  <input
    type={type}
    value={value}
    onChange={handleChange}
    name={id}
    placeholder={placeholder}
    className={style.search}
  />
);

export default Input;
