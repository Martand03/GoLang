'use client';

import {useEffect, useState} from "react";

export default function Home(){
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/health')
        .then(res => res.json())
        .then(data => setStatus(data.status));
  }, []);

  return(
      <main className="p-10">
        <h1 className="text-2xl font-bold">Go + Next.js Ecommerce</h1>
        <p className="mt-4">Backend Status: {status}</p>
      </main>
  );
}