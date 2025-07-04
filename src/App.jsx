import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Public pages
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Menu from "./components/pages/Menu";
import Register from "./components/pages/Register";
import AdminLogin from "./components/pages/AdminLogin";

// Admin pages
import MenuForm from "./components/MenuForm";
import AdminDashboard from "./components/pages/AdminDashboard";

// Layouts
import AdminLayout from "./Layout/AdminLayout";
import PublicLayout from "./Layout/PublicLayout";
import AdminNavbar from "./components/AdminNavbar";

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
  </Route>

  {/* Admin layout */}
<Route element={<AdminLayout />}>

  {/* <Route path="/" element={<AdminNavbar />} /> */}
  <Route path="/dashboard" element={<AdminDashboard />} />
  <Route path="/menuform" element={<MenuForm />} />
</Route>

</Routes>
    </BrowserRouter>
  );
};

export default App;
