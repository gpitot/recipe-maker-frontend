import React, { useState } from "react";
import style from "./style.module.scss";
import availableApis, { ApiConfig, Param, ParamType } from "./available-apis";

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

  const handleGeneration = () => {
    onGeneration(selected.api, [], selected.columns);
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

  const buildParams = (param: Param) => {
    return (
      <label>{param.label}</label>
      // {
      //     param.type === ParamType.string && <input type={"text"}
      // }
    );
  };

  return (
    <section className={style.prebuilt}>
      <select onChange={handleChange} value={selected.key}>
        <option value={""}>Pick an API</option>
        {availableApis.map((api) => (
          <option value={api.key}>{api.label}</option>
        ))}
      </select>

      {selected.params.map(buildParams)}

      <button disabled={selected.key === ""} onClick={handleGeneration}>
        Generate
      </button>
    </section>
  );
};
export default Prebuilt;
