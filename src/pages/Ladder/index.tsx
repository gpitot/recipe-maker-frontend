import React from "react";
import { useParams, Redirect } from "react-router-dom";

import Ranks from "pages/Ladder/ranks";
import Matches from "pages/Ladder/matches";
import LadderLeagueAd from "components/Ads/ladder-league";
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
      <LadderLeagueAd />
      <Ranks ladderid={id} />
      <Matches ladderid={id} challenges={false} />
      <Matches ladderid={id} challenges={true} />
    </>
  );
};

export default Ladder;
