import Information from "components/Information";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Button, TextField } from "@material-ui/core";
import API from "rest/api";
import { toast } from "react-toastify";

interface IProps {
  registerCTA: string;
  eventId: number;
  updateList: (name: string) => void;
  eventName: string;
  isFull: boolean;
}

const Register = ({
  registerCTA,
  eventId,
  updateList,
  eventName,
  isFull,
}: IProps) => {
  const DEFAULT_STATE = {
    firstname: "",
    lastname: "",
    event_id: eventId,
  };
  const [formData, setFormData] = useState(DEFAULT_STATE);
  const [open, setOpen] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    API.userEvents.addUserEvent(formData).then(({ success, err }) => {
      if (success === true) {
        updateList(formData.firstname);
        toast.success("Registered succesfully");
      } else {
        setError(err as string);
        toast.success("Could not register");
      }
      setOpen(false);
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
