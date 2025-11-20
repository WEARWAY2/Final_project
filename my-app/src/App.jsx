import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./component/header";
import Footer from "./component/footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CategoryProducts from "./pages/CategoryProducts";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import BackToTop from "./component/BackToTop";
import ScrollToTop from "./component/ScrollToTop";
import AppleIntroLoader from "./component/AppleIntroLoader";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppleIntroLoader>
          <Router>
            <ScrollToTop />
            <div className="app">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:category" element={<CategoryProducts />} />
                <Route
                  path="/shop/:category/:id"
                  element={<ProductDetails />}
                />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
            <BackToTop />
          </Router>
        </AppleIntroLoader>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
