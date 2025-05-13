"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NodeLabel from "./NodeLabel";
import Image from "next/image";

const Tree = dynamic(() => import("react-d3-tree").then((mod) => mod.default), {
  ssr: false,
});

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface Props {
  fullTree: TreeNode;
  delay?: number;
}

export default function RecipeTree({ fullTree, delay = 500 }: Props) {
  const [displayedTree, setDisplayedTree] = useState<TreeNode | null>(null);
  const [revealQueue, setRevealQueue] = useState<TreeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [elementImages, setElementImages] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    fetch("/data/elements.json")
      .then((res) => res.json())
      .then((data) => setElementImages(data));
  }, []);

  useEffect(() => {
    if (!fullTree) return;

    const queue: TreeNode[] = [];
    const traverse = (node: TreeNode) => {
      queue.push(node);
      if (node.children) {
        node.children.forEach(traverse);
      }
    };
    traverse(fullTree);

    const cloneTree = (node: TreeNode): TreeNode => {
      const newNode: TreeNode = { name: node.name };
      if (node.children) {
        newNode.children = node.children.map(() => ({ name: "..." }));
      }
      return newNode;
    };

    const clonedRoot = cloneTree(fullTree);
    setDisplayedTree(clonedRoot);
    setRevealQueue(queue);
  }, [fullTree]);

  useEffect(() => {
    if (!revealQueue.length || !displayedTree) return;

    let index = 0;
    const timers: NodeJS.Timeout[] = [];

    const revealNext = () => {
      const targetName = revealQueue[index].name;

      const updateTree = (target: TreeNode, original: TreeNode): TreeNode => {
        if (target.name === targetName) {
          return cloneTreeRecursive(original);
        }
        if (target.children && original.children) {
          return {
            ...target,
            children: target.children.map((child, i) =>
              updateTree(child, original.children![i])
            ),
          };
        }
        return target;
      };

      const cloneTreeRecursive = (node: TreeNode): TreeNode => {
        return {
          name: node.name,
          children: node.children?.map(cloneTreeRecursive),
        };
      };

      const newTree = updateTree(displayedTree, fullTree);
      setDisplayedTree(newTree);

      index++;
      if (index < revealQueue.length) {
        timers.push(setTimeout(revealNext, delay));
      }
    };

    const timer = setTimeout(revealNext, delay);
    timers.push(timer);

    return () => timers.forEach(clearTimeout);
  }, [revealQueue, displayedTree, fullTree, delay]);

  const renderPopupContent = () => {
    if (!selectedNode) return null;
    const isCombined = selectedNode.name.includes("+");
    const [left, right] = isCombined
      ? selectedNode.name.split("+").map((s) => s.trim())
      : [selectedNode.name.trim(), null];
    const leftImage = elementImages[left.toLowerCase()];
    const rightImage = right ? elementImages[right.toLowerCase()] : null;

    return (
      <div
        className="relative w-60 h-60 bg-[#1c1a33] text-white 
        shadow-xl border-2 border-transparent rounded-xl 
        before:absolute before:inset-0 before:rounded-xl 
        before:bg-gradient-to-br before:from-purple-400 before:to-pink-600 
        before:blur-md before:z-[-1] flex flex-col items-center justify-center gap-4"
      >
        <button
          onClick={() => setSelectedNode(null)}
          className="absolute top-2 right-2 text-white hover:text-pink-400 text-xl"
        >
          ✖
        </button>

        <div className="flex items-center justify-center gap-4">
          {leftImage && (
            <Image
              src={leftImage}
              alt={left}
              width={64}
              height={64}
              className="object-contain"
            />
          )}
          {right && rightImage && (
            <>
              <span className="text-pink-400 font-bold text-lg">+</span>
              <Image
                src={rightImage}
                alt={right}
                width={64}
                height={64}
                className="object-contain"
              />
            </>
          )}
        </div>

        <p className="text-base font-semibold capitalize text-center px-4">
          {selectedNode.name}
        </p>
      </div>
    );
  };
  

  return (
    <div className="w-full h-full relative">
      {displayedTree && (
        <Tree
          data={displayedTree}
          orientation="vertical"
          collapsible={false}
          zoomable
          pathFunc="diagonal"
          pathClassFunc={() => "link"}
          renderCustomNodeElement={(rd3tProps) => (
            <NodeLabel {...rd3tProps} onClick={setSelectedNode} />
          )}
          nodeSize={{ x: 200, y: 200 }}
          translate={{ x: 400, y: 100 }}
          separation={{ siblings: 1.5, nonSiblings: 2 }}
        />
      )}

      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          {renderPopupContent()}
        </div>
      )}
    </div>
  );
}
