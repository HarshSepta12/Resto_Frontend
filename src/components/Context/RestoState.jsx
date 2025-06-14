// ThemeProvider.js
import React, { useState } from "react";
import RestoContext from "./RestoContaxt";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RestoProvider = ({ children }) => {
  const url = "http://localhost:1200/api";

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

      console.log(api.data)
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
;
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

      return api.data;
    } catch (error) {
      console.error("Login failed", error);

      return {
        success: false,
        message: error?.response?.data?.message || "Something went wrong",
      };
    }
  };

  return (
    <RestoContext.Provider value={{ url, Login, Register }}>
      {children}
    </RestoContext.Provider>
  );
};

export default RestoProvider;
