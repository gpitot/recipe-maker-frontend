import React from "react";
import API from "rest/api";
import { IUserEvent } from "rest/user_events";
import Button from "components/Button";

import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";

interface IProps {
  setOpen: (open: boolean) => void;
  event: IUserEvent;
  setUserEvents: (userEvents: Array<IUserEvent>) => void;
  userEvents: Array<IUserEvent>;
}

const EditSocial = ({ setOpen, event, userEvents, setUserEvents }: IProps) => {
  const { showFlag } = useFlags();

  const handleRemove = () => {
    API.userEvents
      .editUserEvent({
        ...event,
        enabled: false,
      })
      .then((res) => {
        if (res.success) {
          showFlag({
            isAutoDismiss: true,
            title: "Removed user",
            icon: <SuccessIcon label="success" secondaryColor={G400} />,
            appearance: "success",
          });
          const newEvents = [...userEvents].filter(
            (evt) => evt.id !== event.id
          );
          setUserEvents(newEvents);
        } else {
          showFlag({
            isAutoDismiss: true,
            title: "Could not remove user",
            icon: <ErrorIcon label="error" secondaryColor={R400} />,

            appearance: "error",
          });
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
          showFlag({
            isAutoDismiss: true,
            title: `Paid status is now : ${!event.paid}`,
            icon: <SuccessIcon label="success" secondaryColor={G400} />,
            appearance: "success",
          });
          const newEvents = [...userEvents];
          for (let i = 0; i < newEvents.length; i += 1) {
            if (newEvents[i].id === event.id) {
              newEvents[i].paid = !newEvents[i].paid;
              break;
            }
          }
          setUserEvents(newEvents);
        } else {
          showFlag({
            isAutoDismiss: true,
            title: "Could not update paid status",
            icon: <ErrorIcon label="error" secondaryColor={R400} />,

            appearance: "error",
          });
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
