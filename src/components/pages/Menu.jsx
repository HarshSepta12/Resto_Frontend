import React, { useContext, useEffect, useState } from "react";
import styles from "./Menu.module.css";
import RestoContext from "../Context/RestoContaxt";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const {
    getMenuItem,
    getMenuData,
    category,
    setItemQuantities,
    itemQuantities,
    getUserCart,
    itemDecreaseFromCart,
    getMenuByid
  } = useContext(RestoContext);
  const [activeCategory, setActiveCategory] = useState("all");
  //const [itemQuantities, setitemQuantities] = useState({});
  const { itemAdd } = useContext(RestoContext);
const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user?._id || user.id;
  // console.log(user);


  const handleProductClick = async (id) => {
  await getMenuByid(id); // context से API call
  navigate("/productspecificpage");
};
  useEffect(() => {
    getMenuItem();
    getUserCart();
  }, []);

  //  menuItemId, name, price, quantity
  const filteredItems =
    activeCategory === "all"
      ? getMenuData
      : getMenuData.filter((item) => item.category._id === activeCategory);

  // console.log("filteredItems", filteredItems);
  const handleIncrement = async (menuItemID, name, price) => {
    await itemAdd(menuItemID, name, price, 1);
    await getUserCart();
  };

  const handleDecrement = async (menuItemID) => {
    await itemDecreaseFromCart(menuItemID);
    await getUserCart();
  };
  return (
    <div className="container py-4">
      {/* Title and Filters */}
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className={styles.menuTitle}>Our Menu</h1>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <h1
              className={`${styles.button} ${
                activeCategory === "all" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("all")}
            >
              🍽️ All
            </h1>
            {category?.map((cat) => (
              <h2
                key={cat._id}
                className={`${styles.button} ${
                  activeCategory === cat._id ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(cat._id)}
              >
                <span className={styles.parenticons}>
                  <span className={styles.icons}>{cat.icon || "🍛"}</span>{" "}
                  {cat.name}
                </span>
              </h2>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="row">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
            >
              <div className={styles.cards}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={styles.cardsimgtop}
               onClick={() => handleProductClick(item._id)}
                />

                <div className={styles.cardsbody}>
                  <div>
                    <h5 className={styles.cardstitle}>{item.name}</h5>
                    <p className={styles.cardstext}>
                      ₹{itemQuantities[item._id]?.price || item.price}
                    </p>
                    <p className={styles.desc}>{item.description}</p>
                  </div>

                  <div className="d-flex align-items-center justify-content-center gap-3 mt-3 flex-wrap">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="btn btn-outline-danger btn-sm px-3"
                      disabled={!item.isAvailable}
                    >
                      –
                    </button>
                    <span className="fw-bold fs-6">
                      {itemQuantities[item._id]?.quantity || 0}
                    </span>

                    <button
                      onClick={() =>
                        handleIncrement(item._id, item.name, item.price)
                      }
                      className="btn btn-outline-success btn-sm px-3"
                      disabled={!item.isAvailable}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-danger">
            No items available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
