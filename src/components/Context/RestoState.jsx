// ThemeProvider.js
import React, { useEffect, useState } from "react";
import RestoContext from "./RestoContaxt";
import axios from "axios";
import {  toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestoProvider = ({ children }) => {
  const url = "http://localhost:1200/api";
  const [getMenuData, setGetMenuData] = useState([]);
  const [category, setcategory] = useState([]);
  const [haveToken, setHaveToken] = useState(false);
  const [admin, setAdmin] = useState(false);


  // Checking Toekn from loacal Storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHaveToken(true);
    }
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("token");
  setHaveToken(false);
};

  //Resgister Logic
  const Register = async (username, email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/useradd`,
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(api.data);
      if (api.data.success == true) {
        toast("Register Successfull", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      return api.data;
    } catch (error) {
      console.error("Something Went Wrong", error.message);
    }
  };

  //Logic Api
  const Login = async (email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (api.data.token) {
        localStorage.setItem("token", api.data.token);
      }
      if (api.data.success === true) {
        toast("Login Successfull", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      setHaveToken(true);
      console.log(api.data);
   if(api.data.user.role == "admin"){
    setAdmin(true);
   }

      return api.data;
    } catch (error) {
      console.error("Login failed", error);

      return {
        success: false,
        message: error?.response?.data?.message || "Something went wrong",
      };
    }
  };


  //get menu item 
  const getMenuItem = async () => {
    try {
      const api = await axios.get(`${url}/menuItem/get`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setGetMenuData(api.data.getAllMenuItem);
      return api.data.getAllMenuItem;
    } catch (error) {
      console.error("Menu Not Found", error);
    }
  };


  // post menuitem
  const postMenuItem = async ( name, description, price, imageUrl, isAvailable, 
    spiceLevel, ingredients, category) => {
      try {
        const api = await axios.post(
        `${url}/menuItem/post`,
        { name, description, price, imageUrl, isAvailable, 
    spiceLevel, ingredients, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (api.data.success === true) {
        toast("Item Added To Database", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
         return api.data;
      } catch (error) {
        console.error(error.message);
      }
    }
  // get Category
  const getCatgory = async () => {
  try {
    const api = await axios.get(`${url}/category/get`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setcategory(api.data.getCategory)
    return api.data.getCategory; 

  } catch (error) {
    console.error("Category Not Found", error);
    return [];
  }
};

  // Optional: preload on mount
  useEffect(() => {
    getMenuItem();
    getCatgory();
    
  }, []);

  // getMenuItem();
  return (
    <RestoContext.Provider
      value={{ url, Login, Register, getMenuItem, getMenuData, getCatgory, category ,setHaveToken, haveToken, handleLogout, postMenuItem,admin, setAdmin}}
    >
      {children}
    </RestoContext.Provider>
  );
};

export default RestoProvider;
