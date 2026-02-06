"use client";


import {useState} from "react";
import {saveAuthToken} from "../../utils/auth.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try{
            const res = await fetch("http://localhost:8089/api/auth/login",{
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({email, password}),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            saveAuthToken(data.token);
            toast.success('Login successful');
            navigate('/products');
        
        }catch (err: any) {
            toast.error(err.message);
        }
    };

    return(
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            <input
                className="border p-2 w-full md-3"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)} />
            <input
                className="border p-2 w-full md-3"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)} />
            <button className="bg-black text-white px-4 py-2 w-full" onClick={login}>Login</button>
        </div>
    );
}