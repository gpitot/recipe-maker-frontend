import List from "components/List";
import Register from "components/Register";
import React, { useState } from "react";
import { IEvent } from "rest/events";
import { IUserEvent } from "rest/user_events";
import { timeIsAfter } from "utils/compareTime";
import style from "./style.module.scss";

interface IProps {
  event: IEvent;
  userEvents?: Array<IUserEvent>;
}

const SignupSheet = ({ event, userEvents }: IProps) => {
  const [newSignUp, setNewSignUp] = useState<string | null>(null);

  const { enabled, open, start, spots } = event;
  if (userEvents === undefined || enabled === false) return null;

  let registeredUsers = 0;
  for (let i = 0; i < userEvents.length; i += 1) {
    const { enabled } = userEvents[i];
    if (enabled) {
      registeredUsers += 1;
    }
  }
  const isFull = spots <= registeredUsers;

  const isOpen = !timeIsAfter(new Date(open));
  const hasStarted = timeIsAfter(new Date(start));

  const nameList = userEvents.map((event) => [event.firstname]);

  if (newSignUp) {
    nameList.push([newSignUp]);
  }

  return (
    <div className={style.signup}>
      {isOpen && hasStarted && (
        <Register
          registerCTA={"Sign up for this event"}
          eventId={event.id}
          updateList={setNewSignUp}
          eventName={event.name}
          isFull={isFull}
        />
      )}

      <List headers={[event.name]} body={nameList} />
    </div>
  );
};

export default React.memo(SignupSheet);
