import React from "react";
import AdminControl from "components/AdminControl";
import { Link } from "react-router-dom";

const AdminNav = () => <Link to="/admin">Admin</Link>;
export default AdminControl(AdminNav);
