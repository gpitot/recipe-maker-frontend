import React, { useEffect, useState } from "react";
import UserRow from "components/UserRow";
import EventDate from "components/EventDate";
import List from "components/List";

import API from "rest/api";
import { IMatches } from "rest/ladder";
import Information from "components/Information";
import Button from "components/Button";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";

const ResultRow = ({
  id,
  player_1,
  player_1_firstname,
  player_1_photo,
  player_2,
  player_2_firstname,
  player_2_photo,
  match_date,
}: IMatches) => {
  const [games, setGames] = useState({
    player_1_games: "0",
    player_2_games: "0",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showFlag } = useFlags();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGames({
      ...games,
      [e.target.name]: e.target.value,
    });
  };

  const validateGames = () => {
    //1 must be equal to 3
    //both cannot be 3
    const { player_1_games, player_2_games } = games;
    if (player_1_games !== "3" && player_2_games !== "3") {
      showFlag({
        isAutoDismiss: true,
        title: "One person must have won 3 games",
        icon: <ErrorIcon label="error" secondaryColor={R400} />,

        appearance: "error",
      });
      return false;
    }
    if (player_1_games === "3" && player_2_games === "3") {
      showFlag({
        isAutoDismiss: true,
        title: "Both people cannot have won 3 games",
        icon: <ErrorIcon label="error" secondaryColor={R400} />,

        appearance: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateGames()) {
      setLoading(true);
      const { player_1_games, player_2_games } = games;
      API.ladder
        .challengeResult({
          match_id: id,
          player_1_games: parseInt(player_1_games),
          player_2_games: parseInt(player_2_games),
        })
        .then(({ success }) => {
          if (success) {
            showFlag({
              isAutoDismiss: true,
              title: "Result submitted!",
              icon: <SuccessIcon label="success" secondaryColor={G400} />,
              appearance: "success",
            });
            setSubmitted(true);
          } else {
            throw Error();
          }
        })
        .catch(() => {
          showFlag({
            isAutoDismiss: true,
            title: "Result could not be submitted",
            icon: <ErrorIcon label="error" secondaryColor={R400} />,

            appearance: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (submitted) return null;

  return (
    <>
      <td>
        <UserRow
          id={player_1}
          name={player_1_firstname}
          photo={player_1_photo}
        />
      </td>
      <td>
        <UserRow
          id={player_2}
          name={player_2_firstname}
          photo={player_2_photo}
        />
      </td>
      <td>
        <EventDate time={match_date} />
      </td>
      <td>
        <input
          type="number"
          min="0"
          max="3"
          value={games["player_1_games"]}
          name="player_1_games"
          onChange={handleChange}
        />{" "}
        :{" "}
        <input
          type="number"
          min="0"
          max="3"
          value={games["player_2_games"]}
          name="player_2_games"
          onChange={handleChange}
        />
      </td>
      <td>
        <Button text="Submit" handleClick={handleSubmit} disabled={loading} />
      </td>
    </>
  );
};

const SubmitResults = () => {
  const [matches, setMatches] = useState<Array<IMatches>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.ladder
      .getAwaitResults()
      .then(({ success, result }) => {
        if (success) {
          console.log(result);
          setMatches(result);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  if (matches.length === 0)
    return (
      <Information>
        <h3>You have no results to enter.</h3>
      </Information>
    );

  const body = matches.map((match) => [<ResultRow {...match} />]);

  return (
    <List
      title="Results"
      headers={["Challenger", "Opponent", "Date", "Result", "Submit"]}
      body={body}
      columnsInBuilt
    />
  );
};

export default SubmitResults;
