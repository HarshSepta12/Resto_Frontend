// Updated ThemeProvider.js (Context)
import React, { useEffect, useState } from "react";
import RestoContext from "./RestoContaxt";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestoProvider = ({ children }) => {
  //debugger time
  const url = "http://localhost:1200/api";

  //deployment time
//  const url = "https://resto-api-3f6g.onrender.com/api";

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

  // Phone number validation function
  const validatePhoneNumber = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      return false;
    }
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  // Format phone number consistently
  const formatPhoneNumber = (phone) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      cleaned = '+91' + cleaned; // For Indian numbers
    } else if (!phone.startsWith('+')) {
      cleaned = '+' + cleaned;
    } else {
      cleaned = phone;
    }
    return cleaned;
  };

  //Register Logic
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
      console.log("Something Went Wrong", error.message);
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
      // console.log(api.data);
      if (api.data.user.role == "admin") {
        localStorage.setItem("token", api.data.token);
        localStorage.setItem("isAdmin", "true");
        setHaveToken(true);
        setAdmin(true);
      }
      await getUserCart();
      return api.data;
    } catch (error) {
      console.log("Login failed", error);

      return {
        success: false,
        message: error?.response?.data?.message || "Something went wrong",
      };
    }
  };

  //update user
  const updateUser = async (id, updatedData) => {
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
        getAllUsers(); // refresh list
      }
    } catch (err) {
      toast.error("Failed to update user");
      console.log(err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`${url}/user/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        toast.success("User deleted");
        getAllUsers(); // refresh list
      }
    } catch (err) {
      toast.error("Delete failed");
      console.log(err);
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
      // console.log("Your Product is here...", getMenuData);
      return api.data.getAllMenuItem;
    } catch (error) {
      console.log("Menu Not Found", error);
    }
  };

  //delete item
  const deletMenuItem = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const api = await axios.delete(`${url}/menuItem/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (api.data.success === true) {
        toast(api.data.message, {
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
        if (api.data.success === true) {
          await getMenuItem();
          await getUserCart();
        }
      }
      return api.data;
    } catch (error) {
      console.log(
        "Add to cart failed:",
        error?.response?.data?.message || error.message
      );
    }
  };

  // Menu by id
  const getMenuByid = async (id) => {
    const token = localStorage.getItem("token");
    console.log(id);

    try {
      const api = await axios.get(`${url}/menuItem/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (api.data.success === true) {
        await getMenuItem();
        await getUserCart();
      }
      console.log("Your Prodcut is here...", api.data);
      setGetMenuDataById(api.data.product);
      return api.data.product;
    } catch (error) {
      console.log(
        "Add to cart failed:",
        error?.response?.data?.message || error.message
      );
    }
  };

  // Edit menuitem
  const updateMenuItem = async (id, updatedData) => {
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
      console.log(err);
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
      console.log(error.message);
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
      console.log("Category Not Found", error);
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
      console.log(
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
      console.log(
        "Decrease item from cart failed:",
        error?.response?.data?.message || error.message
      );
    }
  };

  // Get UserCart
const getUserCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

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
          name: item.name,
          imageUrl: item.imageUrl,
          menuItemId: item.menuItemId,
        };
      });

      setItemQuantities(itemMap); // ✅ store as object
      return res.data.data;
    }
  } catch (err) {
    console.log("❌ Failed to fetch cart items", err);
  }
};



  // get all user
  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const api = await axios.get(`${url}/user/getAllUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (api.data.success) {
          setUser(api.data.AllUser);
        }
      } catch (error) {
        console.log("❌ Failed to fetch all users", error);
      }
    }
  };

  // Updated Book Table function with phone support
  const BookTable = async (name, email, phone, time, guests, specialRequest) => {
    const token = localStorage.getItem("token");

    // Validate phone number
    if (!validatePhoneNumber(phone)) {
      toast.error("Please enter a valid phone number (10-15 digits)");
      return { success: false, message: "Invalid phone number" };
    }

    // Format phone number
    const formattedPhone = formatPhoneNumber(phone);

    try {
      const api = await axios.post(
        `${url}/booking/BookTable`,
        { name, email, phone: formattedPhone, time, guests, specialRequest },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (api.data.success === true) {
        toast.success("🎉 Table Booking Successful! Check your email and SMS for confirmation.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
      return api.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Booking failed";
      toast.error("Booking failed: " + errorMessage);
      console.error("Booking error:", err);
      return { success: false, message: errorMessage };
    }
  };

  // // Get all bookings (for admin)
  // const getAllBookings = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   try {
  //     const api = await axios.get(`${url}/booking/getAllBookings`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (api.data.success) {
  //       setBookings(api.data.bookings);
  //     }
  //     return api.data.bookings;
  //   } catch (error) {
  //     console.error("Failed to fetch bookings:", error);
  //     return [];
  //   }
  // };

  // // Update booking status (for admin)
  // const updateBookingStatus = async (bookingId, status) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   try {
  //     const api = await axios.put(
  //       `${url}/booking/updateStatus/${bookingId}`,
  //       { status },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (api.data.success) {
  //       toast.success(`Booking ${status} and SMS sent to customer`);
  //       await getAllBookings(); // Refresh bookings list
  //     }
  //     return api.data;
  //   } catch (error) {
  //     console.error("Failed to update booking status:", error);
  //     toast.error("Failed to update booking status");
  //   }
  // };



const handlePayment = async (totalAmount) => {
  try {
    const { data } = await axios.post(`${url}/payment/checkout`, {
      amount: totalAmount,
    });

    const options = {
      key: "rzp_test_Y3i5kmoyXlPQs6", 
      amount: data.order.amount,
      currency: "INR",
      name: "Shree Aaiji Restourant",
      description: "Order Payment",
      order_id: data.order.id,
      handler: function (response) {
        alert("Payment successful! Razorpay Payment ID: " + response.razorpay_payment_id);
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
    console.error("Error during handlePayment:", error);
  }
};





  useEffect(() => {
    getMenuItem();
    getCatgory();
    getAllUsers();
    //getMenuByid("686a65e7b225e55facefb6a8");
    const token = localStorage.getItem("token");
    if (token) {
      getUserCart();
      if (admin) {
        //getAllBookings(); // Load bookings for admin
      }
    }
  }, [haveToken, admin]);

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
        handlePayment
      //  getAllBookings,
       // updateBookingStatus
      }}
    >
      {children}
    </RestoContext.Provider>
  );
};

export default RestoProvider;