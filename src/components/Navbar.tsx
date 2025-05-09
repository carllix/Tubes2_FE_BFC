"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const navItemClass = (path: string) =>
    `relative hover:text-[#f5c542] transition ${
      pathname === path
        ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#f5c542]"
        : ""
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1c1a33]/50 backdrop-blur-md text-[#e0e6f5] px-10 py-4 flex justify-between items-center shadow-lg border-b border-[#6b3fa0]/30">
      <span className="text-xl font-bold text-[#f5c542] drop-shadow">
        ✨ Alchemy 2 Finder
      </span>
      <div className="space-x-8 flex items-center">
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