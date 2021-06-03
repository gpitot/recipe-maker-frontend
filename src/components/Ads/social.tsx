import React from "react";
import Information from "components/Information";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

const SocialAd = () => (
  <Link to="/social">
    <Information styles={style.gap}>
      <h3>Sign up to the next social event</h3>
    </Information>
  </Link>
);

export default SocialAd;
