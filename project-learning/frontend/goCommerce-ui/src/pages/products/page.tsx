"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api.ts";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    apiFetch("http://localhost:8089/api/products").then(setProducts);

    apiFetch("http://localhost:8089/api/profile").then((data) => {
      setRole(data.role);
    });
  }, []);

  const addToCart = async (productId: number) => {
    try {
      await apiFetch("http://localhost:8089/api/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
        }),
      });
      toast.success("Added to cart");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900">Products</h1>

        <div className="flex gap-4">
          {role === "ADMIN" && (
            <Link
              to="/admin/add-product"
              className="rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-4 py-2 font-semibold shadow hover:shadow-lg transition"
            >
              Add Product
            </Link>
          )}

          {role === "USER" && (
            <Link
              to="/cart"
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 font-medium hover:border-indigo-400 hover:text-indigo-600 transition"
            >
              Cart
            </Link>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.ID}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {p.Name}
              </h2>
              <p className="text-gray-600 mb-2">{p.Description}</p>
              <p className="text-gray-500 mb-1">Stock: {p.Stock}</p>
              <p className="text-lg font-bold text-gray-900">₹{p.Price}</p>
            </div>

            {role === "USER" && (
              <button
                onClick={() => addToCart(p.ID)}
                className="mt-4 w-full rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-2 font-semibold shadow hover:shadow-lg transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
