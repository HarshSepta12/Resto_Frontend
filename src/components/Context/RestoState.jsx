// ThemeProvider.js
import React, { useState } from "react";
import RestoContext from "./RestoContaxt";

const RestoProvider = ({ children }) => {
    const url = "localhost:1200/api";

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
       // setToken(api.data.token);
       // setAuthenticated(true);
        //setReload(!reload);
      }
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      return api.data;
    } catch (error) {
      console.error("Login failed", error);
    }
  };



  return (
    <RestoContext.Provider value={{url, Login}}>
      {children}
    </RestoContext.Provider>
  );
};

export default RestoProvider;
