import React, { useContext, useState, useEffect } from 'react';
import RestoContext from '../Context/RestoContaxt';
import styles from './Checkout.module.css'; // CSS module import

const Checkout = () => {
  const { itemQuantities, handlePayment, getMyBooking } = useContext(RestoContext);

  const [selectedTab, setSelectedTab] = useState('table'); // "table" or "delivery"
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [tableBooking, setTableBooking] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartItems = Object.values(itemQuantities || {});
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const fetchBooking = async () => {
      const myBookings = await getMyBooking();
      setTableBooking(myBookings || []);
    };
    fetchBooking();
  }, []);

  const handlePlaceOrder = () => {
    if (selectedTab === 'delivery' && address.trim() !== '') {
      if (tableBooking.length > 0) {
        const confirmSwitch = window.confirm(
          "You already have a table booking.\nDo you want to cancel it and proceed with delivery?"
        );
        if (!confirmSwitch) return;
        setTableBooking([]);
      }
    }
    handlePayment(totalAmount);
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        const place = data.display_name || '';
        const cityName =
          data.address.city || data.address.town || data.address.village || '';
        const pin = data.address.postcode || '';

        setAddress(place);
        setCity(cityName);
        setPincode(pin);
      } catch (err) {
        alert('Failed to fetch location details.');
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🧾 Checkout</h2>

      {/* Tabs */}
      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabButton} ${
            selectedTab === 'table' ? styles.tabButtonActive : ''
          }`}
          onClick={() => setSelectedTab('table')}
        >
         <span style={{color: "maroon"}}>🍽 </span> Table Booking
        </button>
        <button
          className={`${styles.tabButton} ${
            selectedTab === 'delivery' ? styles.tabButtonActive : ''
          }`}
          onClick={() => setSelectedTab('delivery')}
        >
          🚚 Deliver to My Address
        </button>
      </div>

      {/* Order Summary */}
      {cartItems.length > 0 ? (
        <div className={styles.orderSummary}>
          <h4>🛍 Order Summary:</h4>
          {cartItems.map((item, idx) => (
            <div key={idx}>
              {item.name} x {item.quantity} = ₹{item.price * item.quantity}
            </div>
          ))}
          <h5 className="mt-3">Total: ₹{totalAmount}</h5>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Table Booking Tab */}
      {selectedTab === 'table' && tableBooking.length > 0 && (
        <div className={styles.alert}>
          <h5>✅ Table Booked</h5>
          <p>
            <strong>Name:</strong> {tableBooking[0].name}<br />
            <strong>Email:</strong> {tableBooking[0].email}<br />
            <strong>Phone:</strong> {tableBooking[0].phone}<br />
            <strong>Guests:</strong> {tableBooking[0].guests}<br />
          <strong>Time:</strong> {new Date(tableBooking[0].time).toLocaleString(undefined, {dateStyle: 'medium',timeStyle: 'short'})}<br />
            <strong>Status:</strong> {tableBooking[0].status}
          </p>
        </div>
      )}

      {/* Delivery Tab */}
      {selectedTab === 'delivery' && (
        <div className="mt-4">
          <h5>📦 Delivery Address</h5>
          <button
            className={`${styles.tabButton}`}
            style={{ marginBottom: '1rem' }}
            onClick={handleGetCurrentLocation}
          >
            Use Current Location
          </button>

          <div className={styles.formGroup}>
            <label>Full Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          <div className={styles.formGroup}>
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Pincode"
            />
          </div>
        </div>
      )}

      {/* Place Order */}
      {cartItems.length > 0 && (
        <button
          className={styles.placeOrderBtn}
          disabled={isSubmitting}
          onClick={handlePlaceOrder}
        >
          {isSubmitting ? 'Placing Order...' : '✅ Place Order'}
        </button>
      )}
    </div>
  );
};

export default Checkout;
