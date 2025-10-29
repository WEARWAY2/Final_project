import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./component/header";
import Footer from "./component/footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CategoryProducts from "./pages/CategoryProducts";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<CategoryProducts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
