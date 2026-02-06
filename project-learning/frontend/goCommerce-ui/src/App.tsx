import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/home/page.tsx";
import Login from "./pages/login/page.tsx";
import SignUp from "./pages/signup/page.tsx";
import AddProduct from "./pages/admin/add-product/page.tsx";
import Cart from "./pages/cart/page.tsx";
import Products from "./pages/products/page.tsx";

function App() {
    return(
        <Router>
            <nav className="p-4 bg-gray-100 flex gap-4">
                <Link to="/" className="font-bold">Home</Link>
                <Link to="/product" className="font-bold">Product</Link>
                <Link to="/admin" className="font-bold">Admin</Link>
                <Link to="/login" className="font-bold">Login</Link>
                <Link to="/signup" className="font-bold">Signup</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/admin/add-product" element={<AddProduct/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/products" element={<Products/>}/>
            </Routes>
        </Router>
    )
}

export default App
