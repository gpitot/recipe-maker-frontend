import React, { useEffect, useState } from "react";
import { IUserEventHistory } from "rest/user_events";
import API from "rest/api";
import List from "components/List";
import { Link } from "react-router-dom";
import EventDate from "components/EventDate";

const SocialHistory = ({ user_id }: { user_id: number }) => {
  const [events, setEvents] = useState<IUserEventHistory[]>([]);

  useEffect(() => {
    API.userEvents.getUserHistory(user_id).then((res) => {
      if (res.success) {
        setEvents(res.result);
      }
    });
  }, [user_id]);

  if (events.length === 0) return null;

  const body = events.map(({ id, name, start }) => [
    <Link to={`/event/${id}`}>{name}</Link>,
    <EventDate time={start} />,
  ]);

  return <List title="Past events" headers={["Event", "Date"]} body={body} />;
};

export default SocialHistory;
