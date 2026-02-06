"use client";

import { useEffect, useState } from "react";
import {apiFetch} from "../../utils/api.ts";
import {toast} from "react-toastify";
import { Link } from 'react-router-dom';


export default function Products(){
    const[products, setProducts] = useState<any[]>([]);
    const[role, setRole] = useState("");

    useEffect(() => {
        apiFetch("http://localhost:8089/api/products").then(setProducts);

        apiFetch("http://localhost:8089/api/profile").then(data => {
            setRole(data.role);
        });
    }, []);

    const addToCart = async(productId: number) =>{
        try{
            await apiFetch('http://localhost:8089/api/cart',{
                method: 'POST',
                body: JSON.stringify({
                    productId: productId,
                    quantity: 1,
                }),
            });
            toast.success("Added to cart");
        }catch (err: any){
            toast.error(err.message);
        }
    };

    return (
        <div className="p-10">
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">Products</h1>
                {role === 'ADMIN' && (
                    <Link to="/admin/add-product" className="bg-black text-white px-4 py-2">
                        Add Product
                    </Link>
                )}
                {role === 'USER' && (
                    <Link to="/cart" className="border px-4 py-2">
                        Cart
                    </Link>
                )}
            </div>

            {products.map(p => (
                <div key={p.ID} className="border p-3 mb-2">
                    <div>
                        <h2>{p.Name}</h2>
                        <p>{p.Description}</p>
                        <p>{p.Stock}</p>
                        <p>₹{p.Price}</p>
                    </div>
                    {role === 'USER' && (
                        <button
                            onClick={() => addToCart(p.ID)}
                            className="bg-black text-white px-3 py-1"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}