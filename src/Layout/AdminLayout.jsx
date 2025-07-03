import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/pages/Footer";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="admin-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
