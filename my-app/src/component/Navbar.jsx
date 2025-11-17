import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/shop/men", label: "Men" },
    { path: "/shop/women", label: "Women" },
    { path: "/shop/kids", label: "Kids" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <span className="logo-text">WearWay</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-menu desktop-menu">
          {navLinks.map((link) => (
            <li key={link.path} className="nav-item">
              <Link to={link.path} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <button
          className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link, index) => (
            <li
              key={link.path}
              className="mobile-nav-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link
                to={link.path}
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </nav>
  );
};

export default Navbar;
