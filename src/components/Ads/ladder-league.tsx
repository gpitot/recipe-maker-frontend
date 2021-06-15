import React from "react";
import Information from "components/Information";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

const LadderLeagueAd = () => (
  <Link to="/competition">
    <Information styles={style.gap}>
      <h3>$20 Ladder league matches in off peak times, save 45%!</h3>
    </Information>
  </Link>
);

export default LadderLeagueAd;