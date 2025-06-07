import React from 'react'

const Contact = () => {
  return (
    <>
      <div class="container mt-5">
    <h2 class="text-center mb-4">Contact Us</h2>

    <div class="row">
     
      <div class="col-md-6 mb-4">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Your Name</label>
            <input type="text" class="form-control" id="name" placeholder="Enter your name" required/>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Your Email</label>
            <input type="email" class="form-control" id="email" placeholder="Enter your email" required/>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">Your Message</label>
            <textarea class="form-control" id="message" rows="5" placeholder="Write your message..." required></textarea>
          </div>

          <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
      </div>

     
      <div class="col-md-6">
        <h5>Our Location</h5>
        <p>
          Shree Aaiji Resotrant, Bypass Road,<br />
          Raipruiya, Madhya Pradesh, 457775<br />
          Phone: +91-7047916634<br />
          Email: ShreeAaijiImfo@gmail.com
        </p>

        <div class="ratio ratio-16x9">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.4356350476836!2d75.8579472154317!3d22.71956888510833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd35c683cd87%3A0xf0436445c46034e3!2sRajwada%2C%20Indore%2C%20Madhya%20Pradesh%20452001!5e0!3m2!1sen!2sin!4v1687950409255!5m2!1sen!2sin"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
      
    </>
  )
}

export default Contact
