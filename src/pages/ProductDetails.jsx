import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { findProduct } from "../config/products";
import "./ProductDetails.css";
import Skeleton from "../component/Skeleton";

// Lightweight local fallback for toast to avoid missing alias imports
const toast = ({ title, description }) => {
  try {
    // Prefer Notification if available and permitted
    if (window.Notification && Notification.permission === "granted") {
      new Notification(title || "Notification", { body: description });
      return;
    }
    if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  } catch {
    // ignore Notification errors; fall back to console
  }
  // Fallback to console
  if (title || description) console.log(title || "", description || "");
};

const formatPrice = (n) =>
  `$${Number(n)
    .toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/\.00$/, "")}`;

const ProductDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const product = useMemo(() => findProduct(category, id), [category, id]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const mainImageRef = useRef(null);
  const galleryRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Preload images
  useEffect(() => {
    if (product?.images) {
      product.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [product]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const len = product?.images?.length || (product?.image ? 1 : 0);
      if (!len) return;
      if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i - 1 + len) % len);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((i) => (i + 1) % len);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product]);

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((i) => (i + 1) % images.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  if (!product) {
    return (
      <div className="pd-not-found">
        <div className="pd-not-found-content">
          <div className="pd-not-found-icon">🔍</div>
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <Link to={`/shop/${category}`} className="btn-link">
            Back to {category}
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.image];

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    const item = {
      ...product,
      category,
      quantity: qty,
      selectedColor,
      selectedSize,
    };

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    addToCart(item);
    setIsAddingToCart(false);

    toast({
      title: "Added to Cart! 🎉",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/checkout");
  };

  const toggleWishlist = () => {
    addToWishlist({ ...product, category });
    const isNowInWishlist = !isInWishlist(product.id);

    toast({
      title: isNowInWishlist ? "Added to Wishlist ❤️" : "Removed from Wishlist",
      description: isNowInWishlist
        ? `${product.name} saved for later.`
        : `${product.name} removed from wishlist.`,
      duration: 2000,
    });
  };

  const   handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name}!`,
          url: url,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          navigator.clipboard.writeText(url);
          toast({
            title: "Link Copied! 📋",
            description: "Product link copied to clipboard.",
            duration: 2000,
          });
        }
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied! 📋",
        description: "Product link copied to clipboard.",
        duration: 2000,
      });
    }
  };

  const isWish = isInWishlist(product.id);
  const isOutOfStock = false; // Add actual stock logic here

  return (
    <div className="product-details-page">
      {/* Breadcrumbs */}
      <nav className="pd-breadcrumbs" aria-label="breadcrumbs">
        <Link to="/">Home</Link>
        <span aria-hidden="true">›</span>
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/shop/${category}`}>{category}</Link>
        <span aria-hidden="true">›</span>
        <span className="current" aria-current="page">
          {product.name}
        </span>
      </nav>

      <div className="pd-layout pd-3col">
        {/* Gallery (Left) */}
        <section className="pd-gallery" ref={galleryRef}>
          <div
            className={"pd-main-image"}
            ref={mainImageRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => setShowLightbox(true)}
            role="button"
            tabIndex={0}
            aria-label="Open image in fullscreen"
          >
            {!imageLoaded && (
              <div className="pd-image-skeleton">
                <Skeleton className="w-full h-full" />
              </div>
            )}
            <img
              src={images[currentIndex]}
              alt={`${product.name} - View ${currentIndex + 1}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/800x1000/667eea/white?text=${encodeURIComponent(
                  product.name
                )}`;
              }}
              style={{ display: imageLoaded ? "block" : "none" }}
            />
            {images.length > 1 && (
              <>
                <button
                  className="pd-nav prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(
                      (i) => (i - 1 + images.length) % images.length
                    );
                  }}
                  aria-label="Previous image"
                  disabled={isLoading}
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  className="pd-nav next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((i) => (i + 1) % images.length);
                  }}
                  aria-label="Next image"
                  disabled={isLoading}
                >
                  <span aria-hidden="true">›</span>
                </button>
                <div className="pd-image-counter" aria-live="polite">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
            <div className="pd-zoom-hint">Click to view fullscreen</div>
          </div>

          {images.length > 1 && (
            <div className="pd-thumbs" role="list">
              {images.map((src, idx) => (
                <button
                  key={src + idx}
                  className={`pd-thumb ${currentIndex === idx ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Show image ${idx + 1}`}
                  role="listitem"
                >
                  <img
                    src={src}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Info (Middle) */}
        <main className="pd-info">
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-8 w-1/3 mb-4" />
              <Skeleton className="h-24 w-full" />
            </>
          ) : (
            <>
              <h1 className="pd-title">{product.name}</h1>
              <div className="pd-meta">
                <div
                  className="pd-rating"
                  role="img"
                  aria-label={`Rated ${product.rating} out of 5 stars`}
                >
                  <span aria-hidden="true">★ {product.rating}</span>
                </div>
                {product.discount && (
                  <span className="pd-discount" role="status">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>
              <div className="pd-price">
                <span
                  className="current"
                  aria-label={`Current price ${formatPrice(product.price)}`}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span
                    className="original"
                    aria-label={`Original price ${formatPrice(
                      product.originalPrice
                    )}`}
                  >
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="pd-description">
                Experience premium-quality {product.type?.toLowerCase()} with a{" "}
                {product.style?.toLowerCase()} style. Crafted to be comfortable,
                durable and versatile for everyday wear.
              </div>
              <div className="pd-details">
                <div className="pd-row">
                  <span>Category</span>
                  <span>
                    <strong>{product.type}</strong>
                  </span>
                </div>
                <div className="pd-row">
                  <span>Style</span>
                  <span>
                    <strong>{product.style}</strong>
                  </span>
                </div>
                <div className="pd-row">
                  <span>Storefront</span>
                  <span>
                    <strong>WearWay</strong>
                  </span>
                </div>
              </div>
            </>
          )}
        </main>

        {/* Actions (Right) */}
        <aside className="pd-actions-card">
          <div
            className={`pd-stock ${isOutOfStock ? "out-of-stock" : ""}`}
            role="status"
          >
            {isOutOfStock ? "❌ Out of Stock" : "✓ In Stock"}
          </div>

          {product.colors?.length > 0 && (
            <div className="pd-section">
              <div className="pd-label">
                Color: <strong>{selectedColor}</strong>
              </div>
              <div
                className="pd-color-list"
                role="radiogroup"
                aria-label="Select color"
              >
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={`pd-chip pd-chip-color ${
                      selectedColor === c ? "active" : ""
                    }`}
                    onClick={() => setSelectedColor(c)}
                    role="radio"
                    aria-checked={selectedColor === c}
                    aria-label={`Select ${c} color`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="pd-section">
              <div className="pd-label">
                Size: <strong>{selectedSize}</strong>
              </div>
              <div
                className="pd-size-list"
                role="radiogroup"
                aria-label="Select size"
              >
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`pd-chip ${selectedSize === s ? "active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                    role="radio"
                    aria-checked={selectedSize === s}
                    aria-label={`Select size ${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pd-qty">
            <span>Quantity</span>
            <div
              className="pd-qty-controls"
              role="group"
              aria-label="Quantity controls"
            >
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                disabled={qty <= 1}
                className="pd-qty-btn"
              >
                −
              </button>
              <span className="pd-qty-value" aria-live="polite">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="pd-qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <div className="pd-actions">
            <button
              className="btn-primary"
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAddingToCart}
              aria-busy={isAddingToCart}
            >
              {isAddingToCart ? (
                <span className="btn-loading">
                  <span className="spinner"></span> Adding...
                </span>
              ) : (
                "Add to Cart"
              )}
            </button>
            <button
              className="btn-buy"
              onClick={handleBuyNow}
              disabled={isOutOfStock || isAddingToCart}
            >
              Buy Now
            </button>
          </div>

          <div className="pd-secondary-actions">
            <button
              className={`btn-wishlist ${isWish ? "active" : ""}`}
              onClick={toggleWishlist}
              aria-label={isWish ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={isWish}
            >
              <span className="btn-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWish ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </span>
              {isWish ? "In Wishlist" : "Wishlist"}
            </button>
            <button
              className="btn-share"
              onClick={handleShare}
              aria-label="Share product"
            >
              <span className="btn-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </span>
              Share
            </button>
          </div>
        </aside>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div
          className="pd-lightbox"
          onClick={() => setShowLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          <button
            className="pd-lightbox-close"
            onClick={() => setShowLightbox(false)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <img
            src={images[currentIndex]}
            alt={`${product.name} - Fullscreen view ${currentIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
