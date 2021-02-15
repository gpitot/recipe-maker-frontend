import React from "react";
import { useParams, Redirect } from "react-router-dom";
import style from "styles/pages.module.scss";

import Ranks from "pages/Ladder/ranks";
import Matches from "pages/Ladder/matches";

interface ParamTypes {
  ladderid: string;
}

const Ladder = () => {
  const { ladderid } = useParams<ParamTypes>();

  let id;
  try {
    id = parseInt(ladderid);
  } catch {
    return <Redirect to="/competition" />;
  }

  return (
    <section className={style.area}>
      <section className={style.child}>
        <Ranks ladderid={id} />
        <Matches ladderid={id} challenges={true} />
        <Matches ladderid={id} challenges={false} />
      </section>
    </section>
  );
};

export default Ladder;
