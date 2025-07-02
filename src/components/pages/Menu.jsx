import React, { useContext, useEffect, useState } from "react";
import styles from "./Menu.module.css";
import RestoContext from "../Context/RestoContaxt";

const Menu = () => {
  const { getMenuItem, getMenuData, category } = useContext(RestoContext);

  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    if (category?.length > 0 && !activeCategoryId) {
      setActiveCategoryId(category[0]._id);
    }
  }, [category]);

  const filteredItems = getMenuData?.[activeCategoryId] || [];
  
console.log("activeCategoryId:", activeCategoryId);
console.log("getMenuData:", getMenuData);
console.log("getMenuData[activeCategoryId]:", getMenuData?.[activeCategoryId]);


  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className={styles.menuTitle}>Our Menu</h1>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {category?.map((cat) => (
              <button
                key={cat._id}
                className={`${styles.button} ${activeCategoryId === cat._id ? styles.active : ""}`}
                onClick={() => setActiveCategoryId(cat._id)}
              >
                <span className={styles.parenticons}>
                  <span className={styles.icons}>{cat.icon || "🍽️"}</span>
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
                  src={item.img}
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
