import React, { useEffect } from "react";

import BoxLink from "components/BoxLink";
import Information from "components/Information";
import { Link } from "react-router-dom";
import LadderLeagueAd2 from "components/Ads/ladder-league-3";
import { useEventsStore } from "../../store/events";

const Social = () => {
  const [{ events, loading }, actions] = useEventsStore();

  useEffect(() => {
    actions.initialLoad();
  }, [actions]);

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
