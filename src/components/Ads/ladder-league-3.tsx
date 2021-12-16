import React from "react";
import Information from "components/Information";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import classnames from "classnames";

const classes = classnames(style.gap, style.importantAd);

const LadderLeagueAd = () => (
  <Link to="/faq">
    <Information styles={classes}>
      <h4>Did you know your ladder rank gives you extra benefits?</h4>
      <h5>You can get up to a 50% discount on Mondays. Find out how here</h5>
    </Information>
  </Link>
);

export default LadderLeagueAd;
