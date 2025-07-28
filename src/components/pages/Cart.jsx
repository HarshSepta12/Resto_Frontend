import React, { useContext } from 'react';
import RestoContext from '../Context/RestoContaxt';
import styles from './Cart.module.css';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { itemQuantities, getMenuData, handlePayment } = useContext(RestoContext);


const navigate = useNavigate();
  const cartItems = Object.values(itemQuantities || {});
  const cartTotalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0); // ✅ FIXED

  return (
    <div className="container py-4">
      <h2 className={`text-center mb-4 ${styles.cartTitle}`}>🛒 Your Cart</h2>
      <div className="row text-dark">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => {
            const fallbackImage =
              getMenuData.find((menu) => menu._id === item.menuItemId)?.imageUrl ||
              'https://via.placeholder.com/200x150';

            return (
              <div key={item.menuItemId || index} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className={`card shadow-sm h-100 ${styles.cartCard}`}>
                  <img
                    src={item.imageUrl || fallbackImage}
                    className={`card-img-top ${styles.cartImg}`}
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-dark">{item.name}</h5>
                    <p className={`card-text ${styles.cartPrice}`}>
                      Price: ₹{item.price}
                    </p>
                    <p className="card-text text-dark">Quantity: {item.quantity}</p>
                    <p className={`card-text ${styles.cartTotal}`}>
                      Total: ₹{item.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12 text-center text-danger">🛒 Cart is empty.</div>
        )}

        <div className="text-center mt-4">
          <h4>Total Amount: ₹{cartTotalAmount}</h4>
          <button className="btn btn-primary mt-2" onClick={() => navigate('/checkout')}>
  Proceed to Checkout
</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
