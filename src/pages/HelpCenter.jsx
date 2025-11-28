import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./HelpCenter.css";

const HelpCenter = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting the 'Track Order' page and entering your Order ID. You will see real-time updates on your shipment status."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in their original condition. Please visit our Terms & Conditions page for more details."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to select international destinations. Shipping times and costs vary depending on the location."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team via email at support@wearway.com or by calling +1 (555) 123-4567. We are available Mon-Fri, 9 AM - 6 PM EST."
    },
    {
      question: "Can I change or cancel my order?",
      answer: "Orders can be changed or canceled within 24 hours of placement. Please contact us immediately if you need to make changes."
    }
  ];

  return (
    <div className="help-center-container">
      <div className="help-hero">
        <div className="help-hero-background"></div>
        <div className="help-hero-overlay"></div>
        <div className="help-hero-content">
          <motion.h1 
            className="help-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Help Center
          </motion.h1>
          <motion.p 
            className="help-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're here to help. Find answers to common questions or get in touch.
          </motion.p>
        </div>
      </div>

      <div className="help-content">
        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button 
                  className={`faq-question ${activeIndex === index ? "active" : ""}`}
                  onClick={() => toggleAccordion(index)}
                >
                  {faq.question}
                  <FaChevronDown className="faq-icon" />
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="faq-answer"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="contact-section">
          <h2 className="contact-title">Still need help?</h2>
          <p className="contact-text">Our support team is just a click away.</p>
          
          <div className="contact-grid">
            <motion.div 
              className="contact-card"
              whileHover={{ y: -5 }}
            >
              <FaEnvelope size={32} className="contact-icon" />
              <h4>Email Us</h4>
              <p>support@wearway.com</p>
            </motion.div>
            
            <motion.div 
              className="contact-card"
              whileHover={{ y: -5 }}
            >
              <FaPhone size={32} className="contact-icon" />
              <h4>Call Us</h4>
              <p>+20123456789</p>
            </motion.div>
            
            <motion.div 
              className="contact-card"
              whileHover={{ y: -5 }}
            >
              <FaMapMarkerAlt size={32} className="contact-icon" />
              <h4>Visit Us</h4>
              <p>123 XXXX XXX, XX</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
