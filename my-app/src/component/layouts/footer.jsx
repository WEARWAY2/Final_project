import React from "react";
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4H17C18.1 4 19 4.9 19 6V14C19 15.1 18.1 16 17 16H3C1.9 16 1 15.1 1 14V6C1 4.9 1.9 4 3 4Z"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 6L10 11L1 6"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
            <h3 className="footer-logo">SHOP.CO</h3>
            <p className="company-description">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="GitHub">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
          <p className="copyright">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="payment-methods">
            <img src="/visa.svg" alt="Visa" className="payment-icon" />
            <img
              src="/mastercard.svg"
              alt="Mastercard"
              className="payment-icon"
            />
            <img src="/paypal.svg" alt="PayPal" className="payment-icon" />
            <img src="/applepay.svg" alt="Apple Pay" className="payment-icon" />
            <img
              src="/googlepay.svg"
              alt="Google Pay"
              className="payment-icon"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
