import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Footer from "./components/pages/Footer";
import About from "./components/pages/About";
import Menu from "./components/pages/Menu";

const App = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <BrowserRouter>
            <nav
              className="d-flex justify-content-between align-items-center gap-5 p-2 blue-bg"
         
            >
              <h1 className="nav-heading">
                <IoRestaurant />
                Restoran
              </h1>
              <ul className="d-flex justify-content-end align-items-center gap-4">
                <li>
                  <Link to="/">HOME</Link>
                </li>
                <li>
                  <Link to="/about">ABOUT</Link>
                </li>
                {/* <li>
                  <Link to="/services">SERVICE</Link>
                </li>{" "} */}
             
                <li>
                  <Link to="/menu">MENU</Link>
                </li>{" "}
           
                {/* <li>
                  <Link to="/pages">PAGES</Link>
                </li>{" "} */}
              
                <li>
                  <Link to="/contact">CONTACT</Link>
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
              <Route path="/menu" element={<Menu />}/>
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </div>
    </>
  );
};

export default App;
