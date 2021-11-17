import React, { useState } from "react";
import style from "./style.module.scss";
import availableApis, { ApiConfig, Param, ParamType } from "./available-apis";
import Parameter from "./Parameter";

interface IProps {
  onGeneration: (api: Function, params: any[], columns: string[]) => void;
}

const intialSelectedState = {
  key: "",
  label: "Pick an API",
  params: [],
} as unknown as ApiConfig;

const Prebuilt = ({ onGeneration }: IProps) => {
  const [selected, setSelected] = useState<ApiConfig>(intialSelectedState);

  const handleGeneration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formValues = Array.from(form.elements)
      .map((el) => {
        const element = el as HTMLInputElement;
        return element.value;
      })
      .slice(1);

    onGeneration(selected.api, formValues, selected.columns);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    for (let i = 0; i < availableApis.length; i += 1) {
      if (availableApis[i].key === value) {
        setSelected(availableApis[i]);
        return;
      }
    }
    setSelected(intialSelectedState);
  };

  return (
    <form className={style.prebuilt} onSubmit={handleGeneration}>
      <select onChange={handleChange} value={selected.key}>
        <option value={""}>Pick an API</option>
        {availableApis.map((api) => (
          <option value={api.key} key={api.key}>
            {api.label}
          </option>
        ))}
      </select>

      {selected.params.map((param) => (
        <Parameter param={param} key={param.id} />
      ))}

      <button disabled={selected.key === ""} type={"submit"}>
        Generate
      </button>
    </form>
  );
};
export default Prebuilt;
