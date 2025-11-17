import React from "react";
import { motion } from 'framer-motion';
import { FaPaypal, FaCcMastercard, FaApplePay, FaCcVisa, FaGooglePay, FaEnvelope, FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import "./footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter Section */}
        <div className="newsletter-section">
          <h2 className="newsletter-title">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="newsletter-form">
            <div className="email-input-wrapper">
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaEnvelope size={20} color="#666" />
              </motion.div>
              <input
                type="email"
                placeholder="Enter your email address"
                className="email-input"
              />
            </div>
            <button className="subscribe-button">
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-column company-info">
            <h3 className="footer-logo">WearWay</h3>
            <p className="company-description">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Twitter">
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <FaTwitter size={24} />
                </motion.div>
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                  <FaFacebook size={24} />
                </motion.div>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <FaInstagram size={24} />
                </motion.div>
              </a>
              <a href="#" className="social-icon" aria-label="GitHub">
                <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                  <FaGithub size={24} />
                </motion.div>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="footer-column">
            <h4 className="footer-heading">COMPANY</h4>
            <ul className="footer-links">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#works">Works</a>
              </li>
              <li>
                <a href="#career">Career</a>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div className="footer-column">
            <h4 className="footer-heading">HELP</h4>
            <ul className="footer-links">
              <li>
                <a href="#customer-support">Customer Support</a>
              </li>
              <li>
                <a href="#delivery">Delivery Details</a>
              </li>
              <li>
                <a href="#terms">Terms & Conditions</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* FAQ Links */}
          <div className="footer-column">
            <h4 className="footer-heading">FAQ</h4>
            <ul className="footer-links">
              <li>
                <a href="#account">Account</a>
              </li>
              <li>
                <a href="#manage-deliveries">Manage Deliveries</a>
              </li>
              <li>
                <a href="#orders">Orders</a>
              </li>
              <li>
                <a href="#payments">Payments</a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="footer-column">
            <h4 className="footer-heading">RESOURCES</h4>
            <ul className="footer-links">
              <li>
                <a href="#ebooks">Free eBooks</a>
              </li>
              <li>
                <a href="#tutorial">Development Tutorial</a>
              </li>
              <li>
                <a href="#blog">How to - Blog</a>
              </li>
              <li>
                <a href="#playlist">Youtube Playlist</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">WearWay © 2025, All Rights Reserved</p>
          <div className="payment-methods">
            <FaCcVisa className="payment-icon" aria-label="Visa" />
            <FaCcMastercard className="payment-icon" aria-label="Mastercard" />
            <FaPaypal className="payment-icon" aria-label="PayPal" />
            <FaApplePay className="payment-icon" aria-label="Apple Pay" />
            <FaGooglePay className="payment-icon" aria-label="Google Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
