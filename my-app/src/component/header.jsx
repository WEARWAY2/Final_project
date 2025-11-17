import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaTimes,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../config/products";
import "./header.css";

const Header = () => {
  const {
    cartCount,
    wishlistCount,
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    removeFromWishlist,
  } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Live search handler
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      // Flatten all products into a single array
      const flatProducts = [
        ...PRODUCTS.men.map((p) => ({ ...p, category: "men" })),
        ...PRODUCTS.women.map((p) => ({ ...p, category: "women" })),
        ...PRODUCTS.kids.map((p) => ({ ...p, category: "kids" })),
      ];

      // Filter products based on search query (name, type, or style)
      const results = flatProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.type &&
            product.type.toLowerCase().includes(query.toLowerCase())) ||
          (product.style &&
            product.style.toLowerCase().includes(query.toLowerCase()))
      );

      setSearchResults(results.slice(0, 6)); // Show max 6 results
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  // Handle clicking on a search result
  const handleSearchResultClick = (product) => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
    navigate(`/shop/${product.category}/${product.id}`);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-bar")) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddToCartFromWishlist = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen || isWishlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, isWishlistOpen]);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <h1>WearWay</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="nav-menu">
          <Link to="/" className="nav-item">
            Home
          </Link>
          <Link to="/shop" className="nav-item">
            Shop
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="search-bar">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaSearch size={20} color="#666" />
          </motion.div>
          <input
            type="text"
            placeholder="Search for products..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
          />

          {/* Search Results Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="search-result-item"
                  onClick={() => handleSearchResultClick(product)}
                >
                  <img src={product.image} alt={product.name} />
                  <div className="search-result-info">
                    <h4>{product.name}</h4>
                    <p className="search-result-category">{product.category}</p>
                    <p className="search-result-price">${product.price}</p>
                  </div>
                </div>
              ))}
              {searchQuery.trim() && (
                <div className="search-view-all">
                  <Link
                    to="/shop"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                  >
                    View all products →
                  </Link>
                </div>
              )}
            </div>
          )}

          {isSearchOpen && searchQuery.trim() && searchResults.length === 0 && (
            <div className="search-results">
              <div className="search-no-results">
                <p>No products found for "{searchQuery}"</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="header-actions">
          <button
            className="icon-button"
            aria-label="Shopping Cart"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <FaShoppingCart size={24} />
            </motion.div>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          <button
            className="icon-button"
            aria-label="Wishlist"
            onClick={() => setIsWishlistOpen(!isWishlistOpen)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: wishlistCount > 0 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaHeart
                size={24}
                color={wishlistCount > 0 ? "#ff4d4d" : "currentColor"}
              />
            </motion.div>
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </button>
          <button
            className="icon-button"
            aria-label="User Account"
            onClick={() => navigate("/checkout")}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <FaUser size={24} />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      <div className={`drawer cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div
          className="drawer-overlay"
          onClick={() => setIsCartOpen(false)}
        ></div>
        <div className="drawer-content">
          <div className="drawer-header">
            <h2>Shopping Cart ({cartCount})</h2>
            <button className="close-btn" onClick={() => setIsCartOpen(false)}>
              <FaTimes size={24} />
            </button>
          </div>
          <div className="drawer-body">
            {cartItems.length === 0 ? (
              <div className="empty-state">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaShoppingCart size={80} color="#ccc" />
                </motion.div>
                <p>Your cart is empty</p>
                <button
                  className="continue-shopping-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/shop");
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="drawer-item cart-item">
                    <div className="item-image">
                      <img
                        src={
                          item.image ||
                          (item.images && item.images[0]) ||
                          `https://placehold.co/160x160/eeeeee/999?text=${encodeURIComponent(
                            item.name
                          )}`
                        }
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/160x160/eeeeee/999?text=${encodeURIComponent(
                            item.name
                          )}`;
                        }}
                      />
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-price">
                        ${item.price}
                        {item.originalPrice && (
                          <span className="item-original-price">
                            {" "}
                            ${item.originalPrice}
                          </span>
                        )}
                      </p>
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => decreaseQuantity(item.id)}
                          title="Decrease"
                        >
                          <FaMinus size={16} />
                        </button>
                        <span className="quantity-display">
                          {item.quantity}
                        </span>
                        <button
                          className="quantity-btn"
                          onClick={() => increaseQuantity(item.id)}
                          title="Increase"
                        >
                          <FaPlus size={16} />
                        </button>
                      </div>
                      <p className="item-total">
                        Subtotal:{" "}
                        <strong>
                          ${(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </p>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove"
                    >
                      <FaTimes size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="drawer-footer">
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <div className="total">
                <span>Total:</span>
                <span className="total-price">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/checkout");
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Wishlist Drawer */}
      <div className={`drawer wishlist-drawer ${isWishlistOpen ? "open" : ""}`}>
        <div
          className="drawer-overlay"
          onClick={() => setIsWishlistOpen(false)}
        ></div>
        <div className="drawer-content">
          <div className="drawer-header">
            <h2>My Wishlist ({wishlistCount})</h2>
            <button
              className="close-btn"
              onClick={() => setIsWishlistOpen(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className="drawer-body">
            {wishlistItems.length === 0 ? (
              <div className="empty-state">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaHeart size={80} color="#ccc" />
                </motion.div>
                <p>Your wishlist is empty</p>
                <button
                  className="continue-shopping-btn"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigate("/shop");
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="items-list">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="drawer-item wishlist-item">
                    <div className="item-image">
                      <img
                        src={
                          item.image ||
                          (item.images && item.images[0]) ||
                          `https://placehold.co/300x200/eeeeee/999?text=${encodeURIComponent(
                            item.name
                          )}`
                        }
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/300x200/eeeeee/999?text=${encodeURIComponent(
                            item.name
                          )}`;
                        }}
                      />
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <div className="item-price-row">
                        <p className="item-price">${item.price}</p>
                        {item.originalPrice && (
                          <p className="item-original-price">
                            ${item.originalPrice}
                          </p>
                        )}
                      </div>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCartFromWishlist(item)}
                      >
                        <FaShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                      title="Remove"
                    >
                      <FaTimes size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
