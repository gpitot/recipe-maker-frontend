import React from "react";
import Information from "components/Information";
import style from "./style.module.scss";
import classnames from "classnames";
const StreakIncentive = () => (
  <div className={style.streak}>
    <Information styles={classnames(style.gap)}>
      <h3>Play 3 weeks in a row and get the 4th free!</h3>
    </Information>
  </div>
);

export default StreakIncentive;
