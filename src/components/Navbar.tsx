"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname === "/") return null;

  const navItemClass = (path: string) => `
    relative transition-all duration-300 hover:text-[#f5c542]
    ${
      pathname === path
        ? "text-[#f5c542] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#f5c542] after:transition-all after:duration-300 after:scale-x-100 after:origin-left"
        : "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#f5c542] after:transition-all after:duration-300 after:scale-x-0 after:origin-left hover:after:scale-x-100"
    }
  `;

  const mobileNavItemClass = (path: string) => `
    text-xl font-medium py-4 w-full text-center transition-all duration-300 hover:text-[#f5c542]
    ${pathname === path ? "text-[#f5c542]" : "text-[#e0e6f5]"}
  `;

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`
        fixed top-0 left-0 w-full z-50 
        ${scrolled ? "bg-[#1c1a33]/70" : "bg-[#1c1a33]/50"} 
        backdrop-blur-md text-[#e0e6f5] px-4 md:px-10 py-4 
        flex justify-between items-center shadow-lg 
        border-b border-[#6b3fa0]/30 transition-all duration-300
      `}
      >
        <span className="text-lg md:text-xl font-bold text-[#f5c542] drop-shadow">
          ✨ Alchemy 2 Finder
        </span>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center text-sm">
          <Link href="/" className={navItemClass("/")}>
            Home
          </Link>
          <Link href="/app" className={navItemClass("/app")}>
            App
          </Link>
          <Link href="/elements" className={navItemClass("/elements")}>
            Elements
          </Link>
          <Link href="/about" className={navItemClass("/about")}>
            About
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#e0e6f5] focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <HiX className="w-6 h-6 text-[#f5c542]" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-[#1c1a33] flex flex-col items-center justify-center
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
          <Link
            href="/"
            className={mobileNavItemClass("/")}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/app"
            className={mobileNavItemClass("/app")}
            onClick={() => setIsMenuOpen(false)}
          >
            App
          </Link>
          <Link
            href="/elements"
            className={mobileNavItemClass("/elements")}
            onClick={() => setIsMenuOpen(false)}
          >
            Elements
          </Link>
          <Link
            href="/about"
            className={mobileNavItemClass("/about")}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </>
  );
}
