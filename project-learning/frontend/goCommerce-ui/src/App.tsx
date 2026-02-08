import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/home/page.tsx";
import Login from "./pages/login/page.tsx";
import SignUp from "./pages/signup/page.tsx";
import AddProduct from "./pages/admin/add-product/page.tsx";
import Cart from "./pages/cart/page.tsx";
import Products from "./pages/products/page.tsx";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="w-full px-6 shadow-md bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent"
          >
            GoCommerce
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/login" className="nav-btn-secondary">
              Login
            </Link>

            <Link to="/signup" className="nav-btn-primary">
              Sign up
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
