"use client";

import { useState } from "react";
import ToggleSwitch from "./ToogleSwitch";

interface Props {
  onSubmit: (
    element: string,
    algorithm: string,
    mode: string,
    maxRecipe: number,
    liveUpdate: boolean
  ) => void;
}

export default function SearchForm({ onSubmit }: Props) {
  const [element, setElement] = useState("");
  const [algorithm, setAlgorithm] = useState("bfs");
  const [mode, setMode] = useState("shortest");
  const [maxRecipe, setMaxRecipe] = useState(1);
  const [liveUpdate, setLiveUpdate] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(element, algorithm, mode, maxRecipe, liveUpdate);
      }}
      className="space-y-4 text-sm"
    >
      <div>
        <label className="block mb-2">Target Element:</label>
        <input
          type="text"
          placeholder="e.g. Brick, Water, Metal"
          value={element}
          onChange={(e) => setElement(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block mb-2">Algorithm:</label>
        <div className="flex w-full rounded-md overflow-hidden">
          {["bfs", "dfs", "bidirectional"].map((alg, idx) => (
            <button
              key={alg}
              type="button"
              onClick={() => setAlgorithm(alg)}
              className={`flex-1 px-4 py-2 text-sm font-medium hover:cursor-pointer transition-colors duration-200 ease-in-out
          ${
            algorithm === alg
              ? "bg-[#FAA620] text-white"
              : "bg-white text-gray-800 hover:bg-gray-100"
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

      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between">
          <label className="text-sm text-white w-3/4">
            Recipe Mode:
          </label>
          {mode === "multiple" && (
            <label className="text-sm text-white w-1/3">
              Max Recipes:
            </label>
          )}
        </div>

        <div className="flex gap-4 items-center">
          <div className="w-2/3">
            <div className="flex items-center border border-gray-300 rounded-full px-1 py-1 bg-white">
              {["shortest", "multiple"].map((opt) => (
                <button
                key={opt}
                type="button"
                onClick={() => setMode(opt)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-1 rounded-full transition-all duration-200
                  ${mode === opt ? "font-semibold text-black" : "text-gray-400"}`}              
                >
                  {mode === opt && (
                    <span className="w-3 h-3 bg-[#FAA620] rounded-full inline-block" />
                  )}
                  <span>{opt === "shortest" ? "Shortest" : "Multiple"}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-1/3">
            {mode === "multiple" && (
              <input
                type="number"
                placeholder="e.g. 5"
                value={maxRecipe}
                onChange={(e) => setMaxRecipe(Number(e.target.value))}
                className="border p-2 rounded-md w-full bg-transparent text-white"
                min={1}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <ToggleSwitch
          label="Live Update:"
          checked={liveUpdate}
          onChange={() => setLiveUpdate(!liveUpdate)}
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full bg-[#927DE4] text-white p-2 rounded-md shadow hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-101"
      >
        Search
      </button>
    </form>
  );
}