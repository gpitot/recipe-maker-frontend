import React, { useEffect, useState } from "react";
import style from "styles/pages.module.scss";
import socialStyle from "pages/Social/style.module.scss";

import BoxLink from "components/BoxLink";
import API from "rest/api";
import { ILadders } from "rest/ladder";

const Competition = () => {
  const [comps, setComps] = useState<Array<ILadders>>([]);

  useEffect(() => {
    API.ladder.getLadders().then(({ result }) => {
      setComps(result);
    });
  }, []);

  return (
    <section className={style.area}>
      <section className={style.child}>
        <div className={socialStyle.events}>
          {comps.map((comp) => (
            <BoxLink {...comp} key={comp.id} link={'/competition/ladder'} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Competition;
