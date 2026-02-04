"use client";


import {useState} from "react";

export default function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const login = async () => {
        const res = await fetch("http://localhost:8089/api/auth/login",{
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({email, password}),
        });

        const data = await res.json();
        localStorage.setItem("token", data.token);
        alert('Login successful');
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