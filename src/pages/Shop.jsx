import React, { useState } from "react";
import { LuShirt, LuSparkles, LuToyBrick } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      id: "men",
      title: "Men",
      subtitle: "Refined & Sophisticated",
      icon: (
        <LuShirt
          color="#fff"
          size={36}
          style={{ filter: "drop-shadow(0 0 8px #1e3c72)" }}
        />
      ),
      image:
        "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1200&auto=format&fit=crop",
      overlayGradient:
        "linear-gradient(135deg, rgba(30, 60, 114, 0.7) 0%, rgba(42, 82, 152, 0.8) 100%)",
    },
    {
      id: "women",
      title: "Women",
      subtitle: "Elegant & Timeless",
      icon: (
        <LuSparkles
          color="#fff"
          size={36}
          style={{ filter: "drop-shadow(0 0 8px #8e2de2)" }}
        />
      ),
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
      overlayGradient:
        "linear-gradient(135deg, rgba(142, 45, 226, 0.7) 0%, rgba(196, 113, 237, 0.8) 100%)",
    },
    {
      id: "kids",
      title: "Kids",
      subtitle: "Playful & Vibrant",
      icon: (
        <LuToyBrick
          color="#fff"
          size={36}
          style={{ filter: "drop-shadow(0 0 8px #00b4db)" }}
        />
      ),
      image:
        "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=1200&auto=format&fit=crop",
      overlayGradient:
        "linear-gradient(135deg, rgba(0, 180, 219, 0.7) 0%, rgba(0, 131, 176, 0.8) 100%)",
    },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop/${categoryId}`);
  };

  return (
    <div className="shop-hero">
      <div className="shop-hero-background">
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="shop-hero-content">
        <div className="hero-header">
          <h1 className="hero-title">Choose Your Category</h1>
          <p className="hero-subtitle">
            Discover curated collections designed for you
          </p>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`category-item ${
                hoveredCard === category.id ? "hovered" : ""
              }`}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div
                className="category-background"
                style={{
                  backgroundImage: `url(${category.image})`,
                }}
              >
                <div
                  className="category-image-overlay"
                  style={{ background: category.overlayGradient }}
                ></div>
                <div className="category-shimmer"></div>
              </div>

              <div className="category-content">
                <div className="category-icon-wrapper">
                  <span className="category-icon">{category.icon}</span>
                </div>

                <div className="category-text">
                  <h2 className="category-name">{category.title}</h2>
                  <p className="category-tagline">{category.subtitle}</p>
                </div>

                <div className="category-cta">
                  <span className="cta-text">Explore Collection</span>
                  <svg
                    className="cta-arrow"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="category-shine"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
