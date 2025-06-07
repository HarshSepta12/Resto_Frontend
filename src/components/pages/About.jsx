import './About.css'
import { IoRestaurant } from "react-icons/io5";
import "./About.css"
import "./Home.css"

const About = () => {
  return (
    <>
      <div className="container">
          <div className="row text-dark p-5">
                   <div className="col-md-6">
                     <div className="row g-3">
                       <div className="col-6 text-start">
                         <div className="about-img1">
                          <img src="/img/about-1.jpg" className='fluid rounded' alt="about1" style={{width: "300px"}}/>

                         </div>
                       </div>
         
                       <div className="col-6 text-start">
                         <div className="about-img2">
                           <img
                             className="img-fluid rounded w-75"
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
                       Welcome to <IoRestaurant style={{ color: "#FEA116" }} /> Shree Aaji Restaurant – A Taste of Tradition
                     </h1>
                     <p className="text-dark">
                      Located in Raipuriya (Tehsil Petlawad, District Jhabua, Madhya Pradesh), Shree Aaji Restaurant is a family-friendly dining destination offering a delightful mix of authentic flavors and warm hospitality. We are committed to serving delicious, high-quality food that feels just like home.
                     </p>
                     <p className="mt-4 text-dark">
                       Our diverse menu features a variety of cuisines, including flavorful North Indian, aromatic South Indian, and rich Punjabi dishes. In addition to full meals, we also serve light snacks, street-style treats, and popular Chinese dishes like noodles, Manchurian, and spring rolls – all freshly prepared with quality ingredients and traditional recipes.
                     </p>

                     <p className="text-dark">At Shree Aaji Restaurant, cleanliness, taste, and friendly service are at the heart of everything we do. Whether you’re looking for a quick bite, a family meal, or a place to hang out with friends, we offer the perfect setting for every occasion.</p>
                             <p className="text-dark">Come visit us and experience the rich flavors of India in a cozy and welcoming environment. We look forward to serving you!</p>
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
         
                     <button className="Read-btn">Read More</button>
                   </div>
                 </div>
      </div>
    </>
  )
}

export default About
