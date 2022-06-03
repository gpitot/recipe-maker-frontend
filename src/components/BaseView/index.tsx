import Nav from "components/Nav";
import React from "react";
import style from "./style.module.scss";

const BaseView = ({ children }: { children: React.ReactNode }) => (
  <>
    <Nav />
    <main className={style.wrapper}>{children}</main>
    <footer></footer>
  </>
);

export default BaseView;
