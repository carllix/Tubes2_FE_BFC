"use client";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[#380028] text-center  text-[#FAA620] px-4">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold">
          Welcome to Alchemy 2 Finder
        </h1>
        <p className="text-lg text-amber-200">
          Discover how to create any element in Little Alchemy 2 using
          algorithmic magic!
        </p>
        <button
          onClick={() => router.push("/app")}
          className="bg-[#927DE4] text-white px-6 py-3 rounded-lg shadow hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Getting Started
        </button>
      </div>
    </main>
  );
}