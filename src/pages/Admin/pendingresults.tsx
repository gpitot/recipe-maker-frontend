import React, { useEffect, useState } from "react";
import UserRow from "components/UserRow";
import EventDate from "components/EventDate";
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

const ResultRow = ({
  player_1,
  player_1_firstname,
  player_1_photo,
  player_2,
  player_2_firstname,
  player_2_photo,
  match_date,
}: IMatches) => {
  const { showFlag } = useFlags();

  const handleSubmit = () => {
    API.notifications
      .remindPlayers({
        player_1,
        player_2,
        reminderType: ReminderType["pending-result"],
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
        <EventDate time={match_date} />
      </td>
      <td>
        <Button text="Remind" handleClick={handleSubmit} />
      </td>
    </>
  );
};

const PendingResults = () => {
  const [matches, setMatches] = useState<Array<IMatches>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.ladder
      .adminGetPendingResults()
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
      <Information>
        <h3>There are no pending results.</h3>
      </Information>
    );

  const body = matches.map((match) => [<ResultRow {...match} />]);

  return (
    <List
      title="Pending results"
      headers={["Challenger", "Opponent", "Date", ""]}
      body={body}
      columnsInBuilt
    />
  );
};

export default PendingResults;
