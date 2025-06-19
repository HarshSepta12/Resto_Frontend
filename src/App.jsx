import "./App.css";
import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Footer from "./components/pages/Footer";
import About from "./components/pages/About";
import Menu from "./components/pages/Menu";
import { useState } from "react";
import AdminLogin from "./components/pages/AdminLogin";
import Register from "./components/pages/Register";
import { ToastContainer, toast } from 'react-toastify';
import AdminNavbar from './components/AdminNavbar'

const App = () => {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNavbar = () => {
    setNavVisible(!navVisible);
  };

  return (
    
    <div className="app-container">
      
        <BrowserRouter>
         <ToastContainer />
          <nav className="blue-bg">
            <div className="header-top"> 
              <h1 className="nav-heading">
                <Link to="/" onClick={() => setNavVisible(false)}>
                <IoRestaurant /> Shree Aai ji
                </Link>
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
                <Link to="/login" onClick={() => setNavVisible(false)}>
                 LOGIN
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setNavVisible(false)}>
                  REGISTER
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
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path='/register' element={<Register />} />
              <Route path="/adminNavbar" element={<AdminNavbar />}/>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
  );
};

export default App;
