// AdminLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        style={{
          marginLeft: isOpen ? "230px" : "0px",
          transition: "margin-left 0.3s ease",
          padding: "1rem",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
