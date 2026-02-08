'use client';

import { useState } from 'react';
import {apiFetch} from "../../../utils/api.ts";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';


export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const navigate = useNavigate();

    const submit = async () => {
        try {
            await apiFetch('http://localhost:8089/api/admin/products', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    price: Number(price),
                    stock: Number(stock),
                }),
            });

            toast.success('Product added');
            navigate('/products');
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
  <div className="min-h-[80vh] flex flex-col justify-center items-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      
      <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
        Add Product
      </h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={e => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={e => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={e => setStock(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-3 font-semibold shadow-md hover:shadow-lg transition"
        >
          Add Product
        </button>
      </div>
    </div>
  </div>
);

}
