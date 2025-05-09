"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NodeLabel from "./NodeLabel";

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

  useEffect(() => {
    if (!fullTree) return;

    // Prepare queue of all nodes in pre-order traversal
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

  return (
    <div className="w-full h-full">
      {displayedTree && (
        <Tree
          data={displayedTree}
          orientation="vertical"
          collapsible={false}
          zoomable
          translate={{ x: 300, y: 100 }}
          pathFunc="elbow"
          renderCustomNodeElement={(rd3tProps) => <NodeLabel {...rd3tProps} />}
          nodeSize={{ x: 160, y: 100 }} // (atur jarak antar node)
          separation={{ siblings: 1.5, nonSiblings: 2 }}
        />
      )}
    </div>
  );
}