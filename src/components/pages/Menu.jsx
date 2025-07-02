import React, { useContext, useEffect, useState } from "react";
import styles from "./Menu.module.css";
import RestoContext from "../Context/RestoContaxt";

const Menu = () => {
  const { getMenuItem, getMenuData, category } = useContext(RestoContext);

  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    getMenuItem(); // API se menu data fetch karna
  }, []);

  // Category ke hisaab se items filter karna
  const filteredItems =
    activeCategory === "all"
      ? getMenuData
      : getMenuData.filter((item) => item.category._id === activeCategory);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className={styles.menuTitle}>Our Menu</h1>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {/* 'All' button */}
            <button
              className={`${styles.button} ${
                activeCategory === "all" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("all")}
            >
              <span className={styles.parenticons}>🍽️ All</span>
            </button>

            {/* Dynamic category buttons */}
            {category?.map((cat) => (
              <button
                key={cat._id}
                className={`${styles.button} ${
                  activeCategory === cat._id ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(cat._id)}
              >
                <span className={styles.parenticons}>
                  <span className={styles.icons}>{cat.icon || "🍛"}</span>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className={styles.cards}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={styles.cardsimgtop}
                  style={{ height: "150px", objectFit: "cover", width: "100%" }}
                />
                <div className={styles.cardsbody}>
                  <h5 className={styles.cardstitle}>{item.name}</h5>
                  <p className={styles.cardstext}>₹{item.price}</p>
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
