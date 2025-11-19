import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useCart } from "../context/CartContext";
import "./CategoryProducts.css";
import { PRODUCTS } from "../config/products";

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null); // "new-arrivals", "best-sellers", "sale"
  const [sortBy, setSortBy] = useState("Most Popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const handleImageSlide = (productId, direction, imagesLength) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[productId] || 0;
      let newIndex;

      if (direction === "next") {
        newIndex = (currentIndex + 1) % imagesLength;
      } else {
        newIndex = currentIndex === 0 ? imagesLength - 1 : currentIndex - 1;
      }

      return { ...prev, [productId]: newIndex };
    });
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, category });
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist({ ...product, category });
    const isInList = isInWishlist(product.id);
    setNotification(
      isInList
        ? `${product.name} removed from wishlist!`
        : `${product.name} added to wishlist!`
    );
    setTimeout(() => setNotification(null), 3000);
  };

  // (product data moved to module scope)

  const colors = [
    { name: "Green", value: "green", color: "#00C12B" },
    { name: "Red", value: "red", color: "#F50606" },
    { name: "Yellow", value: "yellow", color: "#F5DD06" },
    { name: "Orange", value: "orange", color: "#F57906" },
    { name: "Cyan", value: "cyan", color: "#06CAF5" },
    { name: "Blue", value: "blue", color: "#063AF5" },
    { name: "Purple", value: "purple", color: "#7D06F5" },
    { name: "Pink", value: "pink", color: "#F506A4" },
    { name: "White", value: "white", color: "#FFFFFF" },
    { name: "Black", value: "black", color: "#000000" },
  ];

  const productCategories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
  const dressStyles = ["Casual", "Formal", "Party", "Gym"];

  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  const allProducts = useMemo(
    () => PRODUCTS[category] || PRODUCTS.men,
    [category]
  );

  // Handle URL parameter for category filter on initial load
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    // Handle feature parameter (New Arrivals, Best Sellers, Sale)
    const featureParam = searchParams.get('feature');
    if (featureParam) {
      setSelectedFeature(featureParam);
    }
  }, [searchParams]);

  // Filter products
  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by feature (New Arrivals, Best Sellers, Sale)
    if (selectedFeature === "new-arrivals") {
      // Get the newest products (assuming higher IDs are newer)
      filtered = filtered.sort((a, b) => b.id - a.id).slice(0, Math.ceil(allProducts.length / 2));
    } else if (selectedFeature === "best-sellers") {
      // Get products with rating >= 4.5
      filtered = filtered.filter((product) => product.rating >= 4.5);
    } else if (selectedFeature === "sale") {
      // Get products with discount
      filtered = filtered.filter((product) => product.discount);
    }

    // Filter by price
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => selectedColors.includes(color))
      );
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    // Filter by categories (types)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.type)
      );
    }

    // Filter by dress styles
    if (selectedStyles.length > 0) {
      filtered = filtered.filter((product) =>
        selectedStyles.includes(product.style)
      );
    }

    // Sort products
    switch (sortBy) {
      case "Newest":
        filtered = filtered.sort((a, b) => b.id - a.id);
        break;
      case "Price: Low to High":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "Most Popular":
      default:
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    priceRange,
    selectedColors,
    selectedSizes,
    selectedCategories,
    selectedStyles,
    selectedFeature,
    sortBy,
    allProducts,
  ]);

  // Reset to first page when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleStyle = (style) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const applyFilters = () => {
    // Filters are already applied via useEffect
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetFilters = () => {
    setPriceRange([0, 500]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSelectedStyles([]);
    setSelectedFeature(null);
    setSortBy("Most Popular");
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }
    const remaining = 5 - Math.ceil(rating);
    for (let i = 0; i < remaining; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="category-products-page">
      {notification && <div className="notification">{notification}</div>}

      {/* Mobile Filter Toggle Button */}
      <button
        className="mobile-filter-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars size={20} />
        Filters
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="products-container">
        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button
              className="filter-close-btn"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Categories */}
          <div className="filter-section">
            {productCategories.map((cat) => (
              <h4
                key={cat}
                className={`filter-item ${
                  selectedCategories.includes(cat) ? "active" : ""
                }`}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
              </h4>
            ))}
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <h4>Price</h4>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="price-slider"
            />
            <div className="price-range-display">
              ${priceRange[0]} - ${priceRange[1]}
            </div>
          </div>

          {/* Colors */}
          <div className="filter-section">
            <h4>Colors</h4>
            <div className="color-options">
              {colors.map((color) => (
                <button
                  key={color.value}
                  className={`color-btn ${
                    selectedColors.includes(color.value) ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color.color }}
                  onClick={() => toggleColor(color.value)}
                  title={color.name}
                >
                  {selectedColors.includes(color.value) && (
                    <span className="check-mark">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="filter-section">
            <h4>Size</h4>
            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${
                    selectedSizes.includes(size) ? "selected" : ""
                  }`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Dress Style */}
          <div className="filter-section">
            <h4>Dress Style</h4>
            <div className="style-options">
              {dressStyles.map((style) => (
                <button
                  key={style}
                  className={`style-btn ${
                    selectedStyles.includes(style) ? "selected" : ""
                  }`}
                  onClick={() => toggleStyle(style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <button
            className="apply-filter-btn"
            onClick={() => {
              applyFilters();
              setIsSidebarOpen(false);
            }}
          >
            Apply Filter
          </button>
          <button
            className="reset-filter-btn"
            onClick={() => {
              resetFilters();
              setIsSidebarOpen(false);
            }}
          >
            Reset Filters
          </button>
        </aside>

        {/* Products Grid */}
        <main className="products-main">
          <div className="products-header">
            <div className="header-row">
              <h2 className="category-title">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <div className="products-sort">
                <span>
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredProducts.length)} of{" "}
                  {filteredProducts.length} Products
                </span>
                <div
                  className="per-page-toggle"
                  role="group"
                  aria-label="Items per page"
                >
                  <button
                    className={`per-page-btn ${
                      itemsPerPage === 6 ? "active" : ""
                    }`}
                    onClick={() => setItemsPerPage(6)}
                  >
                    6 / page
                  </button>
                  <button
                    className={`per-page-btn ${
                      itemsPerPage === 12 ? "active" : ""
                    }`}
                    onClick={() => setItemsPerPage(12)}
                  >
                    12 / page
                  </button>
                </div>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Feature Filter Buttons */}
            <div className="feature-filters">
              <button
                className={`feature-btn ${selectedFeature === "new-arrivals" ? "active" : ""}`}
                onClick={() => setSelectedFeature(selectedFeature === "new-arrivals" ? null : "new-arrivals")}
              >
                New Arrivals
              </button>
              <button
                className={`feature-btn ${selectedFeature === "best-sellers" ? "active" : ""}`}
                onClick={() => setSelectedFeature(selectedFeature === "best-sellers" ? null : "best-sellers")}
              >
                Best Sellers
              </button>
              <button
                className={`feature-btn ${selectedFeature === "sale" ? "active" : ""}`}
                onClick={() => setSelectedFeature(selectedFeature === "sale" ? null : "sale")}
              >
                Sale
              </button>
            </div>
          </div>

          <div className="products-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => {
                const images = product.images || [product.image];
                const currentIndex = currentImageIndex[product.id] || 0;

                return (
                  <div
                    key={product.id}
                    className="product-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className="product-image"
                      onClick={() =>
                        navigate(`/shop/${category}/${product.id}`)
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          navigate(`/shop/${category}/${product.id}`);
                        }
                      }}
                    >
                      {/* Image Slider */}
                      <div className="product-image-slider">
                        <img
                          src={images[currentIndex]}
                          alt={product.name}
                          className="product-img"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/800x1000/667eea/white?text=${encodeURIComponent(
                              product.name
                            )}`;
                          }}
                        />

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                          <>
                            <button
                              className="slider-arrow slider-arrow-prev"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleImageSlide(
                                  product.id,
                                  "prev",
                                  images.length
                                );
                              }}
                              aria-label="Previous image"
                            >
                              <MdChevronLeft size={24} />
                            </button>
                            <button
                              className="slider-arrow slider-arrow-next"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleImageSlide(
                                  product.id,
                                  "next",
                                  images.length
                                );
                              }}
                              aria-label="Next image"
                            >
                              <MdChevronRight size={24} />
                            </button>
                          </>
                        )}

                        {/* Image Indicators */}
                        {images.length > 1 && (
                          <div className="image-indicators">
                            {images.map((_, idx) => (
                              <button
                                key={idx}
                                className={`indicator-dot ${
                                  idx === currentIndex ? "active" : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex((prev) => ({
                                    ...prev,
                                    [product.id]: idx,
                                  }));
                                }}
                                aria-label={`Go to image ${idx + 1}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Discount Badge */}
                      {product.discount && (
                        <div className="discount-badge-overlay">
                          -{product.discount}%
                        </div>
                      )}

                      <div className="product-actions">
                        <button
                          className={`action-btn wishlist-btn ${
                            isInWishlist(product.id) ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToWishlist(product);
                          }}
                          title="Add to Wishlist"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaHeart
                              size={20}
                              color={
                                isInWishlist(product.id)
                                  ? "#ff4d4d"
                                  : "currentColor"
                              }
                            />
                          </motion.div>
                        </button>
                        <button
                          className="action-btn cart-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          title="Add to Cart"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaShoppingCart size={20} />
                          </motion.div>
                        </button>
                      </div>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-rating">
                        <div className="stars">
                          {renderStars(product.rating)}
                        </div>
                        <span className="rating-value">{product.rating}/5</span>
                      </div>
                      <div className="product-price">
                        <span className="current-price">${product.price}</span>
                        {product.originalPrice && (
                          <span className="original-price">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-products">
                <p>No products found matching your filters.</p>
                <button className="reset-filter-btn" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredProducts.length > itemsPerPage && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      className={`pagination-number ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span key={page} className="pagination-dots">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                className="pagination-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryProducts;
