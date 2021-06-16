import React, { useEffect, useState } from "react";
import UserRow from "components/UserRow";
import List from "components/List";

import API from "rest/api";
import { ReminderType } from "rest/notifications";
import { IMatches } from "rest/ladder";
import Information from "components/Information";
import Button from "components/Button";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";
import style from "./style.module.scss";

const ResultRow = ({
  player_1,
  player_1_firstname,
  player_1_photo,
  player_2,
  player_2_firstname,
  player_2_photo,
}: IMatches) => {
  const { showFlag } = useFlags();

  const handleSubmit = () => {
    API.notifications
      .remindPlayers({
        player_1,
        player_2,
        reminderType: ReminderType["pending-matches"],
      })
      .then((res) => {
        if (res.success) {
          showFlag({
            isAutoDismiss: true,
            title: "Reminder sent",
            icon: <SuccessIcon label="success" secondaryColor={G400} />,
            appearance: "success",
          });
          return;
        }
        throw Error;
      })
      .catch(() => {
        showFlag({
          isAutoDismiss: true,
          title: "Could not send reminders",
          icon: <ErrorIcon label="error" secondaryColor={R400} />,
          appearance: "error",
        });
      });
  };

  return (
    <>
      <td>
        <UserRow
          id={player_1}
          name={player_1_firstname}
          photo={player_1_photo}
        />
      </td>
      <td>
        <UserRow
          id={player_2}
          name={player_2_firstname}
          photo={player_2_photo}
        />
      </td>

      <td>
        <Button text="Remind" handleClick={handleSubmit} />
      </td>
    </>
  );
};

const PendingAccepted = () => {
  const [matches, setMatches] = useState<Array<IMatches>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.ladder
      .adminGetPendingAccepted()
      .then(({ success, result }) => {
        if (success) {
          setMatches(result);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  if (matches.length === 0)
    return (
      <Information styles={style.gap}>
        <h3>There are no pending matches.</h3>
      </Information>
    );

  const body = matches.map((match) => [<ResultRow {...match} />]);

  return (
    <List
      title="Pending matches"
      headers={["Challenger", "Opponent", ""]}
      body={body}
      columnsInBuilt
    />
  );
};

export default PendingAccepted;
