import CTAMenu from "components/CTAMenu";
import React from "react";
import style from "./style.module.scss";
import { Link, useParams } from "react-router-dom";
import Information from "components/Information";

import { Squash, Raquet } from "./details";
import SocialSquash from "pages/Social/SocialSquash";
import SocialRacquetball from "pages/Social/Racquetball";

enum SocialOptions {
  squash = "squash",
  racquetball = "racquetball",
}

interface ParamTypes {
  sport?: SocialOptions;
}

const Social = () => {
  const { sport } = useParams<ParamTypes>();
  let currentSport = SocialOptions.squash;
  if (sport === SocialOptions.racquetball) {
    currentSport = sport;
  }

  return (
    <section className={style.area}>
      <CTAMenu>
        <h2>PLAY SOCIALLY</h2>
        <Link
          to="/social/squash"
          className={currentSport === SocialOptions.squash && style.active}
        >
          MONDAY SQUASH
        </Link>
        <Link
          to="/social/racquetball"
          className={currentSport === SocialOptions.racquetball && style.active}
        >
          THURSDAY RACQUETBALL
        </Link>
      </CTAMenu>

      <div className={style.child}>
        <div className={style.block}>
          {currentSport === SocialOptions.squash ? (
            <SocialSquash />
          ) : (
            <SocialRacquetball />
          )}
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
