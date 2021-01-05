import CTAMenu from "components/CTAMenu";
import React from "react";
import style from "./style.module.scss";
import { Link, useParams } from "react-router-dom";
import Information from "components/Information";

enum CompOptions {
  ladder = "ladder",
  timed = "timed",
  pennant = "pennant",
}

interface ParamTypes {
  comp?: CompOptions;
}

const Competition = () => {
  const { comp } = useParams<ParamTypes>();
  let currentComp = CompOptions.ladder;
  if (comp === CompOptions.timed || comp === CompOptions.pennant) {
    currentComp = comp;
  }

  return (
    <section className={style.area}>
      <CTAMenu>
        <h2>PLAY THE BEST</h2>
        <Link
          to="/competition/ladder"
          className={currentComp === CompOptions.ladder && style.active}
        >
          LADDER LEAGUE
        </Link>
        <Link
          to="/competition/timed"
          className={currentComp === CompOptions.timed && style.active}
        >
          TOURNAMENTS
        </Link>
        <Link
          to="/competition/pennant"
          className={currentComp === CompOptions.pennant && style.active}
        >
          INTERCLUB PENNANT
        </Link>
      </CTAMenu>

      <div className={style.child}>
        <div className={style.ranks}></div>
        <Information styles={style.block}>
          Details about ladder league
        </Information>
      </div>
    </section>
  );
};

export default Competition;
