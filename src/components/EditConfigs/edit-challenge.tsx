import React, { useState } from "react";
import API from "rest/api";
import { toast } from "react-toastify";
import Button from "components/Button";
import { IMatches } from "rest/ladder";

interface IProps extends IMatches {
  setOpen: (open: boolean) => void;
}

const EditChallenge = ({ setOpen, id, match_date, accepted }: IProps) => {
  const [time, setTime] = useState("");

  const handleUpdateChallengeTime = () => {
    API.ladder.challengeTime({ match_id: id, time }).then((res) => {
      if (res.success) {
        toast.success("Updated challenge date");
      } else {
        toast.error("Could not update challenge date");
      }
    });
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const isDisabled = !(match_date === null && accepted === true);

  return (
    <>
      <li>
        <input
          type="text"
          placeholder="epoch time"
          value={time}
          onChange={handleChange}
        ></input>
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
