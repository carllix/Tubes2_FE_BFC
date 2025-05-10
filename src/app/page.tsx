"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-center text-[#e0e6f5] px-4"
      style={{
        backgroundImage: "url('/image/landing.jpg')",
      }}
    >
      <div className="space-y-6 bg-[#1c1a33]/70 p-8 rounded-xl shadow-lg">
        <h1 className="text-lg sm:text-3xl md:text-5xl font-bold text-[#f5c542] drop-shadow-lg">
          ✨ Welcome to Alchemy 2 Finder ✨
        </h1>
        <p className="text-sm sm:text-lg text-[#e0e6f5]">
          Discover how to create any element in Little Alchemy 2 using
          algorithmic magic!
        </p>
        <button
          onClick={() => router.push("/app")}
          className="text-xs sm:text-sm bg-[#6b3fa0] hover:bg-[#5c3491] text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
        >
          Begin Your Quest 🔮
        </button>
      </div>
    </main>
  );
}
