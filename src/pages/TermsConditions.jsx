import React from "react";
import { motion } from "framer-motion";
import "./InfoPage.css";

const TermsConditions = () => {
  const sections = [
    {
      title: "Introduction",
      content: (
        <p>
          Welcome to WearWay. By accessing our website and using our services, you agree to be bound by the following terms and conditions. 
          Please read them carefully before making a purchase.
        </p>
      ),
    },
    {
      title: "Use of Website",
      content: (
        <p>
          You may use our website only for lawful purposes. You are prohibited from using the site to transmit any material that is 
          unlawful, threatening, libelous, defamatory, obscene, or otherwise objectionable.
        </p>
      ),
    },
    {
      title: "Product Information",
      content: (
        <p>
          We make every effort to display as accurately as possible the colors and images of our products. 
          However, we cannot guarantee that your computer monitor's display of any color will be accurate.
          All descriptions of products or product pricing are subject to change at anytime without notice.
        </p>
      ),
    },
    {
      title: "Pricing and Payment",
      content: (
        <p>
          Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service 
          (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, 
          price change, suspension or discontinuance of the Service.
        </p>
      ),
    },
    {
      title: "Returns and Refunds",
      content: (
        <p>
          Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.
          To be eligible for a return, your item must be unused and in the same condition that you received it.
        </p>
      ),
    },
    {
      title: "Limitation of Liability",
      content: (
        <p>
          In no case shall WearWay, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors 
          be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.
        </p>
      ),
    },
  ];

  return (
    <div className="info-page-container">
      <div className="info-hero">
        <div 
          className="info-hero-background"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop")' }}
        ></div>
        <div className="info-hero-overlay"></div>
        <div className="info-hero-content">
          <motion.h1 
            className="info-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Terms & Conditions
          </motion.h1>
          <motion.p 
            className="info-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Please read our terms carefully
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

export default TermsConditions;
