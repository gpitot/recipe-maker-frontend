import React, { useEffect } from "react";
import CTAMenu from "components/CTAMenu";
import style from "./style.module.scss";
import { Link, useLocation } from "react-router-dom";
import API from "rest/api";

const Home = () => {
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    if (query.get("updatelogin") === "true") {
      API.users.refreshUser();
    }
  }, [query]);

  return (
    <>
      <section className={style.area}>
        <video src="video.webm" className={style.video}></video>
        <CTAMenu>
          <h2>PLAY AT MANLY</h2>
          <Link to="/social">PLAY SOCIALLY</Link>
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
};

export default Home;
