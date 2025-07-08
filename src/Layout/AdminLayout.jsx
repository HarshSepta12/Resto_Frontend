import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: '230px', padding: '1rem' }}>
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
