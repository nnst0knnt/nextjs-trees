import { procedure } from "@/utils/trpc/factories";

import type { Edge, Tree } from "../types";

export const listTrees = procedure.query(async ({ ctx: { db } }) => {
  const roots = await db.root.findMany({
    include: {
      edges: {
        include: {
          parent: true,
          child: true,
        },
      },
    },
  });

  return roots.flatMap(
    (root): Tree => ({
      id: root.id,
      name: root.name,
      level: null,
      children: buildTree(root.edges),
    }),
  );
});

/**
 * エッジから木構造を生成する
 */
const buildTree = (edges: Edge[]): Tree[] => {
  /**
   * フラットなノードを生成する
   */
  const nodes = new Map<number, Tree>();
  for (const { parent, child, level } of edges) {
    if (!nodes.has(child.id)) {
      nodes.set(child.id, {
        id: child.id,
        name: child.name,
        level,
        children: [],
      });
    }
    if (parent && !nodes.has(parent.id)) {
      nodes.set(parent.id, {
        id: parent.id,
        name: parent.name,
        level,
        children: [],
      });
    }
  }

  /**
   * 親子関係を元に木構造を生成する
   */
  const trees: Tree[] = [];
  for (const edge of edges) {
    const node = nodes.get(edge.child.id);

    if (!node) continue;

    const parent = edge.parent ? nodes.get(edge.parent.id) : null;

    if (parent) {
      parent.children.push(node);
      continue;
    }

    trees.push(node);
  }

  return trees;
};
