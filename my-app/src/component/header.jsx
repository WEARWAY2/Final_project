import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
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

  // All products data
  const allProducts = {
    men: [
      {
        id: 1,
        name: "Gradient Graphic T-shirt",
        price: 145,
        rating: 3.5,
        image: "/product-1.jpg",
        category: "men",
      },
      {
        id: 2,
        name: "Polo with Tipping Details",
        price: 180,
        rating: 4.5,
        image: "/product-2.jpg",
        category: "men",
      },
      {
        id: 3,
        name: "Black Striped T-shirt",
        price: 120,
        rating: 5.0,
        image: "/product-3.jpg",
        category: "men",
      },
      {
        id: 4,
        name: "Skinny Fit Jeans",
        price: 240,
        rating: 3.5,
        image: "/product-4.jpg",
        category: "men",
      },
      {
        id: 5,
        name: "Checkered Shirt",
        price: 180,
        rating: 4.5,
        image: "/product-5.jpg",
        category: "men",
      },
      {
        id: 6,
        name: "Sleeve Striped T-shirt",
        price: 130,
        rating: 4.5,
        image: "/product-6.jpg",
        category: "men",
      },
      {
        id: 7,
        name: "Vertical Striped Shirt",
        price: 212,
        rating: 5.0,
        image: "/product-7.jpg",
        category: "men",
      },
      {
        id: 8,
        name: "Courage Graphic T-shirt",
        price: 145,
        rating: 4.0,
        image: "/product-8.jpg",
        category: "men",
      },
      {
        id: 9,
        name: "Loose Fit Bermuda Shorts",
        price: 80,
        rating: 3.0,
        image: "/product-9.jpg",
        category: "men",
      },
    ],
    women: [
      {
        id: 10,
        name: "Floral Summer Dress",
        price: 195,
        rating: 4.5,
        image: "/product-10.jpg",
        category: "women",
      },
      {
        id: 11,
        name: "Elegant Blazer",
        price: 280,
        rating: 5.0,
        image: "/product-11.jpg",
        category: "women",
      },
      {
        id: 12,
        name: "Casual Denim Jacket",
        price: 165,
        rating: 4.0,
        image: "/product-12.jpg",
        category: "women",
      },
    ],
    kids: [
      {
        id: 13,
        name: "Cartoon Print T-shirt",
        price: 65,
        rating: 4.5,
        image: "/product-13.jpg",
        category: "kids",
      },
      {
        id: 14,
        name: "Comfortable Joggers",
        price: 55,
        rating: 4.0,
        image: "/product-14.jpg",
        category: "kids",
      },
      {
        id: 15,
        name: "Colorful Hoodie",
        price: 85,
        rating: 4.5,
        image: "/product-15.jpg",
        category: "kids",
      },
    ],
  };

  // Live search handler
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      // Flatten all products into a single array
      const flatProducts = [
        ...allProducts.men,
        ...allProducts.women,
        ...allProducts.kids,
      ];

      // Filter products based on search query
      const results = flatProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
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
    navigate(`/shop/${product.category}`);
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
              stroke="#666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 19L14.65 14.65"
              stroke="#666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 2L7 6H21L19 2H9Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6H22L20 18H8L6 6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="21" r="1" fill="currentColor" />
              <circle cx="19" cy="21" r="1" fill="currentColor" />
            </svg>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          <button
            className="icon-button"
            aria-label="Wishlist"
            onClick={() => setIsWishlistOpen(!isWishlistOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </button>
          <button className="icon-button" aria-label="User Account" onClick={() => navigate("/checkout")}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="8"
                r="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6 21C6 17.134 8.686 14 12 14C15.314 14 18 17.134 18 21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="drawer-body">
            {cartItems.length === 0 ? (
              <div className="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 2L7 6H21L19 2H9Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 6H22L20 18H8L6 6Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="9" cy="21" r="1" fill="currentColor" />
                  <circle cx="19" cy="21" r="1" fill="currentColor" />
                </svg>
                <p>Your cart is empty</p>
                <button
                  className="continue-shopping-btn"
                  onClick={() => setIsCartOpen(false)}
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
                        src={item.image || (item.images && item.images[0]) || `https://placehold.co/160x160/eeeeee/999?text=${encodeURIComponent(item.name)}`}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/160x160/eeeeee/999?text=${encodeURIComponent(item.name)}`;
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
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M5 12h14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <span className="quantity-display">
                          {item.quantity}
                        </span>
                        <button
                          className="quantity-btn"
                          onClick={() => increaseQuantity(item.id)}
                          title="Increase"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 5v14M5 12h14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
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
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
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
              <button className="checkout-btn" onClick={() => { setIsCartOpen(false); navigate("/checkout"); }}>Proceed to Checkout</button>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="drawer-body">
            {wishlistItems.length === 0 ? (
              <div className="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <p>Your wishlist is empty</p>
                <button
                  className="continue-shopping-btn"
                  onClick={() => setIsWishlistOpen(false)}
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
                        src={item.image || (item.images && item.images[0]) || `https://placehold.co/300x200/eeeeee/999?text=${encodeURIComponent(item.name)}`}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/300x200/eeeeee/999?text=${encodeURIComponent(item.name)}`;
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
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9 2L7 6H21L19 2H9Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 6H22L20 18H8L6 6Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="9" cy="21" r="1" fill="currentColor" />
                          <circle cx="19" cy="21" r="1" fill="currentColor" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                      title="Remove"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
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
