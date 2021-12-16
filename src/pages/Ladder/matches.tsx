import React, { useEffect, useState } from "react";
import API from "rest/api";
import { IMatches } from "rest/ladder";

import Challenges from "pages/Ladder/challenges";
import Results from "pages/Ladder/results";

interface IProps {
  ladderid?: number;
  challenges: boolean;
  player_id?: number;
}
const Matches = ({ ladderid, challenges, player_id }: IProps) => {
  const [matches, setMatches] = useState<Array<IMatches>>([]);

  useEffect(() => {
    API.ladder
      .getMatches({
        ladder_id: ladderid,
        challenges,
        player_id,
      })
      .then((res) => {
        if (res.success) {
          setMatches(res.result);
        }
      });
  }, [challenges, ladderid, player_id]);

  if (matches.length === 0) return null;

  return (
    <>
      {challenges ? (
        <Challenges matches={matches} />
      ) : (
        <Results matches={matches} />
      )}
    </>
  );
};

export default Matches;
