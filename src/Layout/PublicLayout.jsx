import React, { useContext, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";
import Footer from "../components/pages/Footer";
import styles from "./PublicLayout.module.css";
import { RiMenuFold3Fill } from "react-icons/ri";
import RestoContext from "../components/Context/RestoContaxt";

const PublicLayout = () => {
  const [navVisible, setNavVisible] = useState(false);
  const { haveToken, setHaveToken, admin, setAdmin } = useContext(RestoContext);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setNavVisible(!navVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHaveToken(false);
    setNavVisible(false);
    setAdmin(false);
    window.location.href = "/";
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
            <RiMenuFold3Fill style={{ width: "60px", height: "60px" }} />
          </div>
        </div>

        <ul className={`${styles.navLinks} ${navVisible ? styles.show : ""}`}>
          <li>
            <Link to="/" onClick={() => setNavVisible(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setNavVisible(false)}>
              ABOUT
            </Link>
          </li>

          {haveToken ? (
            <>
              {admin && (
                <li>
                  <Link to="/dashboard" onClick={() => setNavVisible(false)}>
                    ADMIN PANEL
                  </Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  LOGOUT
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setNavVisible(false)}>
                  LOGIN
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setNavVisible(false)}>
                  REGISTER
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/menu" onClick={() => setNavVisible(false)}>
              MENU
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setNavVisible(false)}>
              CONTACT
            </Link>
          </li>
          <li>
            <button
              className={styles.bookBtn}
              onClick={() => navigate("/booktable")}
            >
              BOOK TABLE
            </button>
          </li>
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
