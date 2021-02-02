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
      </section>
    </>
  );
};

export default Home;
