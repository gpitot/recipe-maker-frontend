import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import style from "./style.module.scss";
import List from "components/List";
import UserRow from "components/UserRow";
import EventDate from "components/EventDate";
import Information from "components/Information";

import API from "rest/api";
import { IMatches } from "rest/ladder";
import { IEvent } from "rest/events";
import Button from "components/Button";

const Home = () => {
  const [upcomingMatches, setUpcomingMatches] = useState<Array<IMatches>>([]);
  const [events, setEvent] = useState<Array<IEvent>>([]);

  const history = useHistory();

  useEffect(() => {
    API.ladder.getUpcoming().then(({ result, success }) => {
      if (success) {
        setUpcomingMatches(result);
      }
    });

    API.events.getEvents().then(({ result, success }) => {
      if (success) {
        setEvent(result);
      }
    });
  }, []);

  const upcomingList = upcomingMatches.map((match) => {
    const {
      player_1_firstname,
      player_1_photo,
      player_2_firstname,
      player_2_photo,
      match_date,
    } = match;
    return [
      <UserRow name={player_1_firstname} photo={player_1_photo} />,
      <UserRow name={player_2_firstname} photo={player_2_photo} />,
      <EventDate time={match_date} />,
    ];
  });

  const handleSignUp = (id: number) => {
    history.push(`/event/${id}`);
  };

  return (
    <section className={style.area}>
      <div className={style.video}>
        {upcomingList.length > 0 && (
          <List
            title="Upcoming matches"
            headers={["Challenger", "Opponent", "Time"]}
            body={upcomingList}
          />
        )}

        {events.map(({ name, description, id }) => (
          <Information styles={style["table-outer"]}>
            <h3>{name}</h3>
            <h5>{description}</h5>
            <Button text={"Sign up now"} handleClick={() => handleSignUp(id)} />
          </Information>
        ))}
      </div>
    </section>
  );
};

export default Home;
