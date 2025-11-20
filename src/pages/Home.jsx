// Home.jsx - Enhanced Version with Accessibility & Performance

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTruck, FaUndo, FaLock, FaHeadset, FaStar } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import "./Home.css";

// Asset Imports
import heroImage from "../assets/hero.png";
import versaceLogo from "../assets/Group (1).svg";
import zaraLogo from "../assets/zara-logo-1 1.svg";
import gucciLogo from "../assets/gucci-logo-1 1.svg";
import pradaLogo from "../assets/prada-logo-1 1.svg";
import calvinKleinLogo from "../assets/Group.svg";
import { PRODUCTS } from "../config/products";

// ============================================
// AccessibleProductCard Component
// ============================================
const AccessibleProductCard = ({ product, cat, navigate, className = "" }) => {
  const handleClick = () => {
    window.analytics?.track("product_card_clicked", {
      productId: product.id,
      category: cat,
      productName: product.name,
      price: product.price,
    });
    navigate(`/shop/${cat}/${product.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`product-card-home ${className}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`View ${product.name} in ${cat}'s collection, priced at $${product.price}`}
    >
      <div className="p-img">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          srcSet={`${product.image} 480w, ${product.image} 800w`}
          sizes="(max-width: 600px) 48vw, 24vw"
        />
      </div>
      <div className="p-info">
        <h3 className="p-name">{product.name}</h3>
        <div className="p-bottom">
          <span className="p-price">${product.price}</span>
          <span className="p-cat">{cat}</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// NewsletterBand Component
// ============================================
const NewsletterBand = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      // Attempt to call API
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Thanks - check your email!");
        window.analytics?.track("newsletter_subscribed", {
          method: "homepage_band",
          email,
        });
      } else {
        throw new Error("Subscription failed");
      }
    } catch {
      // Fallback to localStorage if API fails
      try {
        const pending = JSON.parse(
          localStorage.getItem("newsletter_pending") || "[]"
        );
        pending.push({ email, timestamp: Date.now() });
        localStorage.setItem("newsletter_pending", JSON.stringify(pending));
        setStatus("success");
        setMessage("Thanks - we will be in touch soon!");
        window.analytics?.track("newsletter_subscribed", {
          method: "homepage_band_offline",
          email,
        });
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return <section></section>;
};

const Home = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Get top selling products (highest rated products from all categories)
  const getTopSellingProducts = () => {
    const allProducts = [
      ...PRODUCTS.men.map((p) => ({ ...p, category: "men" })),
      ...PRODUCTS.women.map((p) => ({ ...p, category: "women" })),
      ...PRODUCTS.kids.map((p) => ({ ...p, category: "kids" })),
    ];

    // Filter products with rating >= 4.5 and sort by rating
    const topRated = allProducts
      .filter((p) => p.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating);

    // Return top 3 products for the grid
    return topRated.slice(0, 3);
  };

  const topSellingProducts = getTopSellingProducts();

  // Reveal-on-scroll animation observer
  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      const elements = document.querySelectorAll(".reveal");
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

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
  }, [prefersReducedMotion]);

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

  const featuredCollections = [
    {
      id: "summer-essentials",
      slug: "summer-essentials",
      title: "Summer Essentials",
      description: "Light & breezy styles for warm days",
      image: PRODUCTS.women[0]?.image || heroImage,
    },
    {
      id: "workwear",
      slug: "workwear",
      title: "Workwear",
      description: "Professional looks that mean business",
      image: PRODUCTS.men[4]?.image || heroImage,
    },
    {
      id: "streetwear",
      slug: "streetwear",
      title: "Streetwear",
      description: "Urban style with attitude",
      image: PRODUCTS.kids[2]?.image || heroImage,
    },
  ];

  const handleHeroCTA = () => {
    window.analytics?.track("hero_cta_clicked", {
      location: "hero_section",
      destination: "/shop",
    });
  };

  const handleCollectionClick = (collection) => {
    window.analytics?.track("featured_collection_clicked", {
      collectionId: collection.id,
      collectionName: collection.title,
      slug: collection.slug,
    });
  };

  return (
    <main role="main" className="home">
      {/* --- Hero Section --- */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">CLOTHES THAT DEFINE YOUR STYLE</h1>
            <p className="hero-description">
              Explore our curated collection of high-quality garments. From
              timeless classics to modern trends, find pieces that bring out
              your individuality.
            </p>
            <Link
              to="/shop"
              className="shop-now-button"
              onClick={handleHeroCTA}
            >
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
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <IoSparkles size={56}  />
              </motion.div>
            </div>
            <div className="star-decoration star-small">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <IoSparkles size={40} />
              </motion.div>
            </div>
            <img
              src={heroImage}
              alt="Fashion model in stylish attire"
              className="hero-img"
              srcSet={`${heroImage} 500w, ${heroImage} 800w`}
              sizes="(max-width: 992px) 90vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* --- Brand Logos Marquee --- */}
      <div className="brand-marquee" aria-label="Our brand partners">
        <div className="marquee-content">
          {[...brandLogos, ...brandLogos].map((logo, index) => (
            <div className="brand-logo" key={index}>
              <img src={logo.src} alt={`${logo.alt} logo`} />
            </div>
          ))}
        </div>
      </div>

      {/* --- Featured Collections Section --- */}
      <section
        className="section featured-collections reveal"
        aria-labelledby="featured-collections-title"
      >
        <div className="container">
          <div className="section-header">
            <h2 id="featured-collections-title" className="section-title">
              Featured Collections
            </h2>
          </div>
          <div className="collections-grid">
            {featuredCollections.map((collection) => (
              <Link
                key={collection.id}
                to={`/shop/collection/${collection.slug}`}
                className="collection-tile"
                onClick={() => handleCollectionClick(collection)}
                aria-label={`Browse ${collection.title} collection: ${collection.description}`}
                style={{ backgroundImage: `url(${collection.image})` }}
              >
                <div className="collection-overlay"></div>
                <div className="collection-content">
                  <h3>{collection.title}</h3>
                  <p>{collection.description}</p>
                  <span className="collection-cta">Explore &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- Top Selling Section --- */}
      <section
        className="section top-selling-section reveal"
        aria-labelledby="top-selling-title"
      >
        <div className="container">
          <div className="section-header">
            <h2 id="top-selling-title" className="section-title">
              Our Top Selling Products
            </h2>
          
          </div>
          <div className="top-selling-grid">
            {topSellingProducts.map((product, index) => {
              const isFeatured = index === 0;

              const handleProductClick = () => {
                window.analytics?.track("top_selling_product_clicked", {
                  productId: product.id,
                  category: product.category,
                  productName: product.name,
                  price: product.price,
                  featured: isFeatured,
                });
                navigate(`/shop/${product.category}/${product.id}`);
              };

              const handleKeyDown = (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleProductClick();
                }
              };

              return (
                <div
                  key={`${product.category}-${product.id}`}
                  className={`selling-card ${isFeatured ? "featured" : ""}`}
                  style={{ backgroundImage: `url(${product.image})` }}
                  role="button"
                  tabIndex={0}
                  onClick={handleProductClick}
                  onKeyDown={handleKeyDown}
                  aria-label={`View ${product.name} from ${
                    product.category
                  }'s collection, rated ${product.rating} stars, priced at $${
                    product.price
                  }${product.discount ? `, ${product.discount}% off` : ""}`}
                >
                  <div className="selling-card-overlay"></div>
                  <div className="selling-card-content">
                    <div className="selling-card-badge">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{ display: "inline-flex" }}
                      >
                        <FaStar size={16} color="#FFD700" />
                      </motion.div>
                      <span>{product.rating}</span>
                    </div>
                    <h3>{product.name}</h3>
                    <p className="selling-card-category">
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                      's Collection
                    </p>
                    <div className="selling-card-pricing">
                      <p className="selling-card-price">${product.price}</p>
                      {product.originalPrice && (
                        <p className="selling-card-original-price">
                          ${product.originalPrice}
                        </p>
                      )}
                    </div>
                    {product.discount && (
                      <span className="selling-card-discount">
                        -{product.discount}% OFF
                      </span>
                    )}
                    {isFeatured && (
                      <button
                        className="selling-card-cta"
                        aria-label={`Shop ${product.name} now`}
                      >
                        Shop Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- New Arrivals Section --- */}
      <section
        className="section arrivals reveal"
        aria-labelledby="new-arrivals-title"
      >
        <div className="container">
          <div className="section-header">
            <h2 id="new-arrivals-title" className="section-title">
              New Arrivals
            </h2>
          </div>
          <div className="arrivals-grid">
            {sampleArrivals.map((p) => (
              <AccessibleProductCard
                key={`${p.cat}-${p.id}`}
                product={p}
                cat={p.cat}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- Enhanced Perks Section (Recreated UI) --- */}
      <section
        className="section perks-section reveal"
        aria-labelledby="perks-title"
        role="region"
      >
        <div className="container">
          <div className="perks-header">
            <h2 id="perks-title" className="perks-title">
              Why Shop With Us?
            </h2>
            <p className="perks-subtitle">
              Premium experience, trusted policies, and fast service.
            </p>
          </div>

          <div className="perks-grid" role="list">
            {/* Free Shipping */}
            <div
              className="perk-card"
              role="listitem"
              aria-label="Free shipping on orders over $100"
            >
              <div className="perk-icon-wrapper" aria-hidden="true">
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaTruck size={28} />
                </motion.div>
              </div>
              <h4 className="perk-card-title">Free Shipping</h4>
              <p className="perk-card-description">
                Free on orders over $100 — quick, reliable delivery.
              </p>
            </div>

            {/* Easy Returns */}
            <div
              className="perk-card"
              role="listitem"
              aria-label="30-day hassle-free returns"
            >
              <div className="perk-icon-wrapper" aria-hidden="true">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <FaUndo size={28} />
                </motion.div>
              </div>
              <h4 className="perk-card-title">30-Day Returns</h4>
              <p className="perk-card-description">
                Changed your mind? Send it back within 30 days.
              </p>
            </div>

            {/* Secure Checkout */}
            <div
              className="perk-card"
              role="listitem"
              aria-label="Secure checkout with encryption"
            >
              <div className="perk-icon-wrapper" aria-hidden="true">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaLock size={28} />
                </motion.div>
              </div>
              <h4 className="perk-card-title">Secure Checkout</h4>
              <p className="perk-card-description">
                SSL-encrypted payments to keep your data safe.
              </p>
            </div>

            {/* 24/7 Support */}
            <div
              className="perk-card"
              role="listitem"
              aria-label="24/7 customer support"
            >
              <div className="perk-icon-wrapper" aria-hidden="true">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaHeadset size={28} />
                </motion.div>
              </div>
              <h4 className="perk-card-title">24/7 Support</h4>
              <p className="perk-card-description">
                We're here anytime via chat or email if you need help.
              </p>
            </div>
          </div>
        </div>
      </section>
      <NewsletterBand />
    </main>
  );
};

export default Home;
