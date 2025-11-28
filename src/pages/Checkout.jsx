import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaArrowRight, FaMinus, FaPlus, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const formatPrice = (n) => `$${Number(n).toFixed(2).replace(/\.00$/, "")}`;

const PROMO_CODES = {
  wearway25: 0.25,
  wearway10: 0.1,
  wearway5: 0.05,
  free: 1.0,
};

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [promoInput, setPromoInput] = React.useState("");
  const [appliedPromo, setAppliedPromo] = React.useState(null);
  const [promoMsg, setPromoMsg] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");

  const handleCheckout = () => {
    const validOrderIds = ["ORD-001", "ORD-002", "ORD-003"];
    const randomId = validOrderIds[Math.floor(Math.random() * validOrderIds.length)];
    setOrderId(randomId);
    setShowModal(true);
    clearCart();
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountRate = appliedPromo ? PROMO_CODES[appliedPromo] : 0.2;
  const discountValue = Math.round(subtotal * discountRate);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = Math.max(0, subtotal - discountValue + deliveryFee);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toLowerCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoMsg(
        code === "free"
          ? "100% discount applied!"
          : `Promo code applied: ${Math.round(PROMO_CODES[code] * 100)}% off`
      );
    } else {
      setPromoMsg("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  return (
    <div
      className="checkout-page"
      style={{ borderRadius: "12px", overflow: "hidden" }}
    >
      <div className="checkout-header">
        <h1>YOUR CART</h1>
      </div>

      <div className="checkout-grid">
        {/* Left: Items list */}
        <section className="checkout-items">
          {cartItems.length === 0 ? (
            <div className="empty-state">
              <p>Your cart is empty.</p>
              <Link to="/shop" className="link">
                Continue shopping{" "}
                <FaArrowRight
                  style={{ marginLeft: "4px", fontSize: "0.9em" }}
                />
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="ci-row">
                <img
                  className="ci-thumb"
                  style={{ borderRadius: "8px" }}
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
                <div className="ci-info">
                  <h3 className="ci-title">{item.name}</h3>
                  <div className="ci-attrs">
                    {item.selectedSize && (
                      <span>Size: {item.selectedSize}</span>
                    )}
                    {item.selectedColor && (
                      <span>Color: {item.selectedColor}</span>
                    )}
                  </div>
                  <div className="ci-price">{formatPrice(item.price)}</div>
                </div>
                <div className="ci-actions">
                  <div className="qty">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label="Decrease"
                    >
                      <FaMinus />
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      aria-label="Increase"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button
                    className="ci-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Right: Order summary */}
        <aside className="order-summary" style={{ borderRadius: "12px" }}>
          <h2>Order Summary</h2>
          <div className="os-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="os-row">
            <span>
              Discount{" "}
              {appliedPromo
                ? `(-${Math.round(PROMO_CODES[appliedPromo] * 100)}%)`
                : "(-20%)"}
            </span>
            <span className="neg">-{formatPrice(discountValue)}</span>
          </div>
          <div className="os-row">
            <span>Delivery Fee</span>
            <span>{formatPrice(deliveryFee)}</span>
          </div>
          <div className="os-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <div className="promo">
            <input
              type="text"
              placeholder="Add promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              disabled={!!appliedPromo}
            />
            <button
              className="btn-ghost"
              type="button"
              onClick={handleApplyPromo}
              disabled={!!appliedPromo}
            >
              {appliedPromo ? "Applied" : "Apply"}
            </button>
          </div>
          {promoMsg && (
            <div
              className={`promo-msg${appliedPromo ? " success" : " error"}${
                appliedPromo === "free" ? " free-discount" : ""
              }`}
            >
              {promoMsg}
            </div>
          )}

          <button
            className="btn-primary block"
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
          >
            Go to Checkout <FaArrowRight style={{ marginLeft: "6px" }} />
          </button>
        </aside>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <FaCheckCircle size={64} className="modal-icon" />
              <h2 className="modal-title">Order Placed Successfully!</h2>
              <p className="modal-text">Thank you for your purchase. Your order has been received.</p>
              
              <div className="order-id-box">
                Order ID: {orderId}
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn-primary"
                  onClick={() => navigate("/track-order")}
                >
                  Track Order
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
