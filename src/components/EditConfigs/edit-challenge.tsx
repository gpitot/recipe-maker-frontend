import React from "react";
import API from "rest/api";
import { toast } from "react-toastify";
import { IUserEvent } from "rest/user_events";
import Button from "components/Button";
import { IMatches } from "rest/ladder";

interface IProps extends IMatches {
  setOpen: (open: boolean) => void;
}

const EditChallenge = ({ setOpen, id, match_date, accepted }: IProps) => {
  const handleUpdateChallengeTime = () => {
    API.ladder
      .challengeTime({ match_id: id, time: "2021-03-05 19:00:00" })
      .then((res) => {
        if (res.success) {
          toast.success("Updated challenge date");
        } else {
          toast.error("Could not update challenge date");
        }
      });
    setOpen(false);
  };
  const isDisabled = !(match_date === null && accepted === true);

  return (
    <>
      <li>
        <Button
          handleClick={handleUpdateChallengeTime}
          text="Add booking time"
          disabled={isDisabled}
        />
      </li>
    </>
  );
};

export default EditChallenge;
