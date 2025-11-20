import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
                Continue shopping →
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
                      −
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      aria-label="Increase"
                    >
                      ＋
                    </button>
                  </div>
                  <button
                    className="ci-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove"
                  >
                    🗑
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
            onClick={() => {
              // Confirm purchase flow placeholder
              clearCart();
              navigate("/shop");
            }}
          >
            Go to Checkout →
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
