import Information from "components/Information";
import React, { useState, useContext } from "react";
import style from "./style.module.scss";
import { Button } from "@material-ui/core";
import API from "rest/api";
import { toast } from "react-toastify";
import { IUserEvent } from "rest/user_events";
import { UserContext } from "contexts/UserContext";

interface IProps {
  registerCTA: string;
  eventId: number;
  eventName: string;
  isFull: boolean;
  userEvents: Array<IUserEvent>;
  setUserEvents: (userEvents: Array<IUserEvent>) => void;
}

const Register = ({
  registerCTA,
  eventId,
  eventName,
  isFull,
  userEvents,
  setUserEvents,
}: IProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useContext(UserContext);
  console.log(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    API.userEvents
      .addUserEvent({ event_id: eventId })
      .then(({ result, success, err }) => {
        if (success === true) {
          toast.success("Registered succesfully");
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
          setError(err as string);
          toast.success("Could not register");
        }
        //setOpen(false);
      });
  };

  if (isFull) {
    return <Information>This event is full</Information>;
  }

  if (!open) {
    if (error) {
      return <Information>{error}</Information>;
    }
    return <Information>Thank you for signing up to {eventName}</Information>;
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
