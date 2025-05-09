"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import RecipeTree from "@/components/RecipeTree";
import { fetchRecipe } from "@/lib/api";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export default function HomePage() {
  const [tree, setTree] = useState<TreeNode | null>(null);
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
      console.log(data);
      setTree(data.tree);
      setInfo({ time: data.time, nodes: data.nodes });
      setLive(liveUpdate);
    } catch (err) {
      alert("Gagal mengambil recipe. Coba lagi.");
    }
  };

  return (
    <main className="flex flex-col bg-[#2b1055] text-[#e0e6f5] min-h-screen">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 space-y-4 px-8 pt-20 pb-8 relative overflow-hidden bg-gradient-to-b from-[#2b1055] via-[#27104d] to-[#1a093d]">
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
              </div>
            )}
          </div>
        </div>

        {/* Tree visualization */}
        <div className="w-full md:w-2/3 bg-[#2b1055] h-screen overflow-y-auto p-6 rounded-tl-3xl">
          {tree ? (
            <RecipeTree fullTree={tree} delay={live ? 500 : 0} />
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