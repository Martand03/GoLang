import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center text-center
                    bg-gradient-to-br from-indigo-100 via-sky-50 to-cyan-100"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
          GoCommerce
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-lg text-gray-600">
        Build powerful, scalable commerce applications using{" "}
        <span className="font-medium text-gray-900">Go</span> and{" "}
        <span className="font-medium text-gray-900">React</span>.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          to="/login"
          className="rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 px-8 py-3 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 hover:border-indigo-400 hover:text-indigo-600 hover:bg-white/60 transition"
        >
          Create an account
        </Link>
      </div>

      <p className="mt-10 text-sm text-gray-500">Fast • Secure • Scalable</p>
    </section>
  );
}
