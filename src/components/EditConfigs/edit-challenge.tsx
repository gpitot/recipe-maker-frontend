import React, { useState } from "react";
import API from "rest/api";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";

import Button from "components/Button";
import { IMatches } from "rest/ladder";

interface IProps extends IMatches {
  setOpen: (open: boolean) => void;
}

const EditChallenge = ({ setOpen, id, accepted }: IProps) => {
  const [time, setTime] = useState("");
  const { showFlag } = useFlags();

  const handleUpdateChallengeTime = () => {
    API.ladder.challengeTime({ match_id: id, time }).then((res) => {
      if (res.success) {
        showFlag({
          title: "Updated challenge date",
          icon: <SuccessIcon label="success" secondaryColor={G400} />,
          appearance: "success",
        });
      } else {
        showFlag({
          title: "Updated challenge date",
          icon: <ErrorIcon label="error" secondaryColor={R400} />,

          appearance: "error",
        });
      }
    });
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  if (accepted !== true) return <p>match must first be accepted</p>;
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
        />
      </li>
    </>
  );
};

export default EditChallenge;
