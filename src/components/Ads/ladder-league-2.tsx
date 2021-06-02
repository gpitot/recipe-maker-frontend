import React from "react";
import Information from "components/Information";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

const LadderLeagueAd2 = () => (
  <Link to="/competition">
    <Information styles={style.gap}>
      <h3>Want to play more competitively? Sign up to the ladder league</h3>
    </Information>
  </Link>
);

export default LadderLeagueAd2;
