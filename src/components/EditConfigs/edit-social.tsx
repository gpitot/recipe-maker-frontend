import React from "react";
import API from "rest/api";
import { toast } from "react-toastify";
import { IUserEvent } from "rest/user_events";
import Button from "components/Button";

interface IProps {
  setOpen: (open: boolean) => void;
  event: IUserEvent;
  setUserEvents: (userEvents: Array<IUserEvent>) => void;
  userEvents: Array<IUserEvent>;
}

const EditSocial = ({ setOpen, event, userEvents, setUserEvents }: IProps) => {
  const handleRemove = () => {
    API.userEvents
      .editUserEvent({
        ...event,
        enabled: false,
      })
      .then((res) => {
        if (res.success) {
          toast.success("Removed user");
          const newEvents = [...userEvents].filter(
            (evt) => evt.id !== event.id
          );
          setUserEvents(newEvents);
        } else {
          toast.error("Could not remove user");
        }
      });
    setOpen(false);
  };

  const handlePaid = () => {
    API.userEvents
      .editUserEvent({
        ...event,
        paid: !event.paid,
      })
      .then((res) => {
        if (res.success) {
          toast.success(`Paid status is now : ${!event.paid}`);
          const newEvents = [...userEvents];
          for (let i = 0; i < newEvents.length; i += 1) {
            if (newEvents[i].id === event.id) {
              newEvents[i].paid = !newEvents[i].paid;
              break;
            }
          }
          setUserEvents(newEvents);
        } else {
          toast.error("Could not update paid status");
        }
      });
    setOpen(false);
  };

  return (
    <>
      <li>
        <Button handleClick={handleRemove} text="Remove" />
      </li>
      <li>
        <Button handleClick={handlePaid} text="Toggle paid state" />
      </li>
    </>
  );
};

export default EditSocial;
