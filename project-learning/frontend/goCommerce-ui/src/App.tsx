import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/page.tsx";
import Login from "./pages/login/page.tsx";
import SignUp from "./pages/signup/page.tsx";
import AddProduct from "./pages/admin/add-product/page.tsx";
import Cart from "./pages/cart/page.tsx";
import Products from "./pages/products/page.tsx";
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <Router>
      <Navbar/>
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
