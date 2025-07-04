import React from 'react';
import styles from './Booktable.module.css';

const Booktable = () => {
  return (
    <div className={`container-fluid ${styles.bgdark} py-5`}>
      <div className="container">
        <div className="text-center mb-4">
          <h6 className={styles.heading}>Reservation</h6>
          <h1 className="text-white">Book A Table Online</h1>
        </div>

        <form className="row g-4">
          <div className="col-md-6">
            <input
              type="text"
              className={`form-control ${styles.input}`}
              placeholder="Enter Your Name"
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className={`form-control ${styles.input}`}
              placeholder="Enter Your Email"
            />
          </div>
          <div className="col-md-6">
            <input
              type="datetime-local"
              className={`form-control ${styles.input}`}
            />
          </div>
          <div className="col-md-6">
            <select className={`form-select ${styles.input}`} defaultValue="1">
              {[...Array(6)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <textarea
              className={`form-control ${styles.textarea}`}
              rows="4"
              placeholder="Special Request"
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
