"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import RecipeTree from "@/components/RecipeTree";
import { fetchRecipe } from "@/lib/api";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export default function AppPage() {
  const [trees, setTrees] = useState<TreeNode[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [info, setInfo] = useState<{ time: number; nodes: number } | null>(
    null
  );
  const [live, setLive] = useState(true);

  const handleSubmit = async (
    element: string,
    algorithm: string,
    multiple: boolean,
    maxRecipe: number,
    liveUpdate: boolean
  ) => {
    try {
      const data = await fetchRecipe(element, algorithm, multiple, maxRecipe);

      const treeArray = Array.isArray(data.tree) ? data.tree : [data.tree];
      const limitedTrees = multiple ? treeArray : [treeArray[0]];

      setTrees(limitedTrees);
      setInfo({ time: data.time, nodes: data.nodes });
      setLive(liveUpdate);
      setCurrentPage(0);
    } catch (err) {
      alert("Gagal mengambil recipe. Coba lagi.");
    }
  };

  return (
    <main className="flex flex-col bg-[#2b1055] text-[#e0e6f5] min-h-screen">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 space-y-4 px-8 pt-24 md:pt-[85px] pb-8 relative overflow-hidden bg-gradient-to-b from-[#2b1055] via-[#27104d] to-[#1a093d]">
          <div className="absolute inset-0 bg-[url('/image/sidebar.png')] bg-no-repeat bg-bottom bg-cover opacity-30 pointer-events-none z-0" />

          <div className="relative z-10">
            <SearchForm onSubmit={handleSubmit} />
            {info && (
              <div className="mt-4 space-y-2">
                <p className="text-[#f5c542] text-xs font-medium">Result :</p>
                <div className="border border-[#6b3fa0] rounded-lg p-3 text-xs space-y-1 bg-[#2b1055]/40">
                  <p>
                    ⏱️ Time:{" "}
                    <span className="text-[#f5c542]">{info.time} ms</span>
                  </p>
                  <p>
                    🧩 Nodes visited:{" "}
                    <span className="text-[#f5c542]">{info.nodes}</span>
                  </p>
                </div>

                {trees.length > 1 && (
                  <div className="flex justify-center items-center gap-4 pt-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                      disabled={currentPage === 0}
                      className="px-2 py-1 bg-[#f5c542] text-black text-sm rounded disabled:opacity-30 hover:cursor-pointer"
                    >
                      <HiChevronLeft size={16} />
                    </button>
                    <span className="text-sm text-[#e0e6f5]">
                      Tree {currentPage + 1} of {trees.length}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, trees.length - 1))
                      }
                      disabled={currentPage === trees.length - 1}
                      className="px-2 py-1 bg-[#f5c542] text-black text-sm rounded disabled:opacity-30 hover:cursor-pointer"
                    >
                      <HiChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tree visualization */}
        <div className="px-2 sm:px-0 w-full md:w-2/3 bg-[#2b1055] h-screen overflow-y-auto rounded-tl-3xl">
          {trees.length > 0 ? (
            <RecipeTree fullTree={trees[currentPage]} delay={live ? 500 : 0} />
          ) : (
            <div className="text-center mt-32 text-[#a9a9c4] text-lg italic">
              ✨ Start your search and uncover the path to magic! ✨
            </div>
          )}
        </div>
      </div>
    </main>
  );
}