import React, { useContext } from "react";
import AwaitingResultsNotification from "./awaiting-results-notification";
import { UserContext } from "contexts/UserContext";

const Notifications = () => {
  const { user, loading } = useContext(UserContext);
  if (loading) return null;
  if (!user.id) return null;
  return <AwaitingResultsNotification />;
};

export default Notifications;
