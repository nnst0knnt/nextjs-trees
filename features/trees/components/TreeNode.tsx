"use client";

import { Badge, Collapse, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronRight,
  IconLeaf,
  IconMinus,
  IconSeedingFilled,
  IconWood,
} from "@tabler/icons-react";

import type { Tree } from "../types";

type TreeNodeProps = {
  tree: Tree;
};

export const TreeNode = ({ tree }: TreeNodeProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  const isRoot = tree.level === null;
  const hasChildren = tree.children.length > 0;

  return (
    <div className="min-w-max">
      <button
        type="button"
        onClick={toggle}
        className={`w-full flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 ${
          hasChildren ? "cursor-pointer" : "cursor-default pointer-events-none"
        }`}
      >
        <Group className="flex-nowrap items-center gap-x-2">
          <div className="flex-shrink-0 flex flex-row items-center gap-x-2">
            {hasChildren ? (
              opened ? (
                <IconChevronDown color="gray" stroke={3} size={18} />
              ) : (
                <IconChevronRight color="gray" stroke={3} size={18} />
              )
            ) : (
              <IconMinus color="gray" stroke={3} size={18} />
            )}
            <div className="relative">
              <div
                className={`flex-shrink-0 p-1 rounded-full ${
                  isRoot
                    ? "bg-amber-100 text-amber-800"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {isRoot ? (
                  <IconWood size={18} />
                ) : hasChildren ? (
                  <IconSeedingFilled size={18} />
                ) : (
                  <IconLeaf size={18} fill="#16a34a" />
                )}
              </div>
            </div>
          </div>
          <Badge
            color="gray"
            variant="light"
            size="lg"
            className="bg-gray-100 text-gray-500 border border-gray-300 px-4 py-2 font-bold"
          >
            {isRoot ? `Root ${tree.name}` : `Depth ${tree.level} ${tree.name}`}
          </Badge>
        </Group>
      </button>
      {hasChildren && (
        <Collapse in={opened} transitionDuration={300}>
          <div className="ml-4 mt-1 border-l-2 border-gray-200 pl-2 space-y-2">
            {tree.children.map((child) => (
              <TreeNode key={child.id} tree={child} />
            ))}
          </div>
        </Collapse>
      )}
    </div>
  );
};
