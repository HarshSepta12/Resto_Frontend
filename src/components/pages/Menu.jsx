import React, { useContext, useEffect, useState } from "react";
import styles from "./Menu.module.css";
import RestoContext from "../Context/RestoContaxt";

const Menu = () => {
  const { getMenuItem, getMenuData, category } = useContext(RestoContext);
  const [activeCategory, setActiveCategory] = useState("all");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getMenuItem();
  }, []);

  const filteredItems =
    activeCategory === "all"
      ? getMenuData
      : getMenuData.filter((item) => item.category._id === activeCategory);

  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  return (
    <div className="container py-4">
      {/* Title and Category Filters */}
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className={styles.menuTitle}>Our Menu</h1>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <h2
              className={`${styles.button} ${activeCategory === "all" ? styles.active : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              🍽️ All
            </h2>

            {category?.map((cat) => (
              <h2
                key={cat._id}
                className={`${styles.button} ${activeCategory === cat._id ? styles.active : ""}`}
                onClick={() => setActiveCategory(cat._id)}
              >
                <span className={styles.parenticons}>
                  <span className={styles.icons}>{cat.icon || "🍛"}</span> {cat.name}
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
            <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
              <div className={`${styles.cards} d-flex flex-column w-100`}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={styles.cardsimgtop}
                  style={{ height: "150px", objectFit: "cover", width: "100%" }}
                />
                <div className={`${styles.cardsbody} d-flex flex-column justify-content-between flex-grow-1`}>
                  <div>
                    <h5 className={styles.cardstitle}>{item.name}</h5>
                    <p className={styles.cardstext}>₹{item.price}</p>
                    <p className={styles.desc}>{item.description}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="d-flex align-items-center justify-content-center gap-3 mt-3 flex-wrap">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="btn btn-outline-danger btn-sm px-3"
                    >
                      –
                    </button>
                    <span className="fw-bold fs-6">{quantities[item._id] || 0}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="btn btn-outline-success btn-sm px-3"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-danger">No items available.</div>
        )}
      </div>
    </div>
  );
};

export default Menu;
