"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import ToggleSwitch from "./ToogleSwitch";
import Image from "next/image";

interface Props {
  onSubmit: (
    element: string,
    algorithm: string,
    multiple: boolean,
    maxRecipe: number,
    liveUpdate: boolean
  ) => void;
  loading: boolean;
}

type ElementOption = {
  value: string;
  label: string;
  image: string;
};

export default function SearchForm({ onSubmit, loading }: Props) {
  const [element, setElement] = useState<ElementOption | null>(null);
  const [elementOptions, setElementOptions] = useState<ElementOption[]>([]);
  const [algorithm, setAlgorithm] = useState("bfs");
  const [multiple, setmultiple] = useState(false);
  const [maxRecipe, setMaxRecipe] = useState(1);
  const [liveUpdate, setLiveUpdate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/elements.json")
      .then((res) => res.json())
      .then((data) => {
        const options = Object.entries(data).map(([name, url]) => {
          if (typeof url !== "string") {
            throw new Error(`Invalid URL: ${url}`);
          }
          return {
            value: name,
            label: name,
            image: url,
          };
        });
        setElementOptions(options);
      });
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (!element) {
          setError("Please select a target element.");
          return;
        }

        setError(null);
        onSubmit(element.value, algorithm, multiple, maxRecipe, liveUpdate);
      }}
      className="space-y-6 text-xs"
    >
      <div>
        <label className="block mb-2 text-[#f5c542] font-medium">
          Target Element:
        </label>
        {elementOptions.length > 0 && (
          <Select
            options={elementOptions}
            value={element}
            onChange={(selected) => {
              setElement(selected);
              if (error) setError(null);
            }}
            getOptionLabel={(e) => e.label}
            formatOptionLabel={(e) => (
              <div className="flex items-center gap-2">
                <Image src={e.image} alt={e.label} width={24} height={24} />
                <span className="capitalize">{e.label}</span>
              </div>
            )}
            className="text-black"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#1c1a33",
                borderColor: error ? "red" : "#6b3fa0",
                color: "white",
                cursor: "pointer",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#1c1a33",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#6b3fa0" : "#1c1a33",
                color: "white",
                cursor: "pointer",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
              input: (base) => ({
                ...base,
                color: "white",
              }),
            }}
          />
        )}
        {error && (
          <p className="text-red-400 mt-1 text-[10px] font-medium">{error}</p>
        )}
      </div>

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

      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between">
          <label className="text-[#f5c542] w-1/2">Recipe Mode:</label>
          {multiple && (
            <label className="text-[#f5c542] w-1/2">Max Recipes:</label>
          )}
        </div>

        <div className="flex items-center">
          <div className="w-1/2 px-0 py-2">
            <ToggleSwitch
              label="Multiple:"
              checked={multiple}
              onChange={() => setmultiple(!multiple)}
            />
          </div>

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

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#6b3fa0] hover:bg-[#5c3491] text-white p-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          <div className="flex justify-center items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Searching...</span>
          </div>
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
}
