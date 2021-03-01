import React from "react";
import { useParams, Redirect } from "react-router-dom";

import Ranks from "pages/Ladder/ranks";
import Matches from "pages/Ladder/matches";

interface ParamTypes {
  ladderid: string;
}

const Ladder = () => {
  const { ladderid } = useParams<ParamTypes>();

  let id: number;
  try {
    id = parseInt(ladderid);
  } catch {
    return <Redirect to="/competition" />;
  }

  return (
    <>
      <Ranks ladderid={id} />
      <Matches ladderid={id} challenges={true} />
      <Matches ladderid={id} challenges={false} />
    </>
  );
};

export default Ladder;
