import React from "react";

type Option = {
  text: string;
  value?: string;
};

type Props = {
  options: Option[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};

const Select = ({ options, handleChange, value }: Props) => {
  return (
    <select onChange={handleChange} value={value}>
      {options.map(({ text, value }) => (
        <option value={value} key={value}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default Select;
