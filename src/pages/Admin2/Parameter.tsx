import React, { useState } from "react";
import { Param, ParamType } from "./available-apis";

interface IProps {
  param: Param;
}

const Input = (param: Param) => {
  const { type, values, id } = param;

  const [value, setValue] = useState(param.value);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue(e.target.value);
  };

  if (type === ParamType.string) {
    return (
      <input id={id} type={"text"} onChange={handleChange} value={value} />
    );
  }
  if (type === ParamType.number) {
    return (
      <input id={id} type={"number"} onChange={handleChange} value={value} />
    );
  }
  if (type === ParamType.option && values) {
    return (
      <select onChange={handleChange} value={value} id={id}>
        {values.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    );
  }
  return null;
};

const Parameter = ({ param }: IProps) => {
  const { id, label } = param;

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Input {...param} />
    </>
  );
};

export default Parameter;
