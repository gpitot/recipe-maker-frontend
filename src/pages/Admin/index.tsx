import Approvals from "pages/Admin/approvals";
import React from "react";
import AdminControl from "components/AdminControl";
import GeneratePasswordReset from "pages/Admin/generate-password-reset";

const Admin = () => {
  return (
    <>
      <Approvals />
      <GeneratePasswordReset />
    </>
  );
};

export default AdminControl(Admin);
