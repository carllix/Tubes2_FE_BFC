"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ElementData {
  [name: string]: string;
}

export default function ElementsPage() {
  const [elements, setElements] = useState<ElementData>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(12);

  useEffect(() => {
    fetch("/data/elements.json")
      .then((res) => res.json())
      .then((data) => setElements(data));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setElementsPerPage(12);
      } else if (window.innerWidth >= 768) {
        setElementsPerPage(10);
      } else {
        setElementsPerPage(12);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredElements = Object.entries(elements);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredElements.length / elementsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredElements.length, totalPages, currentPage]);

  const currentElements = filteredElements.slice(
    (currentPage - 1) * elementsPerPage,
    currentPage * elementsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-[#27104d] px-10 py-24 text-white">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#f5c542]">
        Discover Elements in Little Alchemy 2
      </h1>

      <div className="flex flex-col min-h-[250px]">
        <div className="flex-grow mb-4">
          {currentElements.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 justify-center">
              {currentElements.map(([name, img]) => (
                <div
                  key={name}
                  className="bg-gradient-to-br from-purple-800/40 to-purple-950/80 border border-purple-500/20 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out backdrop-blur-sm"
                >
                  <div className="w-16 h-16 relative">
                    <Image
                      src={img}
                      alt={name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <span className="mt-3 text-sm text-purple-100 capitalize text-center">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-purple-200 my-12">
              No elements available.
            </p>
          )}
        </div>

        <div className="mt-4">
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-2 bg-purple-700 disabled:opacity-40 rounded-full hover:bg-purple-800 w-8 h-8 flex items-center justify-center hover:cursor-pointer"
            >
              <FaChevronLeft className="text-sm" />
            </button>

            <span className="text-purple-300 px-2">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-2 bg-purple-700 disabled:opacity-40 rounded-full hover:bg-purple-800 w-8 h-8 flex items-center justify-center hover:cursor-pointer"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
