import React, { useEffect, useState } from "react";
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
    <div className={socialStyle.events}>
      {comps.map((comp) => (
        <BoxLink {...comp} key={comp.id} link={"/competition/ladder"} />
      ))}
    </div>
  );
};

export default Competition;
