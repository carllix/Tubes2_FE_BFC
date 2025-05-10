"use client";

import { useState } from "react";
import ToggleSwitch from "./ToogleSwitch";

interface Props {
  onSubmit: (
    element: string,
    algorithm: string,
    multiple: boolean,
    maxRecipe: number,
    liveUpdate: boolean
  ) => void;
}

export default function SearchForm({ onSubmit }: Props) {
  const [element, setElement] = useState("");
  const [algorithm, setAlgorithm] = useState("bfs");
  const [multiple, setmultiple] = useState(false);
  const [maxRecipe, setMaxRecipe] = useState(1);
  const [liveUpdate, setLiveUpdate] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(element, algorithm, multiple, maxRecipe, liveUpdate);
      }}
      className="space-y-6 text-xs"
    >
      {/* Target Element Input */}
      <div>
        <label className="block mb-2 text-[#f5c542] font-medium">
          Target Element:
        </label>
        <input
          type="text"
          placeholder="e.g. Brick, Water, Metal"
          value={element}
          onChange={(e) => setElement(e.target.value)}
          className="border border-[#6b3fa0] rounded-md px-3 py-2 w-full bg-transparent text-white placeholder-[#a9a9c4] shadow-sm"
          required
        />
      </div>

      {/* Algorithm Selector */}
      <div className="space-y-1">
        <label className="block mb-2 text-[#f5c542] font-medium">
          Algorithm:
        </label>
        <div className="flex w-full rounded-md overflow-hidden shadow-inner">
          {["bfs", "dfs", "bidirectional"].map((alg, idx) => (
            <button
              key={alg}
              type="button"
              onClick={() => setAlgorithm(alg)}
              className={`hover:cursor-pointer flex-1 px-4 py-2 md:text-[10px] lg:text-xs font-medium transition duration-200 ease-in-out
            ${
              algorithm === alg
                ? "bg-[#6b3fa0] text-white"
                : "bg-[#e0e6f5] text-[#1c1a33] hover:bg-[#d1d5f0]"
            }
            ${idx === 0 ? "rounded-l-md" : ""}
            ${idx === 2 ? "rounded-r-md" : ""}
          `}
            >
              {alg.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Mode + Max Recipes */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between">
          <label className="text-[#f5c542] w-1/2">Recipe Mode:</label>
          {multiple && (
            <label className="text-[#f5c542] w-1/2">Max Recipes:</label>
          )}
        </div>

        <div className="flex items-center">
          {/* Multiple Toggle */}
          <div className="w-1/2 px-0 py-2">
            <ToggleSwitch
              label="Multiple:"
              checked={multiple}
              onChange={() => setmultiple(!multiple)}
            />
          </div>

          {/* Max Recipes Input */}
          <div className="w-1/4">
            {multiple && (
              <input
                type="number"
                placeholder="e.g. 5"
                value={maxRecipe}
                onChange={(e) => setMaxRecipe(Number(e.target.value))}
                className="border border-[#6b3fa0] p-2 rounded-md w-full bg-transparent text-white placeholder-[#a9a9c4]"
                min={1}
              />
            )}
          </div>
        </div>
      </div>

      {/* Live Update Toggle */}
      <div>
        <ToggleSwitch
          label="Live Update:"
          checked={liveUpdate}
          onChange={() => setLiveUpdate(!liveUpdate)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#6b3fa0] hover:bg-[#5c3491] text-white p-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}