import React from "react";
import style from "./style.module.scss";

const LoginError = () => (
  <section className={style.area}>
    <h1>Could not log you in, please try again.</h1>
  </section>
);

export default LoginError;
