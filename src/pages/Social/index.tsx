import CTAMenu from "components/CTAMenu";
import React from "react";
import style from "./style.module.scss";
import { Link, useParams } from "react-router-dom";
import Register from "components/Register";
import Information from "components/Information";

import { Squash, Raquet } from "./details";

enum SocialOptions {
  squash = "squash",
  raquetball = "raquetball",
}

interface ParamTypes {
  sport?: SocialOptions;
}

const Social = () => {
  const { sport } = useParams<ParamTypes>();
  let currentSport = SocialOptions.squash;
  if (sport === SocialOptions.raquetball) {
    currentSport = SocialOptions.raquetball;
  }

  return (
    <section className={style.area}>
      <CTAMenu>
        <h2>PLAY SOCIALLY</h2>
        <Link to="/social/squash" className={currentSport === SocialOptions.squash && style.active}>MONDAY SQUASH</Link>
        <Link to="/social/raquetball" className={currentSport === SocialOptions.raquetball && style.active}>THURSDAY RAQUETBALL</Link>
      </CTAMenu>

      <div className={style.child}>
        <div className={style.block}>
          <Register registerCTA={"SIGN UP FOR SQUASH"} />
        </div>
        <div className={style.block}>
          <Information>
            {currentSport === SocialOptions.squash ? <Squash /> : <Raquet />}
          </Information>
        </div>
      </div>
    </section>
  );
};

export default Social;
