import React, { useState } from "react";
import style from "./style.module.scss";

interface IProps {
  children: React.ReactNode;
}
const Information = ({ children }: IProps) => (
  <div className={style.block}>{children}</div>
);
export default Information;
