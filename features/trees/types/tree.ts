import type { Prisma } from "@prisma/client";

export type Root = Prisma.RootGetPayload<object>;

export type Tree = Prisma.NodeGetPayload<object> & {
  level: number | null;
  children: Tree[];
};

export type Edge = Prisma.EdgeGetPayload<{
  include: {
    parent: true;
    child: true;
  };
}>;
