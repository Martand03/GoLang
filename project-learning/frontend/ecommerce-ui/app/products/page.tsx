"use client";

import { useEffect, useState } from "react";

export default function Products(){
    const[products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:8089/api/products",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res => res.json())
        .then(setProducts);
    }, []);

    return(
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            {products.map(p =>(
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