"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItemClass = (path: string) =>
    `hover:underline transition ${
      pathname === path ? "border-b-1 border-[#FAA620]" : ""
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#380028] text-[#FAA620] px-10 py-4 flex justify-between items-center shadow-md">
      <span className="text-xl font-bold">Alchemy 2 Finder</span>
      <div className="space-x-8">
        <Link href="/" className={navItemClass("/")}>
          Home
        </Link>
        <Link href="/app" className={navItemClass("/app")}>
          App
        </Link>
        <Link href="/about" className={navItemClass("/about")}>
          About Us
        </Link>
      </div>
    </nav>
  );
}
