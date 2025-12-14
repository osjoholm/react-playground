"use client";
import React, { useState } from "react";
import { JSX } from "react";
import { CiFolderOn } from "react-icons/ci";

type TreeNode = {
  name: string;
  children?: TreeNode[];
};

function Entry({
  node,
  depth
}: {
  node: TreeNode;
  depth: number;
}): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  return (
    <div key={node.name} className="ml-4">
      <button onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-row">
          {node.children && <CiFolderOn className="mr-2" />}
          {node.name}
        </div>
      </button>
      {node.children && expanded && (
        <div>
          {node.children.map((child) => (
            <Entry key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

const sampleTree: TreeNode[] = [
  {
    name: "public",
    children: [
      {
        name: "images",
        children: [{ name: "image1.jsp" }, { name: "image2.jsp" }]
      },
      {
        name: "index.html"
      }
    ]
  }
];

export default function App() {
  return (
    <div className="flex w-full">
      {sampleTree.map((node) => (
        <Entry key={node.name} node={node} depth={0} />
      ))}
    </div>
  );
}
