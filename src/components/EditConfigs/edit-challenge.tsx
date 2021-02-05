import React from "react";
import API from "rest/api";
import { toast } from "react-toastify";
import { IUserEvent } from "rest/user_events";
import Button from "components/Button";
import { IMatches } from "rest/ladder";

interface IProps {
  setOpen: (open: boolean) => void;
  match_id: number;
  match_date: string | null;
}

const EditChallenge = ({ setOpen, match_id, match_date }: IProps) => {
  const handleUpdateChallengeTime = () => {
    API.ladder
      .challengeTime({ match_id, time: "2021-03-05 19:00:00" })
      .then((res) => {
        if (res.success) {
          toast.success("Updated challenge date");
        } else {
          toast.error("Could not update challenge date");
        }
      });
    setOpen(false);
  };
  return (
    <>
      {match_date && (
        <li>
          <Button
            handleClick={handleUpdateChallengeTime}
            text="Add booking time"
          />
        </li>
      )}
    </>
  );
};

export default EditChallenge;
