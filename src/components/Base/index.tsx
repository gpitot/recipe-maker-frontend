import React from "react";
import { Link } from "react-router-dom";
import Header from "components/Header";
import CTAMenu from "components/CTAMenu";
import style from "./style.module.scss";

import "react-toastify/dist/ReactToastify.css";

interface IBase {
  children: React.ReactNode;
}
const Base = ({ children }: IBase) => (
  <div className={style.base}>
    <Header />
    <CTAMenu>
      <h2>PLAY AT MANLY</h2>
      <Link to="/social">PLAY SOCIALLY</Link>
      <Link to="/competition">COMPETE AGAINST OTHERS</Link>
      <Link to="/coaching">IMPROVE YOUR PLAY</Link>
      <Link to="/shop">SHOP</Link>
    </CTAMenu>
    <section className={style.background}>
      <section className={style.area}>{children}</section>
    </section>
    <a
      //href="https://northmanlysquashwrc.simplybook.me/v2/#book"
      href="http://www.tennisvenues.com.au/booking/warringah-recreation-centre-squash"
      target="_blank"
      rel="noreferrer"
      className={style.book}
    >
      BOOK A COURT
    </a>
  </div>
);

export default Base;
