import type { NullableProperties } from "@/types/utilities";
import { db } from "@/utils/db";
import type { Node, Prisma, Root } from "@prisma/client";

const toLetter = (number: number): string => {
  if (number <= 0) {
    return "";
  }

  let letter = "";
  let index = number - 1;

  while (index >= 0) {
    letter = String.fromCharCode((index % 26) + "A".charCodeAt(0)) + letter;
    index = Math.floor(index / 26) - 1;
  }

  return letter;
};

type GenerateCountArgs = {
  min: number;
  max: number;
};
const generateCount = ({ min, max }: GenerateCountArgs) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

type GenerateTreeArgs = {
  root: Root;
  parent: Node | null;
  level: number;
  maxDepth: number;
};
const generateTree = async ({
  root,
  parent,
  level,
  maxDepth,
}: GenerateTreeArgs) => {
  const input = {
    nodes: [] as Prisma.NodeCreateInput[],
    edges: [] as NullableProperties<Prisma.EdgeUncheckedCreateInput>[],
  };
  for (let index = 1; index < maxDepth; index++) {
    input.nodes.push({
      name: toLetter(index),
    });

    input.edges.push({
      level,
      rootId: root.id,
      parentId: parent?.id ?? null,
      childId: null,
    });
  }

  const nodes = await db.node.createManyAndReturn({
    data: input.nodes,
    skipDuplicates: true,
  });
  await db.edge.createMany({
    data: nodes.map((node, index) => ({
      ...input.edges[index],
      childId: node.id,
    })) as Prisma.EdgeUncheckedCreateInput[],
  });

  if (level < maxDepth) {
    for await (const node of nodes) {
      await generateTree({
        root,
        parent: node,
        level: level + 1,
        maxDepth: generateCount({ min: 3, max: 5 }),
      });
    }
  }
};

type GenerateArgs = {
  min: number;
  max: number;
};
const generate = async ({ min, max }: GenerateArgs) => {
  for (let index = 1; index <= generateCount({ min, max }); index++) {
    const root = await db.root.create({
      data: {
        name: toLetter(index),
      },
    });

    await generateTree({
      root,
      parent: null,
      level: 1,
      maxDepth: generateCount({ min, max }),
    });
  }
};

const main = async () => await generate({ min: 5, max: 10 });

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
