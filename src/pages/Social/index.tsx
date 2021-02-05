import React, { useEffect, useState } from "react";
import style from "styles/pages.module.scss";
import socialStyle from "./style.module.scss";

import Event from "components/Event";
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
    <section className={style.area}>
      <section className={style.child}>
        <div className={socialStyle.events}>
          {events.map((event) => (
            <Event {...event} key={event.id} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Social;
