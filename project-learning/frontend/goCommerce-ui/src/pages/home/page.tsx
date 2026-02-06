import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    GoCommerce
                </h1>
                <p className="mt-3 text-gray-600 text-lg md:text-xl">
                    Built with Go + React
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/login"
                        className="px-6 py-3 bg-black text-white rounded-md shadow hover:bg-gray-800 transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="px-6 py-3 border border-gray-300 rounded-md shadow hover:bg-gray-100 transition"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </main>
    );
}
