import React, { useEffect, useState } from "react";
import socialStyle from "./style.module.scss";

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
    <div className={socialStyle.events}>
      {events.map((event) => (
        <BoxLink {...event} key={event.id} link={"/event"} />
      ))}
    </div>
  );
};

export default Social;
