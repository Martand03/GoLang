'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const router = useRouter();

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
            router.push('/products');
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Add Product</h1>
            <input className="border p-2 w-full mb-3" placeholder="Name" onChange={e => setName(e.target.value)} />
            <input className="border p-2 w-full mb-3" placeholder="Price" onChange={e => setPrice(e.target.value)} />
            <input className="border p-2 w-full mb-3" placeholder="Stock" onChange={e => setStock(e.target.value)} />
            <button className="bg-black text-white w-full py-2" onClick={submit}>
                Add
            </button>
        </div>
    );
}
