import CTAMenu from "components/CTAMenu";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import Event from "components/Event";
import API from "rest/api";
import { IEvent } from "rest/events";

const Social = () => {
  const [events, setEvents] = useState<Array<IEvent>>([]);

  useEffect(() => {
    API.events.getEvents().then(({ success, result }) => {
      setEvents(result);
    });
  }, []);

  return (
    <section className={style.area}>
      <CTAMenu>
        <h2>PLAY AT MANLY</h2>
        <Link to="/social" className={style.active}>
          PLAY SOCIALLY
        </Link>
        <Link to="/competition">COMPETE AGAINST OTHERS</Link>
        <Link to="/coaching">IMPROVE YOUR PLAY</Link>
        <Link to="/shop">SHOP</Link>
      </CTAMenu>

      <section className={style.eventList}>
        {events.map((event) => (
          <Event {...event} key={event.id} />
        ))}
      </section>
    </section>
  );
};

export default Social;
