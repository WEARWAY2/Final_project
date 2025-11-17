import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          {/* 404 Number */}
          <div className="error-code">
            <span className="error-number">4</span>
            <span className="error-number middle">0</span>
            <span className="error-number">4</span>
          </div>

          {/* Error Message */}
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-description">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="error-actions">
            <Link to="/" className="btn-primary">
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <FaHome size={20} />
              </motion.div>
              Back to Home
            </Link>
            <Link to="/shop" className="btn-secondary">
              Continue Shopping
            </Link>
          </div>

          {/* Suggestions */}
          <div className="error-suggestions">
            <p className="suggestions-title">You might want to:</p>
            <ul className="suggestions-list">
              <li>
                <Link to="/">Visit our homepage</Link>
              </li>
              <li>
                <Link to="/shop">Browse our shop</Link>
              </li>
              <li>
                <Link to="/shop/men">Check out men's collection</Link>
              </li>
              <li>
                <Link to="/shop/women">Check out women's collection</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
