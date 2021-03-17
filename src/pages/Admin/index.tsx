import Approvals from "pages/Admin/approvals";
import React, { useEffect } from "react";
import AdminControl from "components/AdminControl";

const Admin = () => {
  return (
    <>
      <Approvals />
    </>
  );
};

export default AdminControl(Admin);
