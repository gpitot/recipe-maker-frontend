import CTAMenu from "components/CTAMenu";
import React from "react";
import style from "./style.module.scss";
import pageStyle from "styles/pages.module.scss";

import { Link, useParams } from "react-router-dom";
import Ladder from "pages/Ladder";

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
    <section className={pageStyle.area}>
      <div className={pageStyle.child}>
        <Ladder ladderid={1} />
      </div>
    </section>
  );
};

export default Competition;
