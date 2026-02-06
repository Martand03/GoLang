"use client";

import {useEffect, useState} from "react";
import {apiFetch} from "../../utils/api.ts";

export default function Cart(){
    const[items, setItems] = useState<any[]>([]);

    useEffect(() => {
        apiFetch('http://localhost:8089/api/cart').then(setItems);
    },[]);

    return(
        <div className="p-10">
            <h1 className="text-xl font-bold mb-4">Cart</h1>
            {items.map(i => (
                <div key={i.ID} className="border p-3 mb-2">
                    Product #{i.ProductId} | Quantity: {i.Quantity}
                </div>
            ))}
        </div>
    );
}