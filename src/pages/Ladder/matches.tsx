import React, { useEffect } from "react";

import { useMatchesStore } from "../../store/matches";

import Challenges from "pages/Ladder/challenges";
import Results from "pages/Ladder/results";

interface IProps {
  ladderid?: number;
  isChallenge: boolean;
  player_id?: number;
}
const Matches = ({ ladderid, isChallenge, player_id }: IProps) => {
  const [{ challenges, results }, resultActions] = useMatchesStore();

  useEffect(() => {
    resultActions.initialLoad({ ladder_id: ladderid, player_id, isChallenge });
  }, [resultActions, ladderid, isChallenge, player_id]);

  const matches = isChallenge ? challenges : results;

  if (matches.length === 0) return null;

  return (
    <>
      {isChallenge ? (
        <Challenges matches={matches} />
      ) : (
        <Results matches={matches} />
      )}
    </>
  );
};

export default Matches;
