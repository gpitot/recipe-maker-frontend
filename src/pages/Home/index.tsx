import React from "react";
import CTAMenu from "components/CTAMenu";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

const Home = () => (
  <>
    <section className={style.area}>
      <video src="video.webm" className={style.video}></video>
      <CTAMenu>
        <h2>PLAY AT MANLY</h2>
        <Link to="/social">JOIN MONDAY SOCIAL</Link>
        <Link to="/competition">COMPETE AGAINST OTHERS</Link>
        <Link to="/coaching">IMPROVE YOUR PLAY</Link>
        <Link to="/shop">SHOP</Link>
      </CTAMenu>
    </section>
    <a
      href="http://www.tennisvenues.com.au/booking/warringah-recreation-centre-squash"
      target="_blank"
      className={style.book}
    >
      BOOK A COURT
    </a>
  </>
);
export default Home;
