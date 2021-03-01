import React, { useEffect, useState } from "react";

import BoxLink from "components/BoxLink";
import API from "rest/api";
import { IEvent } from "rest/events";

const Social = () => {
  const [events, setEvents] = useState<Array<IEvent>>([]);

  useEffect(() => {
    API.events.getEvents().then(({ result }) => {
      setEvents(result);
    });
  }, []);

  return (
    <>
      {events.map((event) => (
        <BoxLink {...event} key={event.id} link={"/event"} />
      ))}
    </>
  );
};

export default Social;
