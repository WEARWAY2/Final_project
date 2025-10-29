import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import "./header.css";

const Header = () => {
  const {
    cartCount,
    wishlistCount,
    cartItems,
    wishlistItems,
    removeFromCart,
    removeFromWishlist,
  } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

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
          <h1>WearWay</h1>
        </div>

        {/* Navigation */}
        <nav className="nav-menu">
          <div className="nav-item dropdown">
            <span>Shop</span>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <a href="#on-sale" className="nav-item">
            On Sale
          </a>
          <a href="#new-arrivals" className="nav-item">
            New Arrivals
          </a>
          <a href="#brands" className="nav-item">
            Brands
          </a>
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
          />
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
          <button className="icon-button" aria-label="User Account">
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
                  <div key={item.id} className="drawer-item">
                    <div className="item-image">
                      <div className="item-img-placeholder"></div>
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                      <p className="item-price">
                        ${item.price} × {item.quantity}
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
              <div className="total">
                <span>Total:</span>
                <span className="total-price">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
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
                  <div key={item.id} className="drawer-item">
                    <div className="item-image">
                      <div className="item-img-placeholder"></div>
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-price">${item.price}</p>
                      {item.originalPrice && (
                        <p className="item-original-price">
                          ${item.originalPrice}
                        </p>
                      )}
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
