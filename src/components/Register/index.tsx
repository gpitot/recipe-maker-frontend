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
  userEvents: Array<IUserEvent>;
  setUserEvents: (userEvents: Array<IUserEvent>) => void;
}

const Register = ({
  registerCTA,
  eventId,
  isFull,
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
            },
          ]);
          console.log([...userEvents]);
        } else {
          showFlag({
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
