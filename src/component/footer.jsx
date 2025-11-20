import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaypal,
  FaCcMastercard,
  FaApplePay,
  FaCcVisa,
  FaGooglePay,
  FaEnvelope,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaCheckCircle,
} from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsAnimating(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter Section */}
        <AnimatePresence mode="wait">
          {!isSubscribed ? (
            <motion.div
              key="subscribe-form"
              className="newsletter-section"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="newsletter-title">
                STAY UPTO DATE ABOUT OUR LATEST OFFERS
              </h2>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <div className="email-input-wrapper">
                  <AnimatePresence>
                    {!isAnimating && (
                      <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ x: [0, 3, 0] }}
                        exit={{
                          x: 150,
                          y: -10,
                          scale: 1.2,
                          rotate: 15,
                          opacity: 0,
                        }}
                        transition={{
                          x: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          exit: { duration: 0.6, ease: "easeOut" },
                        }}
                      >
                        <FaEnvelope size={20} color="#666" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isAnimating}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="subscribe-button"
                  disabled={isAnimating}
                >
                  <AnimatePresence mode="wait">
                    {isAnimating ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <motion.div
                          animate={{
                            x: [0, 300],
                            y: [0, -80],
                            rotate: [0, 360],
                            scale: [1, 1.5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            times: [0, 0.6, 1],
                          }}
                        >
                          <FaEnvelope size={20} />
                        </motion.div>
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="subscribe"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Subscribe to Newsletter
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="subscribed-message"
              className="newsletter-section subscribed-state"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <FaCheckCircle size={48} color="#22c55e" />
              </motion.div>
              <h2 className="newsletter-title">Thank You for Subscribing!</h2>
              <p className="subscribed-message">
                We'll be with you on your style journey. Stay tuned for
                exclusive offers and updates!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-column company-info">
            <img
              src={
                theme === "dark"
                  ? import.meta.env.BASE_URL + "src/assets/logo.png"
                  : import.meta.env.BASE_URL + "src/assets/logo_black.png"
              }
              alt="WearWay Logo"
              className="footer-logo"
              style={{ width: 120, height: "auto" }}
            />
            <p className="company-description">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Twitter">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTwitter size={24} />
                </motion.div>
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFacebook size={24} />
                </motion.div>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaInstagram size={24} />
                </motion.div>
              </a>
              <a href="#" className="social-icon" aria-label="GitHub">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
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
          <p className="copyright">WearWay &copy; 2025, All Rights Reserved</p>
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
