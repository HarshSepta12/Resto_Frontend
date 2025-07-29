import React, { useEffect, useState } from "react";
import RestoContext from "./RestoContaxt";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestoProvider = ({ children }) => {
  const  url = "http://localhost:1200/api";
  //const url = "https://resto-api-3f6g.onrender.com/api";

  const [getMenuData, setGetMenuData] = useState("");
  const [getMenuDataById, setGetMenuDataById] = useState("");
  const [category, setcategory] = useState([]);
  const [haveToken, setHaveToken] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState([]);
  const [itemQuantities, setItemQuantities] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");

    if (token) setHaveToken(true);
    if (isAdmin === "true") setAdmin(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
    setHaveToken(false);
    setAdmin(false);
  };

  const validatePhoneNumber = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 15) return false;
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const formatPhoneNumber = (phone) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return '+91' + cleaned;
    } else if (!phone.startsWith('+')) {
      return '+' + cleaned;
    }
    return phone;
  };

  const Register = async (username, email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/useradd`,
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (api.data.success) {
        toast("Register Successful", { autoClose: 1000, transition: Bounce });
      }
      return api.data;
    } catch (error) {
      console.log("Something went wrong:", error.message);
    }
  };

  const Login = async (email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (api.data.token) {
        localStorage.setItem("token", api.data.token);
        localStorage.setItem("user", JSON.stringify(api.data.user));
        setHaveToken(true);
      }

      if (api.data.user.role === "admin") {
        localStorage.setItem("isAdmin", "true");
        setAdmin(true);
      }

      if (api.data.success) {
        toast("Login Successful", { autoClose: 1000, transition: Bounce });
      }

      await getUserCart();
      return api.data;
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Something went wrong",
      };
    }
  };

  // -------------------- Admin-only Functions -----------------------

  const getAllUsers = async () => {
    if (!admin) return;
    const token = localStorage.getItem("token");
    try {
      const api = await axios.get(`${url}/user/getAllUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (api.data.success) setUser(api.data.AllUser);
    } catch (error) {
      console.log("Failed to fetch all users:", error);
    }
  };

  const updateUser = async (id, updatedData) => {
    if (!admin) return;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(`${url}/user/updateUser/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        toast.success("User updated successfully");
        getAllUsers();
      }
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    if (!admin) return;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`${url}/user/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        toast.success("User deleted");
        getAllUsers();
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const postMenuItem = async (...data) => {
    if (!admin) return;
    const [
      name, description, price, imageUrl, isAvailable,
      spiceLevel, ingredients, category,
    ] = data;

    try {
      const api = await axios.post(
        `${url}/menuItem/post`,
        { name, description, price, imageUrl, isAvailable, spiceLevel, ingredients, category },
        { headers: { "Content-Type": "application/json" } }
      );

      if (api.data.success) {
        toast("Item Added To Database", { autoClose: 1000, transition: Bounce });
      }
      return api.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const deletMenuItem = async (id) => {
    if (!admin) return;
    const token = localStorage.getItem("token");
    try {
      const api = await axios.delete(`${url}/menuItem/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (api.data.success) {
        toast(api.data.message, { autoClose: 1000, transition: Bounce });
        await getMenuItem();
        await getUserCart();
      }
      return api.data;
    } catch (error) {
      console.log("Delete failed:", error?.response?.data?.message || error.message);
    }
  };

  const updateMenuItem = async (id, updatedData) => {
    if (!admin) return;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(`${url}/menuItem/update/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success("Item updated successfully");
        await getMenuItem();
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // -------------------- Common Functions -----------------------

  const getMenuItem = async () => {
    try {
      const api = await axios.get(`${url}/menuItem/get`);
      setGetMenuData(api.data.getAllMenuItem);
      return api.data.getAllMenuItem;
    } catch (error) {
      console.log("Menu Not Found", error);
    }
  };

  const getMenuByid = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const api = await axios.get(`${url}/menuItem/get/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (api.data.success) {
        await getMenuItem();
        await getUserCart();
      }

      setGetMenuDataById(api.data.product);
      return api.data.product;
    } catch (error) {
      console.log("Get menu by ID failed:", error);
    }
  };

  const getCatgory = async () => {
    try {
      const api = await axios.get(`${url}/category/get`);
      setcategory(api.data.getCategory);
      return api.data.getCategory;
    } catch (error) {
      console.log("Category Not Found", error);
      return [];
    }
  };

  const itemAdd = async (menuItemId, name, price, quantity = 1) => {
    const token = localStorage.getItem("token");
    try {
      const api = await axios.post(
        `${url}/Addtocart/add`,
        { menuItemId, name, price, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (api.data.success) {
        toast("Item Added To Cart", { autoClose: 1000, transition: Bounce });
        await getUserCart();
      }
      return api.data;
    } catch (error) {
      console.log("Add to cart failed:", error.message);
    }
  };

  const itemDecreaseFromCart = async (menuItemId) => {
    const token = localStorage.getItem("token");
    try {
      const api = await axios.put(
        `${url}/Addtocart/decrease`,
        { menuItemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (api.data.success) {
        toast("Item Decreased From Cart", { autoClose: 1000, transition: Bounce });
        await getUserCart();
      }
      return api.data;
    } catch (error) {
      console.log("Decrease item from cart failed:", error.message);
    }
  };

  const getUserCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${url}/Addtocart/getCart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const itemMap = {};
        res.data.data.forEach((item) => {
          itemMap[item.menuItemId] = {
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            imageUrl: item.imageUrl,
            menuItemId: item.menuItemId,
          };
        });
        setItemQuantities(itemMap);
      }
    } catch (err) {
      console.log("Failed to fetch cart items:", err);
    }
  };



  const BookTable = async (name, email, phone, time, guests, specialRequest) => {
    const token = localStorage.getItem("token");
    if (!validatePhoneNumber(phone)) {
      toast.error("Please enter a valid phone number");
      return { success: false };
    }
    const formattedPhone = formatPhoneNumber(phone);
    try {
      const api = await axios.post(
        `${url}/booking/BookTable`,
        { name, email, phone: formattedPhone, time, guests, specialRequest },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (api.data.success) {
        toast.success("🎉 Table Booking Successful!");
      }
      return api.data;
    } catch (err) {
      toast.error("Booking failed");
    }
  };

  const handlePayment = async (totalAmount) => {
    try {
      const { data } = await axios.post(`${url}/payment/checkout`, {
        amount: totalAmount,
      });

      const options = {
        key: "rzp_test_Y3i5kmoyXlPQs6",
        amount: data.order.amount,
        currency: "INR",
        name: "Shree Aaiji Restaurant",
        description: "Order Payment",
        order_id: data.order.id,
        handler: function (response) {
          alert("Payment successful! ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Harsh Septa",
          email: "harshsepta49@gmail.com",
          contact: "7047916634",
        },
        theme: {
          color: "#ecdd07ff",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const getMyBooking = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${url}/booking/getMyBookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
     // console.log(res.data);
      return res.data.success ? res.data.booking : null;
    } catch (err) {
      console.error("Error fetching user booking:", err);
      return null;
    }
  };


// Accept one object argument
const addAddress = async (fullAddress, city, pincode) => {
  const token = localStorage.getItem("token");

  console.log("Sending to backend:", { fullAddress, city, pincode });

  try {
    const res = await axios.post(`${url}/address/addingAddress`, {
      fullAddress,
      city,
      pincode: Number(pincode),  // 🔥 Ensure number
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Address saved:", res.data);
    return res.data;

  } catch (err) {
    console.error("Error Adding user address:", err);
    return null;
  }
};






  useEffect(() => {
    getMenuItem();
    getCatgory();
    if (admin) {
      getAllUsers();
    }
    const token = localStorage.getItem("token");
    if (token) {
      getUserCart();
    }
  }, [haveToken, admin]);

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
        deletMenuItem,
        updateMenuItem,
        user,
        setUser,
        getAllUsers,
        updateUser,
        deleteUser,
        getMenuByid,
        getMenuDataById,
        BookTable,
        validatePhoneNumber,
        formatPhoneNumber,
        bookings,
        handlePayment,
        getMyBooking,
        addAddress,
        
      }}
    >
      {children}
    </RestoContext.Provider>
  );
};

export default RestoProvider;
