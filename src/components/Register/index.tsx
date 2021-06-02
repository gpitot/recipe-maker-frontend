import Information from "components/Information";
import React, { useContext } from "react";
import style from "./style.module.scss";
import { Button } from "@material-ui/core";
import API from "rest/api";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";
import { IUserEvent } from "rest/user_events";
import { UserContext } from "contexts/UserContext";

interface IProps {
  registerCTA: string;
  eventId: number;
  isFull: boolean;
  isOpen: boolean;
  hasNotStarted: boolean;
  alreadyRegistered: boolean;
  userEvents: Array<IUserEvent>;
  setUserEvents: (userEvents: Array<IUserEvent>) => void;
}

const Register = ({
  registerCTA,
  eventId,
  isFull,
  isOpen,
  alreadyRegistered,
  hasNotStarted,
  userEvents,
  setUserEvents,
}: IProps) => {
  const { user } = useContext(UserContext);
  const { showFlag } = useFlags();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    API.userEvents
      .addUserEvent({ event_id: eventId })
      .then(({ result, success, err }) => {
        if (success === true) {
          showFlag({
            isAutoDismiss: true,
            title: "Registered succesfully",
            icon: <SuccessIcon label="success" secondaryColor={G400} />,
            appearance: "success",
          });
          setUserEvents([
            ...userEvents,
            {
              ...result,
              firstname: user.firstname,
              lastname: user.lastname,
              photo: user.photo,
              streak: user.streak,
            },
          ]);
          console.log([...userEvents]);
        } else {
          showFlag({
            isAutoDismiss: true,
            title: err,
            icon: <ErrorIcon label="error" secondaryColor={R400} />,

            appearance: "error",
          });
        }
      });
  };

  if (isFull) {
    return <Information>This event is full</Information>;
  }

  if (!isOpen) {
    return <Information>This event is not yet open</Information>;
  }

  if (!hasNotStarted) {
    return <Information>This event has already started</Information>;
  }

  if (alreadyRegistered) {
    return null;
  }

  return (
    <form className={style.register} onSubmit={handleSubmit}>
      <Information>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={style.button}
        >
          {registerCTA}
        </Button>
      </Information>
    </form>
  );
};

export default Register;
