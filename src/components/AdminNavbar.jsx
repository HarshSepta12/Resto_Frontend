import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { IoRestaurant } from "react-icons/io5";
import MenuForm from "./MenuForm";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./pages/Footer";

import styles from "./AdminNavbar.module.css";

const AdminNavbar = () => {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNavbar = () => {
    setNavVisible(!navVisible);
  };

  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
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
              <Link to="/menuform" onClick={() => setNavVisible(false)}>MENU FORM</Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={() => setNavVisible(false)}>DASHBOARD</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<MenuForm />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default AdminNavbar;
