import List from "components/List";
import Register from "components/Register";
import React, { useContext, useState } from "react";
import { IEvent } from "rest/events";
import { IUserEvent } from "rest/user_events";
import { timeIsAfter } from "utils/compareTime";
import style from "./style.module.scss";
import { UserContext } from "contexts/UserContext";
import API from "rest/api";
import UserRow from "components/UserRow";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";
import Edit from "components/Edit";
import EditSocial from "components/EditConfigs/edit-social";
import Paid from "components/Paid";

import { ReactComponent as Close } from "icons/times-circle-solid.svg";
import ManualRegistration from "components/ManualRegistration";
import Streak from "components/Streak";
import VaccineStatus from "components/VaccineStatus";

interface IProps {
  event: IEvent;
  userEvents?: Array<IUserEvent>;
  setUserEvents: (userEvents: Array<IUserEvent>) => void;
}

const SignupSheet = ({ event, userEvents, setUserEvents }: IProps) => {
  const { showFlag } = useFlags();

  const { user } = useContext(UserContext);

  const [loadingRemove, setLoadingRemove] = useState(false);

  const { enabled, open, start, spots } = event;
  if (userEvents === undefined || enabled === false) return null;

  let registeredUsers = 0;
  let alreadyRegistered = false;
  for (let i = 0; i < userEvents.length; i += 1) {
    const { enabled, user_id } = userEvents[i];
    if (enabled) {
      registeredUsers += 1;
    }

    if (enabled && user.id === user_id) {
      alreadyRegistered = true;
    }
  }
  const isFull = spots <= registeredUsers;

  const isOpen = !timeIsAfter(open);
  const hasNotStarted = timeIsAfter(start);

  const removeEntry = ({ id }: IUserEvent) => {
    setLoadingRemove(true);
    API.userEvents
      .deleteUserEvent({ id })
      .then((res) => {
        if (res.success) {
          showFlag({
            isAutoDismiss: true,
            title: "Successfuly removed yourself from this event",
            icon: <SuccessIcon label="success" secondaryColor={G400} />,
            appearance: "success",
          });
          const newEvents = [...userEvents].filter((event) => event.id !== id);
          setUserEvents(newEvents);
        } else {
          throw Error();
        }
      })
      .catch(() => {
        showFlag({
          isAutoDismiss: true,
          title: "Could not remove yourself from this event",
          icon: <ErrorIcon label="error" secondaryColor={R400} />,

          appearance: "error",
        });
      })
      .finally(() => {
        setLoadingRemove(false);
      });
  };

  let nameList = userEvents.map((event) => [
    <div className={style.row}>
      <Streak streak={event.streak} />
      <UserRow
        id={event.user_id}
        name={`${event.firstname}`}
        photo={event.photo}
      />
      <VaccineStatus vaccinated={event.vaccinated} />
      {user.id === event.user_id && !loadingRemove && (
        <Close onClick={() => removeEntry(event)} className={style.remove} />
      )}
      <Edit>
        {(setOpen) => (
          <EditSocial
            setOpen={setOpen}
            event={event}
            userEvents={userEvents}
            setUserEvents={setUserEvents}
          />
        )}
      </Edit>
      <Paid paid={event.paid} />
    </div>,
  ]);

  if (nameList.length === 0) {
    nameList.push([<div className={style.row}>No registrations yet.</div>]);
  }

  return (
    <div className={style.signup}>
      <Register
        registerCTA={"Sign up for this event"}
        eventId={event.id}
        isFull={isFull}
        isOpen={isOpen}
        alreadyRegistered={alreadyRegistered}
        hasNotStarted={hasNotStarted}
        userEvents={userEvents}
        setUserEvents={setUserEvents}
      />

      <List headers={[event.name]} body={nameList} />

      <ManualRegistration event_id={event.id} />
    </div>
  );
};

export default React.memo(SignupSheet);
