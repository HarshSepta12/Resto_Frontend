import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Footer from "./components/pages/Footer";
import About from "./components/pages/About";
import Menu from "./components/pages/Menu";
import AdminPage from "./components/pages/AdminPage";
import { useState } from "react";

const App = () => {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNavbar = () => {
    setNavVisible(!navVisible);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <BrowserRouter>
          <nav className="blue-bg">
            <div className="header-top">
              <h1 className="nav-heading">
                <IoRestaurant /> Shree Aai ji
              </h1>
              <div className="hem-parent">
                <img
                  src="/img/Hemburg.png"
                  alt="hamburg"
                  className="hemburge"
                  onClick={toggleNavbar}
                />
              </div>
            </div>

            <ul className={`nav-links ${navVisible ? "show" : ""}`}>
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
              <li>
                <Link to="/adminlogin" onClick={() => setNavVisible(false)}>
                 ADD ITEM
                </Link>
              </li>
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
                <button className="book-btn">BOOK TABLE</button>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/adminlogin" element={<AdminPage />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
