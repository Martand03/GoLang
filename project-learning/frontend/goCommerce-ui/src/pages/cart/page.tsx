"use client";

import {useEffect, useState} from "react";
import {apiFetch} from "../../utils/api.ts";
import {toast} from "react-toastify";

export default function Cart(){
    const[items, setItems] = useState<any[]>([]);

    useEffect(() => {
        apiFetch('http://localhost:8089/api/cart').then(setItems);
    },[]);

    const placeOrder = async () =>{
        try{
            await apiFetch("http://localhost:8089/api/orders",{
                method: 'POST'
            });
            toast.success("Order Placed Successfully !!")
            setItems([]);
        }catch (err: any){
            toast.error(err.message);
        }
    }

return (
  <div className="px-4 py-12 max-w-4xl mx-auto">
    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Cart</h1>

    {items.length === 0 ? (
      <p className="text-gray-600 text-center">Your cart is empty.</p>
    ) : (
      <div className="grid grid-cols-1 gap-6">
        {items.map(i => (
          <div
            key={i.ID}
            className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition"
          >
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Product #{i.ProductId}
              </p>
              <p className="text-gray-500">Quantity: {i.Quantity}</p>
            </div>

            <div className="flex gap-2">
                <button className="nav-btn-primary" onClick={placeOrder}>
                    Place Order
                </button>
              <button
                // onClick={() => removeFromCart(i.ID)}
                className="rounded-lg bg-red-500 text-white px-4 py-2 font-medium hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

}