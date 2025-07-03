import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { IoRestaurant } from "react-icons/io5";
import MenuForm from "./MenuForm";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./pages/Footer";
import styles from "./AdminNavbar.module.css";

const AdminNavbar = () => {
  const [navVisible, setNavVisible] = useState(false);
  const location = useLocation(); // to render component based on current path

  const toggleNavbar = () => {
    setNavVisible(!navVisible);
  };

  const renderContent = () => {
    switch (location.pathname) {
      case "/adminNavbar":
        return <MenuForm />;
      case "/dashboard":
        return <AdminDashboard />;
      default:
        return <MenuForm />; // fallback
    }
  };

  return (
    <div className={styles.appContainer}>
      <ToastContainer />
      <nav className={styles.navbar}>
        <div className={styles.headerTop}>
          <h1 className={styles.navHeading}>
            <Link to="/" onClick={() => setNavVisible(false)} className={styles.link}>
              <IoRestaurant className={styles.icon} /> Shree Aai ji
            </Link>
          </h1>
          <div className={styles.hemParent}>
            <img
              src="/img/Hemburg.png"
              alt="hamburger"
              className={styles.hamburger}
              onClick={toggleNavbar}
            />
          </div>
        </div>

        <ul className={`${styles.navLinks} ${navVisible ? styles.show : ""}`}>
          <li>
            <Link to="/adminNavbar" onClick={() => setNavVisible(false)}>MENU FORM</Link>
          </li>
          <li>
            <Link to="/dashboard" onClick={() => setNavVisible(false)}>DASHBOARD</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.contentWrapper}>
        {renderContent()}
      </div>

      <Footer />
    </div>
  );
};

export default AdminNavbar;
