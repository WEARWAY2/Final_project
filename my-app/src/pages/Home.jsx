// Home.jsx - Enhanced Version

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

// Asset Imports
import heroImage from "../assets/hero.png";
import versaceLogo from "../assets/Group (1).svg";
import zaraLogo from "../assets/zara-logo-1 1.svg";
import gucciLogo from "../assets/gucci-logo-1 1.svg";
import pradaLogo from "../assets/prada-logo-1 1.svg";
import calvinKleinLogo from "../assets/Group.svg";
import { PRODUCTS } from "../config/products";

// Sample Data for New Sections
const topSellingProducts = [
  { id: 1, name: "The Classic Trench", category: "Women's Outerwear", image: PRODUCTS.women[2]?.image || PRODUCTS.women[0]?.image, size: 'large' },
  { id: 2, name: "Linen Shirt", category: "Men's Casual", image: PRODUCTS.men[3]?.image || PRODUCTS.men[0]?.image, size: 'small' },
  { id: 3, name: "Graphic Hoodie", category: "Kid's Collection", image: PRODUCTS.kids[1]?.image || PRODUCTS.kids[0]?.image, size: 'small' },
];

const Home = () => {
  const navigate = useNavigate();

  // Reveal-on-scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const sampleArrivals = [
    { cat: "men", ...PRODUCTS.men[0] },
    { cat: "women", ...PRODUCTS.women[0] },
    { cat: "men", ...PRODUCTS.men[2] },
    { cat: "kids", ...PRODUCTS.kids[0] },
  ];

  const brandLogos = [
    { src: versaceLogo, alt: "VERSACE" },
    { src: zaraLogo, alt: "ZARA" },
    { src: gucciLogo, alt: "GUCCI" },
    { src: pradaLogo, alt: "PRADA" },
    { src: calvinKleinLogo, alt: "Calvin Klein" },
  ];

  return (
    <div className="home">
      {/* --- Hero Section --- */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              CLOTHES THAT
                

              DEFINE YOUR
                

              STYLE
            </h1>
            <p className="hero-description">
              Explore our curated collection of high-quality garments. From timeless classics to modern trends, find pieces that bring out your individuality.
            </p>
            <Link to="/shop" className="shop-now-button">
              Shop Now &rarr;
            </Link>
            <div className="hero-stats">
              <div className="stat-item">
                <h3 className="stat-number">200+</h3>
                <p className="stat-label">International Brands</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <h3 className="stat-number">2,000+</h3>
                <p className="stat-label">High-Quality Products</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <h3 className="stat-number">30,000+</h3>
                <p className="stat-label">Happy Customers</p>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="star-decoration star-top">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 0L32.6 23.4L56 28L32.6 32.6L28 56L23.4 32.6L0 28L23.4 23.4L28 0Z" fill="black"/></svg>
            </div>
            <div className="star-decoration star-small">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 0L23.2857 16.7143L40 20L23.2857 23.2857L20 40L16.7143 23.2857L0 20L16.7143 16.7143L20 0Z" fill="black"/></svg>
            </div>
            <img src={heroImage} alt="Fashion model in stylish attire" className="hero-img" />
          </div>
        </div>
      </section>

      {/* --- Brand Logos Marquee --- */}
      <div className="brand-marquee">
        <div className="marquee-content">
          {[...brandLogos, ...brandLogos].map((logo, index ) => (
            <div className="brand-logo" key={index}>
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>

      {/* --- New Arrivals Section --- */}
      <section className="section arrivals reveal">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link className="link-all" to="/shop">View All</Link>
          </div>
          <div className="arrivals-grid">
            {sampleArrivals.map((p) => (
              <div key={`${p.cat}-${p.id}`} className="product-card-home" onClick={() => navigate(`/shop/${p.cat}/${p.id}`)}>
                <div className="p-img">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <div className="p-info">
                  <h3 className="p-name">{p.name}</h3>
                  <div className="p-bottom">
                    <span className="p-price">${p.price}</span>
                    <span className="p-cat">{p.cat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Top Selling Section (NEW) --- */}
      <section className="section top-selling-section reveal">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Top Selling This Week</h2>
          </div>
          <div className="top-selling-grid">
            {topSellingProducts.map(p => (
              <div key={p.id} className={`selling-card ${p.size}`} style={{ backgroundImage: `url(${p.image})` }}>
                <div className="selling-card-content">
                  <h3>{p.name}</h3>
                  <p>{p.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Featured Categories Section --- */}
      <section className="section categories reveal">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <div className="categories-grid">
            {[
              { key: "men", label: "Men", bg: PRODUCTS.men[1].image },
              { key: "women", label: "Women", bg: PRODUCTS.women[0].image },
              { key: "kids", label: "Kids", bg: PRODUCTS.kids[0].image },
            ].map((c) => (
              <Link key={c.key} to={`/shop/${c.key}`} className="category-card" style={{ backgroundImage: `url(${c.bg})` }}>
                <div className="category-overlay" />
                <div className="category-label">{c.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      // Home.jsx - Enhanced Perks Section

// ... inside your Home component's return statement

{/* --- Enhanced Perks Section --- */}
<section className="section perks-section reveal">
  <div className="container">
    <div className="perks-header">
      <h2 className="perks-title">Why Shop With Us?</h2>
      <p className="perks-subtitle">
        We provide the best experience for our customers.
      </p>
    </div>
    <div className="perks-grid">
      {/* Perk 1: Free Shipping */}
      <div className="perk-card">
        <div className="perk-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/>
            <path d="M14 9h4l4 4v4h-8v-8Z"/>
            <circle cx="7.5" cy="18.5" r="2.5"/>
            <circle cx="17.5" cy="18.5" r="2.5"/>
          </svg>
        </div>
        <h4 className="perk-card-title">Free Shipping</h4>
        <p className="perk-card-description">Enjoy free shipping on all orders over $100, delivered right to your door.</p>
      </div>

      {/* Perk 2: Easy Returns */}
      <div className="perk-card">
        <div className="perk-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5"/>
            <path d="M21 3 8.5 15.5"/>
            <path d="M12 21a9 9 0 1 1 0-18"/>
          </svg>
        </div>
        <h4 className="perk-card-title">30-Day Returns</h4>
        <p className="perk-card-description">Not a perfect fit? No problem. We offer a 30-day money-back guarantee.</p>
      </div>

      {/* Perk 3: Secure Checkout */}
      <div className="perk-card">
        <div className="perk-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h4 className="perk-card-title">Secure Checkout</h4>
        <p className="perk-card-description">Your payments are 100% secure with our SSL-encrypted checkout process.</p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
