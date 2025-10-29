import "./App.css";
import Header from "./component/header";
import Footer from "./component/footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
