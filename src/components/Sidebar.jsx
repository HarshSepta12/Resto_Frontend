// Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      <div className={styles.hamburger} onClick={toggleSidebar}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <nav className={`${styles.nav}`}>
          <Link to="/" onClick={toggleSidebar} className={`navlink ${location.pathname === "/" ? styles.active : styles.notActive}`}>
            Home
          </Link>
          <Link to="/menuitem" onClick={toggleSidebar} className={location.pathname === "/menuitem" ? styles.active : styles.notActive}>
            Menu Item
          </Link>
          <Link to="/menuform" onClick={toggleSidebar} className={location.pathname === "/menuform" ? styles.active : styles.notActive}>
            Menu Form
          </Link>
          <Link to="/users" onClick={toggleSidebar} className={location.pathname === "/users" ? styles.active : styles.notActive}>
            Users
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
