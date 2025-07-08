// ThemeProvider.js
import React, { useEffect, useState } from "react";
import RestoContext from "./RestoContaxt";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestoProvider = ({ children }) => {
  //debugger time
  // // const url = "http://localhost:1200/api";

  //deployment time
  const url = "https://resto-api-3f6g.onrender.com/api";
  const [getMenuData, setGetMenuData] = useState([]);
  const [category, setcategory] = useState([]);
  const [haveToken, setHaveToken] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin"); // tum token ke sath admin flag bhi save karo

    if (token) {
      setHaveToken(true);
    }

    if (isAdmin === "true") {
      setAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
    setHaveToken(false);
    setAdmin(false);
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
        localStorage.setItem("user", JSON.stringify(api.data.user));
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
      if (api.data.user.role == "admin") {
        localStorage.setItem("token", api.data.token);
        localStorage.setItem("isAdmin", "true");
        setHaveToken(true);
        setAdmin(true);
      }
      await getUserCart();
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
  const postMenuItem = async (
    name,
    description,
    price,
    imageUrl,
    isAvailable,
    spiceLevel,
    ingredients,
    category
  ) => {
    try {
      const api = await axios.post(
        `${url}/menuItem/post`,
        {
          name,
          description,
          price,
          imageUrl,
          isAvailable,
          spiceLevel,
          ingredients,
          category,
        },
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
  };

  // get Category
  const getCatgory = async () => {
    try {
      const api = await axios.get(`${url}/category/get`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setcategory(api.data.getCategory);
      return api.data.getCategory;
    } catch (error) {
      console.error("Category Not Found", error);
      return [];
    }
  };

  // Add to card function
  const itemAdd = async (menuItemId, name, price, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");
      //console.log("📦 Sending token:", token); // Log this to ensure it's there

      const api = await axios.post(
        `${url}/Addtocart/add`,
        { menuItemId, name, price, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (api.data.success === true) {
        toast("Item Added To Cart", {
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
        await getUserCart();
      }
      return api.data;
    } catch (error) {
      console.error(
        "Add to cart failed:",
        error?.response?.data?.message || error.message
      );
    }
  };

  //decreseCart item

  const itemDecreaseFromCart = async (menuItemId) => {
    const token = localStorage.getItem("token");
    console.log("Token: ", localStorage.getItem("token"));

    try {
      const api = await axios.put(
        `${url}/Addtocart/decrease`,
        { menuItemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (api.data.success === true) {
        toast("Item Decreased From Cart", {
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

        await getUserCart();
      }

      console.log(api.data);
      return api.data;
    } catch (error) {
      console.error(
        "Decrease item from cart failed:",
        error?.response?.data?.message || error.message
      );
    }
  };

  // Get UserCart
  const getUserCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("🚫 No token found for getUserCart");
      return;
    }
    console.log(token);

    try {
      const res = await axios.get(`${url}/Addtocart/getCart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        const itemMap = {};
        res.data.data.forEach((item) => {
          itemMap[item.menuItemId] = {
            quantity: item.quantity,
            price: item.price,
          };
        });

        setItemQuantities(itemMap);
        console.log("🛒 Cart fetched:", itemMap);
      }
    } catch (err) {
      console.error("❌ Failed to fetch cart items", err);
    }
  };

  // Optional: preload on mount
  useEffect(() => {
    getMenuItem();
    getCatgory();
    const token = localStorage.getItem("token");
    if (token) {
      getUserCart();
    }
  }, [haveToken]);

  // getMenuItem();
  return (
    <RestoContext.Provider
      value={{
        url,
        Login,
        Register,
        getMenuItem,
        getMenuData,
        getCatgory,
        category,
        setHaveToken,
        haveToken,
        handleLogout,
        postMenuItem,
        admin,
        setAdmin,
        itemAdd,
        setItemQuantities,
        itemQuantities,
        getUserCart,
        itemDecreaseFromCart,
      }}
    >
      {children}
    </RestoContext.Provider>
  );
};

export default RestoProvider;
