import React, { useEffect, useState } from "react";

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
    <>
      {comps.map((comp) => (
        <BoxLink {...comp} key={comp.id} link={"/competition/ladder"} />
      ))}
    </>
  );
};

export default Competition;
