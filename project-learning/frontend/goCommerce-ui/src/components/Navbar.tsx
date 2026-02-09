import {Link, useNavigate} from "react-router-dom";
import {logout} from "../utils/auth.ts";
import {toast} from "react-toastify";

export default function Navbar(){
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success('Logged out');
        navigate('/login');
    };

    return(
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

                    <button className="nav-btn-ternary" onClick={handleLogout}>
                        LogOut
                    </button>
                </div>
            </div>
        </nav>
    )
}