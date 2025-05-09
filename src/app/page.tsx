"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const sparkle = document.createElement("div");
      sparkle.style.position = "fixed";
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      sparkle.style.width = "8px";
      sparkle.style.height = "8px";
      sparkle.style.borderRadius = "50%";
      sparkle.style.background = "#f5c542";
      sparkle.style.pointerEvents = "none";
      sparkle.style.zIndex = "9999";
      sparkle.style.boxShadow = "0 0 10px #f5c542";
      sparkle.style.opacity = "0.8";
      sparkle.style.transition = "all 0.3s ease-out";

      document.body.appendChild(sparkle);
      setTimeout(() => {
        sparkle.style.opacity = "0";
        sparkle.remove();
      }, 300);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-center text-[#e0e6f5] px-4"
      style={{
        backgroundImage: "url('/image/landing.jpg')",
      }}
    >
      <div className="space-y-6 bg-[#1c1a33]/70 p-8 rounded-xl shadow-lg">
        <h1 className="text-5xl font-bold text-[#f5c542] drop-shadow-lg">
          ✨ Welcome to Alchemy 2 Finder ✨
        </h1>
        <p className="text-lg text-[#e0e6f5]">
          Discover how to create any element in Little Alchemy 2 using
          algorithmic magic!
        </p>
        <button
          onClick={() => router.push("/app")}
          className="bg-[#6b3fa0] hover:bg-[#5c3491] text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
        >
          Begin Your Quest 🔮
        </button>
      </div>
    </main>
  );
}
