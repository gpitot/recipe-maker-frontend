import React from "react";
import Information from "components/Information";
import style from "./style.module.scss";
import classnames from "classnames";
import Streak from "components/Streak";

const StreakIncentive = () => (
  <div className={style.streak}>
    <Information styles={classnames(style.gap, style["no-underline"])}>
      <h3 className={style["streak-info"]}>
        Play <Streak streak={3} /> weeks
      </h3>
      <h3 className={style["streak-heading"]}>
        in a row and get the 4th free!
      </h3>
    </Information>
  </div>
);

export default StreakIncentive;
