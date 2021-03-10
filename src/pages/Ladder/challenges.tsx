import React, { useState, useContext } from "react";
import List from "components/List";
import { IMatches } from "rest/ladder";
import UserRow from "components/UserRow";
import { UserContext } from "contexts/UserContext";
import { IUser } from "rest/users";
import Button from "components/Button";
import API from "rest/api";
import { toast } from "react-toastify";
import Edit from "components/Edit";
import EditChallenge from "components/EditConfigs/edit-challenge";
import EventDate from "components/EventDate";

interface IAcceptProps {
  id: number;
  accepted: boolean;
  player_2: number;
  user: IUser;
}

const AcceptChallenge = ({ id, accepted, player_2, user }: IAcceptProps) => {
  const [submitted, setSubmitted] = useState(false);

  if (accepted) return <span>Accepted</span>;
  if (!user.id) return <span>Pending</span>;
  if (player_2 !== user.id) return <span>Pending</span>;

  const handleClick = () => {
    API.ladder.challengeAccept({ match_id: id }).then((res) => {
      if (res.success) {
        toast.success("Challenge accepted");
        setSubmitted(true);
      } else {
        toast.error("Challenge could not be accepted");
      }
    });
  };

  return (
    <Button disabled={submitted} text={"Accept"} handleClick={handleClick} />
  );
};

interface IProps {
  matches: Array<IMatches>;
}

const Challenges = ({ matches }: IProps) => {
  const { user } = useContext(UserContext);
  const body = matches.map((match) => {
    const {
      id,
      player_1,
      player_1_firstname,
      player_1_photo,
      player_2,
      player_2_firstname,
      player_2_photo,
      accepted,
      match_date,
    } = match;
    return [
      <UserRow
        id={player_1}
        name={player_1_firstname}
        photo={player_1_photo}
      />,
      <UserRow
        id={player_2}
        name={player_2_firstname}
        photo={player_2_photo}
      />,
      <>
        {match_date ? (
          <EventDate time={match_date} />
        ) : (
          <AcceptChallenge
            id={id}
            accepted={accepted}
            player_2={player_2}
            user={user}
          />
        )}

        <Edit>
          {(setOpen) => <EditChallenge setOpen={setOpen} {...match} />}
        </Edit>
      </>,
    ];
  });

  return (
    <List
      title="Upcoming challenges"
      headers={["Challenger", "Opponent", "Accepted"]}
      body={body}
    />
  );
};

export default Challenges;
