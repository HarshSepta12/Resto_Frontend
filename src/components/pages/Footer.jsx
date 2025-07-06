import React from "react";
import "../pages/Footer.css";
import { IoIosArrowForward } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="container-fluid footer">
        <div className="row p-5 bgFooter">
          <div className="col-sm-4">
            <div className="comp">
              <h6 className="company-heading">Company</h6>
            </div>
            <div className="li">
              <a href="">
                <IoIosArrowForward />
                Contact Us
              </a>
              <a href="">
                <IoIosArrowForward />
                About Us
              </a>
              <a href="">
                <IoIosArrowForward />
                Reservation
              </a>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="comp">
              <h6 className="company-heading">Contact</h6>
            </div>
            <div className="li">
              <a href="https://maps.app.goo.gl/JdQJG2QHJVYgSeLa9">
                <FaLocationDot />
                Raipuriya Rajgrah Road Techsil Petlwad Jhabua 45775
              </a>
              <a href="tel:7047916634">
                <IoCall />
                7047916634
              </a>
              <a href="mailto:harshservi48@gmail.com">
                <IoMdMail />
                harshservi48@gmail.com
              </a>
              <div className="d-flex justify-content-center align-items-center text-light gap-3">
                <FaSquareXTwitter />
                <FaLinkedin />
                <FaFacebook />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="comp">
              <h6 className="company-heading">Opening</h6>
            </div>
            <div className="li text-light">
              <span>Monday - Saturday</span>
              <span>9AM to 12PM</span>
              <span>Sunday</span>
              <span>10AM to 10PM</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
