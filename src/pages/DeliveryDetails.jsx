import React from "react";
import { motion } from "framer-motion";
import "./InfoPage.css";

const DeliveryDetails = () => {
  const sections = [
    {
      title: "Shipping Policy",
      content: (
        <>
          <p>
            At WearWay, we strive to deliver your order as quickly and efficiently as possible. 
            We partner with reliable courier services to ensure your items arrive safely at your doorstep.
          </p>
          <p>
            Orders are processed within 1-2 business days. Once shipped, you will receive a confirmation email with tracking information.
          </p>
        </>
      ),
    },
    {
      title: "Delivery Times",
      content: (
        <>
          <p>Estimated delivery times vary based on your location:</p>
          <ul>
            <li><strong>Standard Shipping:</strong> 3-5 business days</li>
            <li><strong>Express Shipping:</strong> 1-2 business days</li>
            <li><strong>International Shipping:</strong> 7-14 business days</li>
          </ul>
          <p>
            Please note that delivery times may be affected by holidays, weather conditions, and carrier delays.
          </p>
        </>
      ),
    },
    {
      title: "Shipping Costs",
      content: (
        <>
          <p>
            We offer free standard shipping on all orders over $100. For orders under $100, a flat rate of $9.99 applies.
          </p>
          <p>
            Express shipping is available for an additional fee calculated at checkout based on your location and order weight.
          </p>
        </>
      ),
    },
    {
      title: "International Shipping",
      content: (
        <>
          <p>
            We ship to select international destinations. International orders may be subject to import duties and taxes, which are the responsibility of the recipient.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="info-page-container">
      <div className="info-hero">
        <div 
          className="info-hero-background"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop")' }}
        ></div>
        <div className="info-hero-overlay"></div>
        <div className="info-hero-content">
          <motion.h1 
            className="info-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Delivery Details
          </motion.h1>
          <motion.p 
            className="info-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about getting your order
          </motion.p>
        </div>
      </div>

      <div className="info-content">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="info-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2>{section.title}</h2>
            {section.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryDetails;
