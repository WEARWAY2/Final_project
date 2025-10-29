import React from "react";
import "./Home.css";
import heroImage from "../assets/hero.png";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          {/* Left Content */}
          <div className="hero-content">
            <h1 className="hero-title">
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h1>
            <p className="hero-description">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <button className="shop-now-button">Shop Now</button>

            {/* Stats */}
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

          {/* Right Image */}
          <div className="hero-image">
            <div className="hero-image-wrapper">
              {/* Decorative Stars */}
              <div className="star-decoration star-top">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 0L32.6 23.4L56 28L32.6 32.6L28 56L23.4 32.6L0 28L23.4 23.4L28 0Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="star-decoration star-small">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 0L23.2857 16.7143L40 20L23.2857 23.2857L20 40L16.7143 23.2857L0 20L16.7143 16.7143L20 0Z"
                    fill="black"
                  />
                </svg>
              </div>

              {/* Placeholder for hero image */}
              <div className="hero-img-placeholder">
                <img
                  src={heroImage}
                  alt="Fashion models wearing stylish clothes"
                  className="hero-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
