import React, { useContext, useState } from "react";
import styles from "./Booktable.module.css";
import RestoContext from "../Context/RestoContaxt";

const Booktable = () => {
  const [bookData, setBookData] = useState({
    name: "",
    email: "",
    phone: "", // Added phone field
    time: "",
    guests: "",
    specialRequest: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { BookTable, validatePhoneNumber } = useContext(RestoContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!bookData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (bookData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!bookData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(bookData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Phone validation
    if (!bookData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhoneNumber(bookData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    // Time validation
    if (!bookData.time) {
      newErrors.time = "Date and time is required";
    } else {
      const selectedDateTime = new Date(bookData.time);
      const now = new Date();
      if (selectedDateTime <= now) {
        newErrors.time = "Please select a future date and time";
      }
    }

    // Guests validation
    if (!bookData.guests) {
      newErrors.guests = "Number of guests is required";
    } else if (bookData.guests < 1 || bookData.guests > 20) {
      newErrors.guests = "Guests must be between 1 and 20";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await BookTable(
        bookData.name,
        bookData.email,
        bookData.phone,
        bookData.time,
        bookData.guests,
        bookData.specialRequest
      );

      if (result?.success) {
        // Reset form on success
        setBookData({
          name: "",
          email: "",
          phone: "",
          time: "",
          guests: "",
          specialRequest: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Booking submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get minimum datetime (current time + 1 hour)
  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className={`container-fluid ${styles.bgdark} py-5`}>
      <div className="container">
        <div className="text-center mb-4">
          <h6 className={styles.heading}>Reservation</h6>
          <h1 className="text-white">Book A Table Online</h1>
          <p className="text-light mb-4">
            📧 Email + 📱 SMS confirmations will be sent instantly!
          </p>
        </div>

        <form className="row g-4" onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className="col-md-6">
            <label className="form-label text-light">
              <i className="fas fa-user me-2"></i>Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={bookData.name}
              onChange={handleChange}
              className={`form-control ${styles.input} ${
                errors.name ? 'is-invalid' : ''
              }`}
              placeholder="Enter Your Full Name"
              required
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* Email Field */}
          <div className="col-md-6">
            <label className="form-label text-light">
              <i className="fas fa-envelope me-2"></i>Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={bookData.email}
              onChange={handleChange}
              className={`form-control ${styles.input} ${
                errors.email ? 'is-invalid' : ''
              }`}
              placeholder="Enter Your Email"
              required
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Phone Field */}
          <div className="col-md-6">
            <label className="form-label text-light">
              <i className="fas fa-phone me-2"></i>Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={bookData.phone}
              onChange={handleChange}
              className={`form-control ${styles.input} ${
                errors.phone ? 'is-invalid' : ''
              }`}
              placeholder="+91 98765 43210 or +1 234 567 8900"
              required
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
            <small className="form-text text-muted">
              <i className="fas fa-sms me-1"></i>
              SMS confirmation will be sent to this number
            </small>
          </div>

          {/* DateTime Field */}
          <div className="col-md-6">
            <label className="form-label text-light">
              <i className="fas fa-calendar-alt me-2"></i>Date & Time *
            </label>
            <input
              type="datetime-local"
              name="time"
              value={bookData.time}
              onChange={handleChange}
              min={getMinDateTime()}
              className={`form-control ${styles.input} ${
                errors.time ? 'is-invalid' : ''
              }`}
              required
            />
            {errors.time && (
              <div className="invalid-feedback">{errors.time}</div>
            )}
          </div>

          {/* Guests Field */}
          <div className="col-md-6">
            <label className="form-label text-light">
              <i className="fas fa-users me-2"></i>Number of Guests *
            </label>
            <select
              className={`form-select ${styles.input} ${
                errors.guests ? 'is-invalid' : ''
              }`}
              name="guests"
              value={bookData.guests}
              onChange={handleChange}
              required
            >
              <option value="">Select Number of Guests</option>
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
            {errors.guests && (
              <div className="invalid-feedback">{errors.guests}</div>
            )}
          </div>

          {/* Special Request Field */}
          <div className="col-12">
            <label className="form-label text-light">
              <i className="fas fa-comment me-2"></i>Special Requests (Optional)
            </label>
            <textarea
              className={`form-control ${styles.textarea}`}
              rows="4"
              placeholder="Any dietary restrictions, allergies, special occasion details, seating preferences, etc..."
              name="specialRequest"
              value={bookData.specialRequest}
              onChange={handleChange}
              maxLength="500"
            ></textarea>
            <small className="form-text text-muted">
              {bookData.specialRequest.length}/500 characters
            </small>
          </div>

          {/* Submit Button */}
          <div className="col-12 d-grid">
            <button 
              className={`btn btn-warning ${styles.bookBtn}`} 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Booking...
                </>
              ) : (
                <>
                  <i className="fas fa-calendar-check me-2"></i>
                  Book Now (Email + SMS Confirmation)
                </>
              )}
            </button>
          </div>
        </form>

        {/* Information Section */}
        <div className="row mt-5">
          <div className="col-md-4 text-center text-light mb-3">
            <i className="fas fa-envelope fa-2x text-warning mb-2"></i>
            <h5>Email Confirmation</h5>
            <p>Instant booking confirmation sent to your email</p>
          </div>
          <div className="col-md-4 text-center text-light mb-3">
            <i className="fas fa-sms fa-2x text-warning mb-2"></i>
            <h5>SMS Notification</h5>
            <p>Booking details and updates via SMS</p>
          </div>
          <div className="col-md-4 text-center text-light mb-3">
            <i className="fas fa-clock fa-2x text-warning mb-2"></i>
            <h5>Quick Confirmation</h5>
            <p>Our team will confirm your booking within 30 minutes</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-4">
          <p className="text-light">
            <i className="fas fa-phone me-2"></i>
            Need help? Call us: <strong>+91 70479 16634 </strong>
          </p>
          <p className="text-muted small">
            * All fields marked with asterisk are required
          </p>
        </div>
      </div>
    </div>
  );
};

export default Booktable;