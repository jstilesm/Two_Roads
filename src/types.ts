// Basic Node Typing

export type Choice = {
    id: string
    observation: string
}

export type InternalNode = {
    id: string
    depth: number
    leaf: false
    choices: Choice[]
    children: TreeNode[]
}

export type LeafNode = {
    id: string
    depth: number
    leaf: true
    outcome: "death" | "monster" | "treasure"
    description: string
}
export type DungeonData = {
  meta: {
    title: string;
    theme: string;
    inspiration: string;
    link: string;
    maxDepth: number;
    nodeCount: number;
    outcomeLegend: Record<"death" | "monster" | "treasure", string>;
  };
  tree: TreeNode;
};

export type TreeNode = InternalNode | LeafNode