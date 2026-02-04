'use client';

import {useEffect, useState} from "react";
import SignUp from "@/app/signup/page";
import {Route, BrowserRouter, Routes} from "react-router";
import Login from "@/app/login/page";
import Products from "@/app/products/page";

export default function Home(){
    const [status, setStatus] = useState('');

    // useEffect(() => {
    //   fetch('http://localhost:8080/health')
    //       .then(res => res.json())
    //       .then(data => setStatus(data.status));
    // }, []);

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products/>} />
            </Routes>
        </BrowserRouter>
    );
}