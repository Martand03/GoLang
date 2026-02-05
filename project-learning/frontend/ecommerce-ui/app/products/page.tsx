"use client";

import { useEffect, useState } from "react";
import {apiFetch} from "@/lib/api";
import Link from 'next/link';

export default function Products(){
    const[products, setProducts] = useState<any[]>([]);
    const[role, setRole] = useState("");

    useEffect(() => {
        apiFetch("http://localhost:8089/api/products").then(setProducts);

        apiFetch("http://localhost:8089/api/profile").then(data => {
            setRole(data.role);
        });
    }, []);

    return (
        <div className="p-10">
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">Products</h1>
                {role === 'ADMIN' && (
                    <Link href="/admin/add-product" className="bg-black text-white px-4 py-2">
                        Add Product
                    </Link>
                )}
            </div>

            {products.map(p => (
                <div key={p.ID} className="border p-3 mb-2">
                    <h2>{p.Name}</h2>
                    <p>{p.Description}</p>
                    <p>{p.Stock}</p>
                    <p>₹{p.Price}</p>
                </div>
            ))}
        </div>
    );
}