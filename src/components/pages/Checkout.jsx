import React, { useContext, useState } from 'react';
import RestoContext from '../Context/RestoContaxt';

const Checkout = () => {
  const { itemQuantities, getMenuData, handlePayment, bookings } = useContext(RestoContext);
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartItems = Object.values(itemQuantities || {});
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Table booked?
  const tableBooked = bookings && bookings.length > 0;

  const handlePlaceOrder = () => {
    if (tableBooked && address.trim() !== '') {
      const confirmSwitch = window.confirm(
        "Aapne table book kiya hai, lekin aap address enter kar rahe ho.\nKya aap table cancel karke delivery par order dena chahenge?"
      );

      if (confirmSwitch) {
        // Cancel table booking logic (optional backend call)
        // Proceed with address order
        handlePayment(totalAmount);
      } else {
        setAddress('');
        alert("Order table par hi place hoga.");
      }
    } else {
      // Direct payment (either address OR table)
      handlePayment(totalAmount);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🧾 Checkout</h2>

      {cartItems.length > 0 ? (
        <>
          <h4>Order Summary:</h4>
          {cartItems.map((item, index) => (
            <div key={index}>
              {item.name} x {item.quantity} = ₹{item.price * item.quantity}
            </div>
          ))}

          <h4 className="mt-4">Total: ₹{totalAmount}</h4>

          {tableBooked && (
            <div className="alert alert-info mt-3">
              ✅ Table already booked. If you choose delivery, table booking will be canceled.
            </div>
          )}

          <div className="mt-3">
            <label>📍 Delivery Address (optional)</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address if you want delivery"
            />
          </div>

          <button
            className="btn btn-success mt-4"
            disabled={isSubmitting}
            onClick={handlePlaceOrder}
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Checkout;
