import React from "react";
import style from "./style.module.scss";

import BookingSlots from "components/BookingSlots";

const Home = () => {
  return (
    <>
      <section className={style.area}>
        <BookingSlots />
      </section>
    </>
  );
};

export default Home;
