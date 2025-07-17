import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import RestoContext from "../Context/RestoContaxt";
import styles from "./ProductSpecificPage.module.css";

const ProductSpecificPage = () => {
  const { getMenuDataById } = useContext(RestoContext);
  const navigate = useNavigate();
// console.log(getMenuDataById);

  if (!getMenuDataById) {
    return <div className={styles.loading}>Loading Product...</div>;
  }

  const { name, price, description, imageUrl } = getMenuDataById;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={imageUrl} alt={name} className={styles.image} />

        <div className={styles.details}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.description}>{description}</p>
          <h4 className={styles.price}>₹{price}</h4>
          <button className={styles.button}>Order Now</button>
          <button className={styles.back} onClick={() => navigate("/menu")}>
            ⬅ Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecificPage;
