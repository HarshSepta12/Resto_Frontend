import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Footer from "./components/pages/Footer";

const App = () => {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contact" element={<Contact />}/>
     </Routes>
     <Footer />
     </BrowserRouter>
    </>
  );
};

export default App;
