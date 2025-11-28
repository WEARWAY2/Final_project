import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTruck, FaCheckCircle, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import "./TrackOrder.css";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState("");

  // Mock Data Database
  const mockOrders = {
    "ORD-001": {
      id: "ORD-001",
      status: "Delivered",
      estimatedDelivery: "Delivered on Nov 20, 2025",
      steps: [
        {
          title: "Order Placed",
          description: "Your order has been received",
          date: "Nov 15, 2025 - 10:30 AM",
          completed: true,
          icon: <FaCheckCircle size={16} />,
        },
        {
          title: "Processing",
          description: "Your order is being prepared",
          date: "Nov 16, 2025 - 02:15 PM",
          completed: true,
          icon: <FaClock size={16} />,
        },
        {
          title: "Shipped",
          description: "Your order is on the way",
          date: "Nov 17, 2025 - 09:45 AM",
          completed: true,
          icon: <FaTruck size={16} />,
        },
        {
          title: "Delivered",
          description: "Package delivered to recipient",
          date: "Nov 20, 2025 - 01:30 PM",
          completed: true,
          active: true,
          icon: <FaMapMarkerAlt size={16} />,
        },
      ],
    },
    "ORD-002": {
      id: "ORD-002",
      status: "In Transit",
      estimatedDelivery: "Nov 30, 2025",
      steps: [
        {
          title: "Order Placed",
          description: "Your order has been received",
          date: "Nov 25, 2025 - 10:30 AM",
          completed: true,
          icon: <FaCheckCircle size={16} />,
        },
        {
          title: "Processing",
          description: "Your order is being prepared",
          date: "Nov 26, 2025 - 02:15 PM",
          completed: true,
          icon: <FaClock size={16} />,
        },
        {
          title: "Shipped",
          description: "Your order is on the way",
          date: "Nov 27, 2025 - 09:45 AM",
          completed: true,
          icon: <FaTruck size={16} />,
        },
        {
          title: "Out for Delivery",
          description: "Arriving soon",
          date: "Expected Nov 30, 2025",
          completed: false,
          active: true,
          icon: <FaMapMarkerAlt size={16} />,
        },
      ],
    },
    "ORD-003": {
      id: "ORD-003",
      status: "Processing",
      estimatedDelivery: "Dec 05, 2025",
      steps: [
        {
          title: "Order Placed",
          description: "Your order has been received",
          date: "Nov 28, 2025 - 08:00 AM",
          completed: true,
          icon: <FaCheckCircle size={16} />,
        },
        {
          title: "Processing",
          description: "Your order is being prepared",
          date: "Nov 28, 2025 - 09:30 AM",
          completed: false,
          active: true,
          icon: <FaClock size={16} />,
        },
        {
          title: "Shipped",
          description: "Your order is on the way",
          date: "Pending",
          completed: false,
          icon: <FaTruck size={16} />,
        },
        {
          title: "Out for Delivery",
          description: "Arriving soon",
          date: "Pending",
          completed: false,
          icon: <FaMapMarkerAlt size={16} />,
        },
      ],
    },
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsSearching(true);
    setOrderStatus(null);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      const result = mockOrders[orderId.trim()];
      
      if (result) {
        setOrderStatus(result);
      } else {
        setError("Order ID not found. Please check your ID and try again.");
      }
    }, 1500);
  };

  return (
    <div className="track-order-container">
      <div className="track-hero">
        <div className="track-hero-background"></div>
        <div className="track-hero-overlay"></div>
        <div className="track-hero-content">
          <motion.h1 
            className="track-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Track Your Order
          </motion.h1>
          <motion.p 
            className="track-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Enter your order ID to see the current status of your shipment
          </motion.p>
        </div>
      </div>

      <div className="track-form-section">
        <motion.div 
          className="track-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form className="track-form" onSubmit={handleTrack}>
            <div className="form-group">
              <label className="form-label">Order ID</label>
              <div className="form-input-wrapper">
                <FaSearch className="input-icon" size={20} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., ORD-12345-XYZ"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="track-button"
              disabled={isSearching || !orderId.trim()}
            >
              {isSearching ? "Searching..." : "Track Order"}
            </button>
            
            {error && (
              <motion.p 
                className="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}
          </form>

          <AnimatePresence>
            {orderStatus && (
              <motion.div 
                className="track-result"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="status-timeline">
                  {orderStatus.steps.map((step, index) => (
                    <motion.div 
                      key={index}
                      className={`status-step ${step.completed ? "completed" : ""} ${step.active ? "active" : ""}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="step-icon">
                        {step.icon}
                      </div>
                      <div className="step-content">
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                        <span className="step-date">{step.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackOrder;
