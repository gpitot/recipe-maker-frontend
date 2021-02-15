import React, { useEffect } from "react";
import style from "./style.module.scss";
import { useLocation } from "react-router-dom";
import API from "rest/api";
import BookingSlots from "components/BookingSlots";

const Home = () => {
  const query = new URLSearchParams(useLocation().search);
  const refreshUser = query.get("updatelogin") === "true";

  useEffect(() => {
    if (refreshUser) {
      API.users.refreshUser();
    }
  }, [refreshUser]);

  return (
    <>
      <section className={style.area}>
        <BookingSlots />
      </section>
    </>
  );
};

export default Home;
