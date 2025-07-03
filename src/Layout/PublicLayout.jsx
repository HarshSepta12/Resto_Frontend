import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";
import Footer from "../components/pages/Footer";
import styles from "./PublicLayout.module.css"; // 👈 import CSS module

const PublicLayout = () => {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNavbar = () => {
    setNavVisible(!navVisible);
  };

  return (
    <>
      <nav className={styles.navbarContainer}>
        <div className={styles.navbarInner}>
          <h1 className={styles.navLogo}>
            <Link to="/" onClick={() => setNavVisible(false)}>
              <IoRestaurant /> Shree Aai ji
            </Link>
          </h1>

          <div className={styles.hamburger} onClick={toggleNavbar}>
            <img src="/img/Hemburg.png" alt="menu" />
          </div>
        </div>

        <ul className={`${styles.navLinks} ${navVisible ? styles.show : ""}`}>
          <li><Link to="/" onClick={() => setNavVisible(false)}>HOME</Link></li>
          <li><Link to="/about" onClick={() => setNavVisible(false)}>ABOUT</Link></li>
          <li><Link to="/login" onClick={() => setNavVisible(false)}>LOGIN</Link></li>
          <li><Link to="/register" onClick={() => setNavVisible(false)}>REGISTER</Link></li>
          <li><Link to="/menu" onClick={() => setNavVisible(false)}>MENU</Link></li>
          <li><Link to="/contact" onClick={() => setNavVisible(false)}>CONTACT</Link></li>
          <li><button className={styles.bookBtn}>BOOK TABLE</button></li>
        </ul>
      </nav>

      <div className="content-wrapper">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default PublicLayout;
