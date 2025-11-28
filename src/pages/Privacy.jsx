import React from "react";
import { motion } from "framer-motion";
import "./InfoPage.css";

const Privacy = () => {
  const sections = [
    {
      title: "Privacy Commitment",
      content: (
        <p>
          At WearWay, we are committed to protecting your privacy. We understand that your personal information is important to you, 
          and we want you to feel confident that your data is safe with us.
        </p>
      ),
    },
    {
      title: "Information We Collect",
      content: (
        <>
          <p>We collect information that you provide directly to us, such as when you create an account, make a purchase, or sign up for our newsletter.</p>
          <p>This may include:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Billing and shipping addresses</li>
            <li>Payment information (processed securely by third-party providers)</li>
            <li>Order history and preferences</li>
          </ul>
        </>
      ),
    },
    {
      title: "How We Use Your Information",
      content: (
        <>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your account and orders</li>
            <li>Send you marketing communications (if you have opted in)</li>
            <li>Improve our website and customer service</li>
            <li>Detect and prevent fraud</li>
          </ul>
        </>
      ),
    },
    {
      title: "Data Security",
      content: (
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. 
          Your personal information is contained behind secured networks and is only accessible by a limited number of persons 
          who have special access rights to such systems.
        </p>
      ),
    },
    {
      title: "Cookies",
      content: (
        <p>
          We use cookies to enhance your experience on our website. Cookies are small files that a site or its service provider transfers 
          to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems 
          to recognize your browser and capture and remember certain information.
        </p>
      ),
    },
    {
      title: "Third-Party Disclosure",
      content: (
        <p>
          We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. 
          This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users.
        </p>
      ),
    },
  ];

  return (
    <div className="info-page-container">
      <div className="info-hero">
        <div 
          className="info-hero-background"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop")' }}
        ></div>
        <div className="info-hero-overlay"></div>
        <div className="info-hero-content">
          <motion.h1 
            className="info-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            className="info-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            How we handle and protect your data
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

export default Privacy;
