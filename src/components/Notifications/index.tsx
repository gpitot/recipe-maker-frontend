import React, { useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router";
import AwaitingResultsNotification from "./awaiting-results-notification";
import { UserContext } from "contexts/UserContext";
import API from "rest/api";
import { INotification } from "rest/notifications";
import { useFlags } from "@atlaskit/flag";
import InfoIcon from "@atlaskit/icon/glyph/info";

const Notifications = () => {
  const { user, loading } = useContext(UserContext);
  const { showFlag } = useFlags();
  const history = useHistory();

  const acknowledgeFlag = (id: number) => {
    API.notifications.acknowledgeNotification(id).then((res) => {
      console.log(res);
    });
  };

  const handleAction = useCallback(
    (id: number, link: string) => {
      acknowledgeFlag(id);
      history.push(link);
    },
    [history]
  );

  const showFlags = useCallback(
    (notifications: Array<INotification>) => {
      notifications.forEach(
        ({
          id,
          title,
          description,
          action_positive_text,
          action_positive_link,
          action_negative_text,
          action_negative_link,
        }) => {
          const actions = [];

          if (action_negative_text) {
            actions.push({
              content: action_negative_text,
              onClick: () => handleAction(id, action_negative_link),
            });
          }

          if (action_positive_text) {
            actions.push({
              content: action_positive_text,
              onClick: () => handleAction(id, action_positive_link),
            });
          }

          showFlag({
            title,
            icon: <InfoIcon label="info" />,
            description,
            actions,
            onDismissed: () => acknowledgeFlag(id),
            isAutoDismiss: true,
          });
        }
      );
    },
    [showFlag, handleAction]
  );

  useEffect(() => {
    if (loading) return;
    if (!user.id) return;

    API.notifications.getNotifications().then((res) => {
      if (res.success) {
        showFlags(res.result);
      }
    });
  }, [user, loading, showFlags]);

  if (loading) return null;
  if (!user.id) return null;

  return <AwaitingResultsNotification />;
};

export default Notifications;
