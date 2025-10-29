import React from "react";
import { useNavigate } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "men",
      title: "Men",
      description: "Explore our collection of men's fashion",
      image: "/men-category.jpg",
    },
    {
      id: "women",
      title: "Women",
      description: "Discover stylish women's clothing",
      image: "/women-category.jpg",
    },
    {
      id: "kids",
      title: "Kids",
      description: "Find trendy outfits for kids",
      image: "/kids-category.jpg",
    },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop/${categoryId}`);
  };

  return (
    <div className="shop-page">
      <div className="shop-container">
        <h1 className="shop-title">Shop by Category</h1>
        <p className="shop-description">
          Choose your preferred category to explore our collection
        </p>

        <div className="category-cards">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="category-image">
                <div className="category-overlay">
                  <h2 className="category-title">{category.title}</h2>
                  <p className="category-desc">{category.description}</p>
                  <button className="category-button">Shop Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
