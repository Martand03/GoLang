"use client";

import {useState} from "react";
import {saveAuthToken} from "../../utils/auth.ts";
import {Link, useNavigate} from "react-router-dom";
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

return (
  <div className="min-h-[80vh] flex flex-col justify-center items-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      
      <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
        Login
      </h1>
      
      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={e => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={e => setPassword(e.target.value)}
        />
        
        <button
          onClick={login}
          className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold py-3 shadow-md hover:shadow-lg transition"
        >
          Login
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-indigo-600 hover:underline">
          Sign up
        </Link>
      </p>

    </div>
  </div>
);

}