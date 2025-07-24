import React, { useContext, useState } from "react";
import styles from "./Booktable.module.css";
import RestoContext from "../Context/RestoContaxt";

const Booktable = () => {
  const [bookData, setBookData] = useState({
    name: "",
    email: "",
    time: "",
    guests: "",
    specialRequest: "",
  });

  const { BookTable } = useContext(RestoContext);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await BookTable(
      bookData.name,
      bookData.email,
      bookData.time,
      bookData.guests,
      bookData.specialRequest
    );

    setBookData({
      name: "",
      email: "",
      time: "",
      guests: "",
      specialRequest: "",
    });
  };

  return (
    <div className={`container-fluid ${styles.bgdark} py-5`}>
      <div className="container">
        <div className="text-center mb-4">
          <h6 className={styles.heading}>Reservation</h6>
          <h1 className="text-white">Book A Table Online</h1>
        </div>

        <form className="row g-4" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              value={bookData.name}
              onChange={handleChange}
              className={`form-control ${styles.input}`}
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              name="email"
              value={bookData.email}
              onChange={handleChange}
              className={`form-control ${styles.input}`}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="datetime-local"
              name="time"
              value={bookData.time}
              onChange={handleChange}
              className={`form-control ${styles.input}`}
              required
            />
          </div>
          <div className="col-md-6">
            <select
              className={`form-select ${styles.input}`}
              name="guests"
              value={bookData.guests}
              onChange={handleChange}
              required
            >
              <option value="">Select Guests</option>
              {[...Array(6)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <textarea
              className={`form-control ${styles.textarea}`}
              rows="4"
              placeholder="Special Request"
              name="specialRequest"
              value={bookData.specialRequest}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-12 d-grid">
            <button className={`btn btn-warning ${styles.bookBtn}`} type="submit">
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booktable;
