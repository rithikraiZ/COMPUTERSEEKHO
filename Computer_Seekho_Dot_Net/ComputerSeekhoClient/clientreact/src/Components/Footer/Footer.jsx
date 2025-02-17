import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Information */}
        <div className="footer-section brand-info">
          <h2>EDUSITY</h2>
          <p>Empowering learners worldwide with quality courses. Join us to start your journey of knowledge and growth.</p>
          <img src="/path-to-logo.png" alt="Computer Seekho Logo" className="footer-logo" />
        </div>

        {/* Navigation Links */}
        <div className="footer-section navigation">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/batchwiseplacement">Batchwise Placement</Link></li>
            <li><Link to="/ourrecruiters">Our Recruiters</Link></li>
            <li><Link to="/campuslife">Campus Life</Link></li>
            <li><Link to="/faculty">Faculty</Link></li>
            <li><Link to="/getintouch">Get In Touch</Link></li> {/* Normal link */}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:support@SMVita.com">support@SMVita.com</a></p>
          <p>Phone: +91-9876543210</p>
          <p>Address: Mumbai, India</p>
          <p>Business Hours: 9 AM - 6 PM IST</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook<i className="fab fa-facebook"></i></a><br />
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter<i className="fab fa-twitter"></i></a><br />
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Linkedin<i className="fab fa-linkedin"></i></a><br />
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram<i className="fab fa-instagram"></i></a><br />
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Youtube<i className="fab fa-youtube"></i></a><br />
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="footer-section dynamic-content">
          <h3>Trending Courses</h3>
          <ul>
            <li><Link to="/pg-dac">PG DAC</Link></li>
            <li><Link to="/pg-dbda">PG DBDA</Link></li>
            <li><Link to="/pre-cat">PRE-CAT</Link></li>
          </ul>
          <h3>Upcoming Events</h3>
          <p>Join our next webinar: "Future of Online Learning" - Jan 30th, 2025</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Computer Seekho. All Rights Reserved.</p>
        <p>100% Secure Payments | SSL Certified</p>
      </div>
    </footer>
  );
};

export default Footer;