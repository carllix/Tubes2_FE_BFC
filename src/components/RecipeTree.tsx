"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

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

  useEffect(() => {
    if (!fullTree) return;

    let queue: TreeNode[] = [];
    let timer: NodeJS.Timeout[] = [];

    const cloneAndClear = (node: TreeNode): TreeNode => {
      const newNode: TreeNode = { name: node.name };
      if (node.children) {
        queue.push(...node.children.map((c) => ({ ...c })));
        newNode.children = node.children.map(() => ({ name: "..." }));
      }
      return newNode;
    };

    const root = cloneAndClear(fullTree);
    setDisplayedTree(root);

    let currentLevel = [root];
    let index = 0;

    const updateNode = (node: TreeNode, realNode: TreeNode) => {
      if (!realNode.children) return;
      node.children = realNode.children.map((c) => cloneAndClear(c));
    };

    const revealStep = () => {
      if (!queue.length || index >= queue.length) return;
      let curr = queue[index];
      let path = findPath(fullTree, curr.name);
      if (!path) return;

      let target = displayedTree;
      for (let i = 1; i < path.length; i++) {
        target = target?.children?.find((c) => c.name === path[i - 1])!;
      }

      const realNode = findNode(fullTree, curr.name);
      if (target && realNode) updateNode(target, realNode);
      setDisplayedTree({ ...displayedTree! });

      index++;
      if (index < queue.length) {
        timer.push(setTimeout(revealStep, delay));
      }
    };

    timer.push(setTimeout(revealStep, delay));

    return () => {
      timer.forEach(clearTimeout);
    };
  }, [fullTree, delay]);

  const findPath = (
    node: TreeNode,
    target: string,
    path: string[] = []
  ): string[] | null => {
    if (node.name === target) return [...path, node.name];
    if (node.children) {
      for (let child of node.children) {
        const found = findPath(child, target, [...path, node.name]);
        if (found) return found;
      }
    }
    return null;
  };

  const findNode = (node: TreeNode, target: string): TreeNode | null => {
    if (node.name === target) return node;
    if (node.children) {
      for (let child of node.children) {
        const found = findNode(child, target);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div className="`w-full h-full">
      {displayedTree && (
        <Tree
          data={displayedTree}
          orientation="vertical"
          collapsible={false}
          zoomable
          translate={{ x: 300, y: 100 }}
        />
      )}
    </div>
  );
}