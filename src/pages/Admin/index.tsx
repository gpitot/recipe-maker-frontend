import Approvals from "pages/Admin/approvals";
import React from "react";
import AdminControl from "components/AdminControl";
import GeneratePasswordReset from "pages/Admin/generate-password-reset";
import PendingResults from "pages/Admin/pendingresults";
import PendingAccepted from "pages/Admin/pendingaccepted";
import PendingPlaying from "pages/Admin/pendingplaying";
import SentReminders from "pages/Admin/sent-reminders";

const Admin = () => {
  return (
    <>
      <Approvals />
      <PendingAccepted />
      <PendingPlaying />
      <PendingResults />
      <SentReminders />
      <GeneratePasswordReset />
    </>
  );
};

export default AdminControl(Admin);
