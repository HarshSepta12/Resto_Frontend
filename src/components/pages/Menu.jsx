import React, { useState } from "react";
import styles from "./Menu.module.css"; 

import { RiCupFill } from "react-icons/ri";
import { IoRestaurant } from "react-icons/io5";
import { MdLunchDining } from "react-icons/md";

const Menu = () => {
  const [activeTab, setActiveTab] = useState(1);

  const menuData = [
    {
      id: 1,
      category: "Fast Food",
      icon: <RiCupFill />,
      items: [
        { name: "Mix Breakfast", price: "$115", img: "/img/BreakFast/Break1.jpg" },
        { name: "Pani Puri", price: "$150", img: "/img/BreakFast/Break2.jpg" },
        { name: "Samosa", price: "$120", img: "/img/BreakFast/Break3.jpg" },
        { name: "Manchriyan", price: "$100", img: "/img/BreakFast/Break4.jpg" },
        { name: "Pulav", price: "$200", img: "/img/BreakFast/Break5.jpg" },
        { name: "Brown Bread With Chees", price: "$180", img: "/img/BreakFast/Break6.jpg" },
        { name: "Deep Fried Samosa", price: "$130", img: "/img/BreakFast/Break7.jpg" },
        { name: "Mix Breakfast", price: "$160", img: "/img/BreakFast/Break1.jpg" },
      ],
    },
    {
      id: 2,
      category: "Thali",
      icon: <MdLunchDining />,
      items: [
        { name: "Currey Meal Rice", price: "$115", img: "/img/Lunch/Lunch-1.jpg" },
        { name: "Moti Choor Laduu", price: "$150", img: "/img/Lunch/Lunch-2.jpg" },
        { name: "Spagheti Noodle", price: "$120", img: "/img/Lunch/Lunch-3.jpg" },
        { name: "Khichdi", price: "$100", img: "/img/Lunch/Lunch-4.jpg" },
        { name: "Corn Dish", price: "$200", img: "/img/Lunch/Lunch-5.jpg" },
        { name: "Aai Ji special", price: "$180", img: "/img/Lunch/Lunch-6.jpg" },
        { name: "Khichdi", price: "$130", img: "/img/Lunch/Lunch-4.jpg" },
        { name: "Currey Meal Rice", price: "$160", img: "/img/Lunch/Lunch-1.jpg" },
      ],
    },
    {
      id: 3,
      category: "Starter",
      icon: <IoRestaurant />,
      items: [
        { name: "Shahi Paneer", price: "$250", img: "/img/Diner/Diner-1.jpg" },
        { name: "Matar Paneer", price: "$30", img: "/img/Diner/Diner-2.jpg" },
        { name: "Paneer and Dal Makhani", price: "$220", img: "/img/Diner/Diner-3.jpg" },
        { name: "Paneer Jayka", price: "$90", img: "/img/Diner/Diner-6.jpg" },
        { name: "Aaji Special Thali", price: "$200", img: "/img/Diner/Diner-8.webp" },
        { name: "Kaju Kari", price: "$180", img: "/img/Diner/Diner-7.webp" },
        { name: "Dal Makhani", price: "$130", img: "/img/Diner/Diner-6.jpg" },
        { name: "Shahi Paneer", price: "$160", img: "/img/Diner/Diner-1.jpg" },
      ],
    },
    {
      id: 4,
      category: "Main Course",
      icon: <IoRestaurant />,
      items: [
        { name: "Shahi Paneer", price: "$250", img: "/img/Diner/Diner-1.jpg" },
        { name: "Matar Paneer", price: "$30", img: "/img/Diner/Diner-2.jpg" },
        { name: "Paneer and Dal Makhani", price: "$220", img: "/img/Diner/Diner-3.jpg" },
        { name: "Paneer Jayka", price: "$90", img: "/img/Diner/Diner-6.jpg" },
        { name: "Aaji Special Thali", price: "$200", img: "/img/Diner/Diner-8.webp" },
        { name: "Kaju Kari", price: "$180", img: "/img/Diner/Diner-7.webp" },
        { name: "Dal Makhani", price: "$130", img: "/img/Diner/Diner-6.jpg" },
        { name: "Shahi Paneer", price: "$160", img: "/img/Diner/Diner-1.jpg" },
      ],
    },
  ];

  const selectedMenu = menuData.find((item) => item.id === activeTab);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 text-center">
          <h1 className={styles.menuTitle}>Our Menu</h1>

          <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
            {menuData.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.button} ${activeTab === tab.id ? styles.active : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
             <span className={styles.parenticons}> <span className={styles.icons}>{tab.icon}</span> {tab.category}</span>  
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedMenu ? (
        <div className="row">
          {selectedMenu.items.map((item, i) => (
            <div key={i} className="col-md-3 mb-4">
              <div className={styles.cards}>
                <img
                  src={item.img}
                  alt={item.name}
                  className={styles.cardsimgtop}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className={styles.cardsbody}>
                  <h5 className={styles.cardstitle}>{item.name}</h5>
                  <p className={styles.cardstext}>{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-danger">No menu found.</div>
      )}
    </div>
  );
};

export default Menu;
