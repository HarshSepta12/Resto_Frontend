import React, { useState, useEffect } from "react";
import { IoRestaurant } from "react-icons/io5";
import "./Home.css";
import { FaUserTie } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { RiCupFill } from "react-icons/ri";
import { MdLunchDining } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

// import WOW from "wowjs";
// import "animate.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  

  const menuData = [
    {
      id: 1,
      category: "Breakfast",
      icon: <RiCupFill />,
      items: [
        { name: "Mix Breakfast", price: "$115", img: "BreakFast/Break1.jpg" },
        { name: "Pani Puri", price: "$150", img: "BreakFast/Break2.jpg" },
        {
          name: "Samosa",
          price: "$120",
          img: "BreakFast/Break3.jpg",
        },
        { name: "Manchriyan", price: "$100", img: "BreakFast/Break4.jpg" },
        { name: "Pulav", price: "$200", img: "BreakFast/Break5.jpg" },
        {
          name: "Brown Bread With Chees",
          price: "$180",
          img: "BreakFast/Break6.jpg",
        },
        {
          name: "Deep Fried Samosa",
          price: "$130",
          img: "BreakFast/Break7.jpg",
        },
        { name: "Mix Breakfast", price: "$160", img: "BreakFast/Break1.jpg" },
      ],
    },
    {
      id: 2,
      category: "Lunch",
      icon: <MdLunchDining />,
      items: [
        { name: "Currey Meal Rice", price: "$115", img: "Lunch/Lunch-1.jpg" },
        { name: "Moti Choor Laduu", price: "$150", img: "Lunch/Lunch-2.jpg" },
        { name: "spagheti nodlle", price: "$120", img: "Lunch/Lunch-3.jpg" },
        { name: "Khichdi", price: "$100", img: "Lunch/Lunch-4.jpg" },
        { name: "Corn Dish", price: "$200", img: "Lunch/Lunch-5.jpg" },
        { name: "Aai Ji special", price: "$180", img: "Lunch/Lunch-6.jpg" },
        { name: "Khichdi", price: "$130", img: "Lunch/Lunch-4.jpg" },
        { name: "Currey Meal Rice", price: "$160", img: "Lunch/Lunch-1.jpg" },
      ],
    },
    {
      id: 3,
      category: "Dinner",
      icon: <IoRestaurant />,
      items: [
        { name: "Shahi Paneer", price: "$250", img: "Diner/Diner-1.jpg" },
        { name: "Matar Paneer", price: "$30", img: "Diner/Diner-2.jpg" },
        {
          name: "paneer and Dal Makhana",
          price: "$220",
          img: "Diner/Diner-3.jpg",
        },
        { name: "Paneer Jayka", price: "$90", img: "Diner/Diner-6.jpg" },
        {
          name: "Aaji Special Thali",
          price: "$200",
          img: "Diner/Diner-8.webp",
        },
        { name: "Kaju Kari", price: "$180", img: "Diner/Diner-7.webp" },
        { name: "Dal Makhani", price: "$130", img: "Diner/Diner-6.jpg" },
        { name: "Shahi Paneer", price: "$160", img: "Diner/Diner-1.jpg" },
      ],
    },
  ];

  // testomonial
  const testimonials = [
    {
      id: 1,
      img: "/img/testimonial-1.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aspernatur laudantium",
      name: "Karan Johar",
      profession: "Profession",
    },
    {
      id: 2,
      img: "/img/testimonial-2.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aspernatur laudantium",
      name: "Karan Johar",
      profession: "Profession",
    },
    {
      id: 3,
      img: "/img/testimonial-3.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aspernatur laudantium",
      name: "Karan Johar",
      profession: "Profession",
    },
    {
      id: 4,
      img: "/img/testimonial-4.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aspernatur laudantium",
      name: "Karan Johar",
      profession: "Profession",
    },
  ];

  // useEffect(() => {
  //   new WOW.WOW().init();
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <>
      <div className="container-fluid text-light cont-width">
        <div className="row bgc">
          <div className="col-md-12 pos"></div>
          <div className="row justify-content-around align-items-center  p-5">
            <div className="col-md-5 text-center text-lg-start ">
              <h1 className="display-3 text-white fw-bolder">
                Enjoy Our
                <br />
                Delicious Meal
              </h1>
              <p>
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <button className="book-btn">BOOK TABLE</button>
            </div>
            <div className="col-md-6">
              <div className="hero-img">
                <img
                  className="Animated-img"
                  src="/img/hero.png"
                  alt=""
                  style={{ width: "100%", aspectRatio: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row text-dark p-5">
          <div className="col-md-12  d-flex justify-content-start align-items-center gap-3 flex-wrap">
            <div className="card p-3">
              <div className="icon">
                <FaUserTie />
              </div>
              <div className="card-title">Master Cheif</div>
              <div className="card-bd">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Similique, sapiente?
              </div>
            </div>
            <div className="card p-3">
              <div className="icon">
                <IoRestaurant />
              </div>
              <div className="card-title">Quality Food</div>
              <div className="card-bd">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Similique, sapiente?
              </div>
            </div>
            <div className="card p-3">
              <div className="icon">
                <FaCartPlus />
              </div>
              <div className="card-title">Order Online</div>
              <div className="card-bd">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Similique, sapiente?
              </div>
            </div>
            <div className="card p-3">
              <div className="icon">
                <RiCustomerService2Fill />
              </div>
              <div className="card-title">24/7 Service</div>
              <div className="card-bd">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Similique, sapiente?
              </div>
            </div>
          </div>
        </div>

        <div className="row text-dark p-5">
          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-6 text-start">
                <div className="about-img1">
                  <img
                    className="img-fluid rounded"
                    src="/img/about-1.jpg"
                    alt="about1"
                  />
                </div>
              </div>

              <div className="col-6 text-start">
                <div className="about-img2">
                  <img
                    className="img-fluid rounded w-75 "
                    src="/img/about-2.jpg"
                    alt="about2"
                    style={{
                      marginTop: "4rem",
                    }}
                  />
                </div>
              </div>
              <div className="col-6 text-end">
                <div className="about-img3">
                  <img
                    className="img-fluid rounded w-75 "
                    src="/img/about-3.jpg"
                    alt="about3"
                  />
                </div>
              </div>
              <div className="col-6 text-end">
                <div className="about-img4">
                  <img
                    className="img-fluid rounded w-100 "
                    src="/img/about-4.jpg"
                    alt="about4"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.2s",
                      animationName: "zoomIn",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 marg">
            <h5 className="about-heading">about Us</h5>
            <h1 className="about-title">
              Welcome to <IoRestaurant style={{ color: "#FEA116" }} /> Shree
              Aaji Restaurant – A Taste of Tradition
            </h1>
            <p className="text-dark">
              Located in Raipuriya (Tehsil Petlawad, District Jhabua, Madhya
              Pradesh), Shree Aaji Restaurant is a family-friendly dining
              destination offering a delightful mix of authentic flavors and
              warm hospitality. We are committed to serving delicious,
              high-quality food that feels just like home.
            </p>
            <p className="mt-4 text-dark">
              Our diverse menu features a variety of cuisines, including
              flavorful North Indian, aromatic South Indian, and rich Punjabi
              dishes. In addition to full meals, we also serve light snacks,
              street-style treats, and popular Chinese dishes like noodles,
              Manchurian, and spring rolls – all freshly prepared with quality
              ingredients and traditional recipes.
            </p>

            <p className="text-dark">
              At Shree Aaji Restaurant, cleanliness, taste, and friendly service
              are at the heart of everything we do. Whether you’re looking for a
              quick bite, a family meal, or a place to hang out with friends, we
              offer the perfect setting for every occasion.
            </p>
            <p className="text-dark">
              Come visit us and experience the rich flavors of India in a cozy
              and welcoming environment. We look forward to serving you!
            </p>
            <div className="d-flex justify-content-start align-items-center flex-wrap gap-5">
              <div className="left-border">
                <div className="left-border-child"></div>
                <h1
                  style={{
                    color: "#FEA116",
                    fontWeight: "900",
                    fontSize: "50px",
                  }}
                >
                  15
                </h1>
                <p style={{ fontSize: "17px" }}>
                  Years of <br />
                  <span style={{ fontWeight: "bold" }}>Experience</span>{" "}
                </p>
              </div>

              <div className="left-border">
                <div className="left-border-child"></div>
                <h1
                  style={{
                    color: "#FEA116",
                    fontWeight: "900",
                    fontSize: "50px",
                  }}
                >
                  50
                </h1>
                <p style={{ fontSize: "17px" }}>
                  Popular
                  <br />
                  <span style={{ fontWeight: "bold" }}>Master Chefs</span>{" "}
                </p>
              </div>
            </div>

            <button className="Read-btn" onClick={() => navigate('/about')}>Read More</button>
          </div>
        </div>

        <div className="row text-dark p-5">
          <div className="col-sm-12 text-center">
            <h5 className="food-menu text-center">Food Menu</h5>
            <h1 className="most">Most Popular Items</h1>
            <div className="tab-class text-center">
              <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                <li className="nav-item">
                  <button
                    className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 btn-tab ${
                      activeTab === 1 ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(1)}
                  >
                    <h1 style={{ color: "#FEA116" }}>
                      <RiCupFill />
                    </h1>
                    <div className="ps-3">
                      <small className="text-secondary">Popular</small>
                      <h6 className="text-dark fw-bolder">Breakfast</h6>
                    </div>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 btn-tab ${
                      activeTab === 2 ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(2)}
                  >
                    <h1 style={{ color: "#FEA116" }}>
                      <MdLunchDining />
                    </h1>
                    <div className="ps-3">
                      <small className="text-secondary">Special</small>
                      <h6 className="text-dark fw-bolder">Lunch</h6>
                    </div>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 btn-tab ${
                      activeTab === 3 ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(3)}
                  >
                    <h1 style={{ color: "#FEA116" }}>
                      <IoRestaurant />
                    </h1>
                    <div className="ps-3">
                      <small className="text-secondary">Lovely</small>
                      <h6 className="text-dark fw-bolder">Dinner</h6>
                    </div>
                  </button>
                </li>
              </ul>

              {/* Menu Items */}
              <div className="row">
                <div className="col-md-12 d-flex flex-wrap justify-content-between gap-4">
                  {menuData
                    .find((menu) => menu.id === activeTab)
                    .items.map((item, index) => (
                      <div
                        key={index}
                        className="menu-item "
                        style={{
                          flexBasis: "45%",
                          display: "flex",
                          alignItems: "center",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          background: "#fff",
                          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <img
                          src={`/img/${item.img}`}
                          alt={item.name}
                          className="img-fluid rounded"
                          width={90}
                          height={70}
                        />
                        <div className="ps-3 text-start w-100">
                          <h5 className="d-flex  justify-content-between align-items-center border-bottom pb-2">
                            <p>{item.name}</p>
                            <p className="Doller-style">{item.price}</p>
                          </h5>
                          <small className="fst-italic">
                            Delicious {item.name}
                          </small>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-0">
          {/* Image Section */}
          <div className="col-md-6">
            <img
              src="/img/TableBook.jpg"
              alt="TableBookIMg"
              className="img-fluid w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Form Section */}
          <div className="col-md-6 bgdark d-flex align-items-center">
            <div className="w-100 p-4">
              <h6 className="reser-heading">Reservation</h6>
              <h1>Book A Table Online</h1>

              <form className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control1"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control1"
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className="col-md-6">
                  <input type="datetime-local" className="form-control1" />
                </div>
                <div className="col-md-6">
                  <select className="form-select" defaultValue="1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control1"
                    rows="3"
                    placeholder="Special Request"
                  ></textarea>
                </div>
                <div className="d-grid gap-2 col-12 mx-auto">
                  <button className="btn btn-warning book-btn" type="button">
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-sm-12">
            <h5 className="food-menu text-center">Team Member</h5>
            <h1 className="master-chef">Our Master Chefs</h1>
          </div>
        </div>

        <div className="row justify-content-center align-items-center">
          <div className="col-lg-12 col-sm-12 mb-4">
            <div className="d-flex justify-content-center align-items-center flex-wrap ">
              <div className="card2">
                <div className="card-body">
                  <div className="img-wrapper">
                    <img
                      src="/img/team-1.jpg"
                      alt="team"
                      className="rounded img-fluid card-img"
                    />
                  </div>
                </div>
                <div className="card-title text-center mt-4">
                  <h4 style={{ color: "black", fontWeight: "600" }}>
                    Sam Churan
                  </h4>
                  <h5 className="text-secondary">Designation</h5>
                </div>
                <div className="social-media-icon d-flex justify-content-center g-2">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <BsTwitterX size={24} />
                  </a>
                </div>
              </div>
              <div className="card2">
                <div className="card-body">
                  <div className="img-wrapper">
                    <img
                      src="/img/team-2.jpg"
                      alt="team"
                      className="rounded img-fluid card-img"
                    />
                  </div>
                </div>
                <div className="card-title text-center mt-4">
                  <h4 style={{ color: "black", fontWeight: "600" }}>
                    Sam Churan
                  </h4>
                  <h5 className="text-secondary">Designation</h5>
                </div>
                <div className="social-media-icon d-flex justify-content-center g-2">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <BsTwitterX size={24} />
                  </a>
                </div>
              </div>
              <div className="card2">
                <div className="card-body">
                  <div className="img-wrapper">
                    <img
                      src="/img/team-3.jpg"
                      alt="team"
                      className="rounded img-fluid card-img"
                    />
                  </div>
                </div>
                <div className="card-title text-center mt-4">
                  <h4 style={{ color: "black", fontWeight: "600" }}>
                    Sam Churan
                  </h4>
                  <h5 className="text-secondary">Designation</h5>
                </div>
                <div className="social-media-icon d-flex justify-content-center g-2">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <BsTwitterX size={24} />
                  </a>
                </div>
              </div>
              <div className="card2">
                <div className="card-body">
                  <div className="img-wrapper">
                    <img
                      src="/img/team-4.jpg"
                      alt="team"
                      className="rounded img-fluid card-img"
                    />
                  </div>
                </div>
                <div className="card-title text-center mt-4">
                  <h4 style={{ color: "black", fontWeight: "600" }}>
                    Sam Churan
                  </h4>
                  <h5 className="text-secondary">Designation</h5>
                </div>
                <div className="social-media-icon d-flex justify-content-center g-2">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    className="social-icon"
                  >
                    <BsTwitterX size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-sm-12">
            <h5 className="food-menu text-center">Testimonial</h5>
            <h1 className="master-chef">Our Clients Say!!!</h1>
          </div>
        </div>
        <div className="row mb-5">
          <div className="testimonial-section">
            <div className="slider-viewport">
              <div
                className="slider-row"
                style={{
                  transform: `translateX(calc(50% - ${
                    (activeIndex + 0.5) * 300
                  }px))`,
                }}
              >
                {testimonials.map((item, index) => (
                  <div
                    key={item.id}
                    className={`slider-card ${
                      index === activeIndex ? "active" : "inactive"
                    }`}
                  >
                    <FaQuoteLeft style={{ fontSize: "2rem" }} />
                    <p>{item.text}</p>
                    <div className="img-wraper d-flex align-items-center gap-4 mt-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="img-client"
                      />
                      <div className="d-flex flex-column">
                        <h5>{item.name}</h5>
                        <p>{item.profession}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="dots mt-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === activeIndex ? "active" : ""}`}
                  onClick={() => handleDotClick(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
