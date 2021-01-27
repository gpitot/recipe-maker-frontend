import React from "react";
import Header from "components/Header";
import style from "./style.module.scss";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface IBase {
  children: React.ReactNode;
}
const Base = ({ children }: IBase) => (
  <div className={style.base}>
    <Header />
    <ToastContainer />
    {children}
  </div>
);

export default Base;
