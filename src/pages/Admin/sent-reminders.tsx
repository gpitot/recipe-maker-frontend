import React, { useEffect, useState } from "react";
import UserRow from "components/UserRow";
import List from "components/List";
import style from "./style.module.scss";

import API from "rest/api";
import { IRemindersSent } from "rest/notifications";
import EventDate from "components/EventDate";
import UserSearch from "components/UserSearch";
import { ISearchUser } from "rest/users";
import Information from "components/Information";

const SentReminders = () => {
  const [reminders, setReminders] = useState<Array<IRemindersSent>>([]);
  const [user, setUser] = useState<ISearchUser>();
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

  const filterReminders = (user: ISearchUser) => {
    setUser(user);
  };

  const handleClear = () => {
    setUser(undefined);
  };

  if (loading) return null;

  const currentReminders = user
    ? reminders.filter(({ user_id }) => user_id === user.id)
    : reminders;

  const body = currentReminders.map(
    ({ user_id, firstname, lastname, notification_date, message }) => {
      return [
        <UserRow id={user_id} name={`${firstname} ${lastname}`} />,
        <EventDate time={notification_date} />,
        <div className={style.message}>{message}</div>,
      ];
    }
  );

  return (
    <Information styles={style.gap}>
      <div className={style.remindersTable}>
        <UserSearch onSelect={filterReminders} onClear={handleClear} />
        <List
          title="Reminders sent"
          headers={["User", "Date", "Message"]}
          body={body}
        />
      </div>
    </Information>
  );
};

export default SentReminders;
