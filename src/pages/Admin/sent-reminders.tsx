import React, { useEffect, useState } from "react";
import UserRow from "components/UserRow";
import List from "components/List";
import style from "./style.module.scss";

import API from "rest/api";
import { IRemindersSent } from "rest/notifications";
import EventDate from "components/EventDate";

const SentReminders = () => {
  const [reminders, setReminders] = useState<Array<IRemindersSent>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.notifications
      .getRemindersSent()
      .then(({ success, result }) => {
        if (success) {
          setReminders(result);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  const body = reminders.map((reminder) => {
    return [
      <UserRow
        id={reminder.user_id}
        name={`${reminder.firstname} ${reminder.lastname}`}
      />,
      <EventDate time={reminder.notification_date} />,
      <div className={style.message}>{reminder.message}</div>,
    ];
  });

  return (
    <List
      title="Reminders sent"
      headers={["User", "Date", "Message"]}
      body={body}
    />
  );
};

export default SentReminders;
