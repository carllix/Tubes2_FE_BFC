"use client";

import { useState } from "react";

export default function HelloSection() {
  const [message, setMessage] = useState("");

  const getHello = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/hello");
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error("Gagal fetch dari backend:", err);
    }
  };

  return (
    <div className="p-20 bg-purple-900 rounded-lg text-white space-y-4">
      <button
        onClick={getHello}
        className="px-4 py-2 bg-[#f5c542] text-black font-semibold rounded"
      >
        Get Hello from Go
      </button>
      {message && <p className="text-lg">🎉 {message}</p>}
    </div>
  );
}