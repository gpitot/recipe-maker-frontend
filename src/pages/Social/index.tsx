import React, { useEffect, useState } from "react";

import BoxLink from "components/BoxLink";
import API from "rest/api";
import { IEvent } from "rest/events";
import Information from "components/Information";
import { Link } from "react-router-dom";
import LadderLeagueAd2 from "components/Ads/ladder-league-3";

const Social = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Array<IEvent>>([]);

  useEffect(() => {
    API.events
      .getEvents()
      .then(({ result }) => {
        setEvents(result);
      })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && events.length === 0)
    return (
      <Information>
        <h3>There are no upcoming events</h3>
        <h3>
          Challenge an opponent to a <Link to="/competition">ladder match</Link>{" "}
          instead?
        </h3>
      </Information>
    );

  return (
    <>
      <LadderLeagueAd2 />
      {events.map((event) => (
        <BoxLink {...event} key={event.id} link={"/event"} />
      ))}
    </>
  );
};

export default Social;
