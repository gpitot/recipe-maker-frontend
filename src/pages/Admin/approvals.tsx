import React, { useEffect, useState } from "react";
import UserRow from "components/UserRow";
import EventDate from "components/EventDate";
import List from "components/List";

import API from "rest/api";
import { IMatches } from "rest/ladder";
import Information from "components/Information";
import Button from "components/Button";
import { toast } from "react-toastify";

const ResultRow = ({
  id,
  player_1,
  player_1_firstname,
  player_1_photo,
  player_1_games,
  player_2,
  player_2_firstname,
  player_2_photo,
  player_2_games,
  match_date,
}: IMatches) => {
  const handleSubmit = () => {
    API.ladder
      .challengeApprove({ match_id: id })
      .then(({ success }) => {
        if (success) {
          toast.success("Approved result");
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        toast.error("Could not approve result");
      });
  };

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
        {player_1_games} : {player_2_games}
      </td>
      <td>
        <Button text="Approve" handleClick={handleSubmit} />
      </td>
    </>
  );
};

const Approvals = () => {
  const [matches, setMatches] = useState<Array<IMatches>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.ladder
      .getAwaitApprovals()
      .then(({ success, result }) => {
        if (success) {
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
        <h3>You have no approvals to enter.</h3>
      </Information>
    );

  const body = matches.map((match) => [<ResultRow {...match} />]);

  return (
    <List
      title="Pending approvals"
      headers={["Challenger", "Opponent", "Result", "Date", "Approve"]}
      body={body}
      columnsInBuilt
    />
  );
};

export default Approvals;
