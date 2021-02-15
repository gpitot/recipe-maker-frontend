import React, { useEffect } from "react";
import style from "./style.module.scss";
const BookingSlots = () => {
  return (
    <iframe
      className={style.booking}
      src="http://www.tennisvenues.com.au/booking/warringah-recreation-centre-squash?mobileViewDisabled=false"
    ></iframe>
  );
};

export default BookingSlots;
