import React from "react";
import "./header.css";

const Header = () => {
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
          <button className="icon-button" aria-label="Shopping Cart">
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
    </header>
  );
};

export default Header;
