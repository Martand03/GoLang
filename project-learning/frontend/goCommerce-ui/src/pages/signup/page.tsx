'use client';

import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function SignUp(){
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    const signUp = async () =>{
        try{
            const res = await fetch('http://localhost:8089/api/auth/signup',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email,password}),
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.error);

            toast.success("Signup Successful");
            navigate("/login");

        }catch (err: any){
            toast.error(err.message);
        }
    };

    return(
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">SignUp</h1>
            <input
                className="border p-2 w-full mb-3"
                placeholder="Email"
                onChange={event => setEmail(event.target.value)}
            />
            <input
                className="border p-2 w-full mb-3"
                placeholder="Password"
                onChange={event => setPassword(event.target.value)}
            />

            <button
                className="bg-black text-white px-4 py-2 w-full"
                onClick={signUp}
            >
                SignUp
            </button>
        </div>
    );
}