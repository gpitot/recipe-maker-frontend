import React, { useState } from "react";
import API from "rest/api";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";

import Button from "components/Button";
import Input from "components/Input";
import { IMatches } from "rest/ladder";

interface IProps extends IMatches {
  setOpen: (open: boolean) => void;
}

const EditChallenge = ({
  setOpen,
  id,
  accepted,
  declined,
  player_1_games,
  player_2_games,
  match_date,
}: IProps) => {
  const [match, setMatch] = useState({
    match_id: id,
    accepted,
    player_1_games,
    player_2_games,
    match_date,
    declined,
  });
  const { showFlag } = useFlags();

  const handleUpdate = () => {
    API.ladder.challengeAdminEdit(match).then((res) => {
      if (res.success) {
        showFlag({
          isAutoDismiss: true,
          title: "Updated challenge",
          icon: <SuccessIcon label="success" secondaryColor={G400} />,
          appearance: "success",
        });
      } else {
        showFlag({
          isAutoDismiss: true,
          title: "Could not update challenge",
          icon: <ErrorIcon label="error" secondaryColor={R400} />,

          appearance: "error",
        });
      }
    });
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setMatch({
      ...match,
      [e.target.name]: value,
    });
  };

  const matchInPast =
    match.match_date && parseInt(match.match_date) < Date.now();

  return (
    <>
      <li>
        <Input
          type="checkbox"
          label="Accepted"
          checked={match.accepted}
          name="accepted"
          handleChange={handleChange}
        />
        <Input
          type="checkbox"
          label="Declined"
          checked={match.declined}
          name="declined"
          handleChange={handleChange}
        />
        {match.accepted && (
          <Input
            type="text"
            label="Match date"
            value={match.match_date || ""}
            name="match_date"
            handleChange={handleChange}
          />
        )}
        {match.accepted && matchInPast && (
          <>
            <Input
              type="number"
              label="Player 1 games"
              value={match.player_1_games || ""}
              name="player_1_games"
              handleChange={handleChange}
            />
            <Input
              type="number"
              label="Player 2 games"
              value={match.player_2_games || ""}
              name="player_2_games"
              handleChange={handleChange}
            />
          </>
        )}
        <Button handleClick={handleUpdate} text="Update match details" />
      </li>
    </>
  );
};

export default EditChallenge;
