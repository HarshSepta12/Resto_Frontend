import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="admin-content-wrapper">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
