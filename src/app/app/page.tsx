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
    mode: string,
    maxRecipe: number,
    liveUpdate: boolean
  ) => {
    try {
      const data = await fetchRecipe(element, algorithm, mode, maxRecipe);
      console.log(data);
      setTree(data.tree);
      setInfo({ time: data.time, nodes: data.nodes });
      setLive(liveUpdate);
    } catch (err) {
      alert("Gagal mengambil recipe. Coba lagi.");
    }
  };

  return (
    <main className="flex flex-col bg-[#380028] h-screen text-white">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/3 space-y-4 px-8 pt-20">
          <SearchForm onSubmit={handleSubmit} />
          {info && (
            <div className="mt-4 space-y-4">
              <p>Info Stats: </p>
              <div className="border border-white rounded-md p-3 text-sm text-white space-y-2">
                <p>Waktu pencarian: {info.time} ms</p>
                <p>Node dikunjungi: {info.nodes}</p>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-2/3 bg-[#470133] h-screen py-10">
          {tree && <RecipeTree fullTree={tree} delay={live ? 500 : 0} />}
        </div>
      </div>
    </main>
  );
}