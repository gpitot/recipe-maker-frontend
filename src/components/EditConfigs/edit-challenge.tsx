import React from "react";
import API from "rest/api";
import { toast } from "react-toastify";
import { IUserEvent } from "rest/user_events";
import Button from "components/Button";
import { IMatches } from "rest/ladder";

interface IProps {
  setOpen: (open: boolean) => void;
  match_id: number;
}

const EditChallenge = ({ setOpen, match_id }: IProps) => {
  const handleRemove = () => {
    API.ladder.challengeTime({ match_id, time: "" }).then((res) => {
      if (res.success) {
        toast.success("Updated challenge date");
      } else {
        toast.error("Could not update challenge date");
      }
    });
    setOpen(false);
  };

  const handleUpdateChallengeTime = () => {
    API;
    setOpen(false);
  };

  return (
    <>
      <li>
        <Button handleClick={handleRemove} text="Remove" />
      </li>
    </>
  );
};

export default EditChallenge;
