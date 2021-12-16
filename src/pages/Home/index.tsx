import React, { useEffect, useState } from "react";

import List from "components/List";
import UserRow from "components/UserRow";
import EventDate from "components/EventDate";

import API from "rest/api";
import { IMatches } from "rest/ladder";
import BoxLink from "components/BoxLink";
import Information from "components/Information";
import LadderLeagueAd from "components/Ads/ladder-league-3";

import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { useEventsStore } from "../../store/events";

const Home = () => {
  const [upcomingMatches, setUpcomingMatches] = useState<Array<IMatches>>([]);
  const [{ events }, actions] = useEventsStore();

  useEffect(() => {
    API.ladder.getUpcoming().then(({ result, success }) => {
      if (success) {
        setUpcomingMatches(result);
      }
    });

    actions.initialLoad();
  }, [actions]);

  const upcomingList = upcomingMatches.map((match) => {
    const {
      player_1,
      player_2,
      player_1_firstname,
      player_1_photo,
      player_2_firstname,
      player_2_photo,
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
      <EventDate time={match_date} />,
    ];
  });

  return (
    <>
      <LadderLeagueAd />

      {upcomingList.length > 0 && (
        <List
          title="Upcoming matches"
          headers={["Challenger", "Opponent", "Time"]}
          body={upcomingList}
        />
      )}

      {events.map((event) => (
        <BoxLink {...event} link={"/event"} key={event.id} />
      ))}

      <Information styles={style.gap}>
        <h3>
          Browse our <Link to="/shop">shop</Link>
        </h3>
      </Information>
    </>
  );
};

export default Home;
