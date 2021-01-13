import React from "react";
import Header from "components/Header";
import style from "./style.module.scss";

interface IBase {
  children: React.ReactNode;
}
const Base = ({ children }: IBase) => (
  <div className={style.base}>
    <Header />
    {children}
  </div>
);

export default Base;
