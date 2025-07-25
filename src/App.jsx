import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Public pages
import Home from "./components/pages/Home.jsx";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Menu from "./components/pages/Menu";
import Register from "./components/pages/Register";
import AdminLogin from "./components/pages/AdminLogin";

// Admin pages
import MenuForm from "./components/MenuForm";
import MenuItem from "./components/pages/MenuItem";

// Layouts
import AdminLayout from "./Layout/AdminLayout";
import PublicLayout from "./Layout/PublicLayout";
import Booktable from "./components/pages/Booktable";
import Users from "./components/pages/User";
import ProductSpecificPage from "./components/pages/ProductSpecificPage.jsx";
import Cart from "./components/pages/Cart.jsx";
import RestoContext from "./components/Context/RestoContaxt.jsx";

const App = () => {

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/booktable" element={<Booktable />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/productspecificpage"
            element={<ProductSpecificPage />}
          />
        </Route>

        {/* Admin layout */}
        <Route element={<AdminLayout />}>
          {/* <Route path="/" element={<AdminNavbar />} /> */}
          <Route path="/menuitem" element={<MenuItem />} />
          <Route path="/menuform" element={<MenuForm />} />
          <Route path="/users" element={<Users />} /> {/* NEW */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
