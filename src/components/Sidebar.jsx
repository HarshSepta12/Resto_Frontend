// components/Sidebar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { IoRestaurant } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.hamburger} onClick={toggleSidebar}>
        {isOpen ? <FiX style={{marginLeft: "10rem" , color:"white"}} size={24} /> : <FiMenu size={24} />}
      </div>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <nav className={styles.nav}>
          <Link to="/" onClick={toggleSidebar} className={`${location.pathname === "/" ? styles.active : styles.notActive}`}
>
            Home
          </Link>
          <Link to="/menuitem" onClick={toggleSidebar} className={`${location.pathname === "/menuitem" ? styles.active : styles.notActive}`} 
>
            Menu Item
          </Link>
          <Link to="/menuform" onClick={toggleSidebar} className={`${location.pathname === "/menuform" ? styles.active : styles.notActive}`}
>
            Menu Form
          </Link>
          <Link to="/users" onClick={toggleSidebar} className={`${location.pathname === "/users" ? styles.active : styles.notActive}`}
>
            Users
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
