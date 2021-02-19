import React from "react";
import style from "./style.module.scss";
const BookingSlots = () => {
  return (
    <iframe
      title="Booking iframe"
      className={style.booking}
      src="https://www.tennisvenues.com.au/booking/warringah-recreation-centre-squash?mobileViewDisabled=false"
    ></iframe>
  );
};

export default BookingSlots;
