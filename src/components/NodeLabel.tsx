"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface NodeDatum {
  name: string;
  children?: NodeDatum[];
}

interface CustomNodeProps {
  nodeDatum: NodeDatum;
}

type ElementImageMap = Record<string, string>;

export default function NodeLabel({ nodeDatum }: CustomNodeProps) {
  const [elementImages, setElementImages] = useState<ElementImageMap>({});

  useEffect(() => {
    fetch("/data/elements.json")
      .then((res) => res.json())
      .then((data) => setElementImages(data));
  }, []);

  const isCombined = nodeDatum.name.includes("+");
  const [left, right] = isCombined
    ? nodeDatum.name.split("+").map((s) => s.trim())
    : [nodeDatum.name.trim(), null];

  const leftImage = elementImages[left.toLowerCase()];
  const rightImage = right ? elementImages[right.toLowerCase()] : null;

  const baseGradientMap: Record<string, string> = {
    fire: "from-red-400 to-red-800",
    water: "from-blue-400 to-blue-800",
    air: "from-slate-200 to-slate-400",
    earth: "from-green-400 to-green-800",
  };

  const baseElement = left.toLowerCase();
  const gradient = baseGradientMap[baseElement] || "from-purple-300 to-purple-900";

  return (
    <foreignObject width={145} height={140} x={-70} y={-60}>
      <div className="flex flex-col items-center">
        <div
          className={`w-24 h-24 rounded-full relative overflow-hidden
                      bg-gradient-to-b ${gradient}
                      border-2 border-purple-200
                      shadow-[0_0_15px_8px_rgba(147,51,234,0.3)]`}
        >
          <div className="absolute inset-0 opacity-40 bg-gradient-to-t from-transparent to-white rounded-full"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1/4 bg-white opacity-30 rounded-full transform -translate-y-1/2"></div>
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-white opacity-90 rounded-full"></div>
          <div className="absolute top-1/3 right-1/5 w-1 h-1 bg-white opacity-80 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white opacity-70 rounded-full"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            {isCombined ? (
              <>
                <div className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-center">
                  {leftImage && (
                    <Image
                      src={leftImage}
                      alt={left}
                      width={120}
                      height={120}
                      className="w-3/5 h-3/5 object-contain"
                    />
                  )}
                </div>
                <div className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-center">
                  {rightImage && (
                    <Image
                      src={rightImage}
                      alt={right!}
                      width={120}
                      height={120}
                      className="w-3/5 h-3/5 object-contain"
                    />
                  )}
                </div>
              </>
            ) : (
              leftImage && (
                <Image
                  src={leftImage}
                  alt={left}
                  width={120}
                  height={120}
                  className="w-3/5 h-3/5 object-contain"
                />
              )
            )}
          </div>
        </div>

        <div className="mt-3 text-center relative">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent -top-1"></div>
          <span
            className="text-base font-medium text-white px-3 py-1 rounded-lg
                       bg-gradient-to-r from-purple-800 via-purple-600 to-purple-800
                       border border-purple-300 border-opacity-40"
          >
            {nodeDatum.name}
          </span>
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent -bottom-1"></div>
        </div>
      </div>
    </foreignObject>
  );
}
