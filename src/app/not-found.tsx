import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-center bg-cover bg-[#27104d] flex flex-col items-center justify-center text-[#f5c542] px-6"
      style={{
        backgroundImage: "url('/image/notfound.jpg')",
      }}
    >
      <h1 className="text-xl sm:text-4xl font-bold mb-4">
        404 - Page Not Found
      </h1>
      <p className="mb-8 text-xs sm:text-sm text-white text-center max-w-md">
        The page you&apos;re seeking has been lost in a swirl of arcane mists
        and forgotten spells. Perhaps it was spirited away to another realm or
        never existed at all.
      </p>
      <Link
        href="/"
        className="text-xs sm:text-sm bg-[#6b3fa0] hover:bg-[#5c3491] text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer"
      >
        Return to the Portal
      </Link>
    </div>
  );
}
