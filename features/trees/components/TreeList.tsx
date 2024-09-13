import { Container, Paper, ScrollArea, Title } from "@mantine/core";
import { IconTree } from "@tabler/icons-react";

import { trpc } from "@/utils/trpc/server";

import { TreeNode } from "./TreeNode";

export const TreeList = async () => {
  const trees = await trpc.trees.list();

  return (
    <div className="min-h-dvh bg-gradient-to-br from-teal-50 via-emerald-100 to-cyan-200 p-4 lg:p-8">
      <Container size="lg" className="min-h-dvh">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 via-emerald-500 to-green-400 shadow-xl">
          <div className="relative flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <IconTree
                size={48}
                className="text-white filter drop-shadow-lg"
              />
              <Title
                order={1}
                className="text-3xl font-bold text-white drop-shadow-md"
              >
                Next.js Trees
              </Title>
            </div>
          </div>
        </div>
        <Paper
          shadow="lg"
          radius="md"
          p="md"
          className="bg-white bg-opacity-80 backdrop-blur-sm rounded-md mt-4"
        >
          <ScrollArea
            className="overflow-y-auto h-[calc(100dvh-190px)] sm:h-[calc(100dvh-195px)] md:h-[calc(100dvh-200px)] lg:h-[calc(100dvh-230px)] px-2 md:px-4 mt-2 md:mt-4 pb-1 md:pb-2 mb-1 md:mb-2"
            scrollbarSize={6}
            type="auto"
          >
            <div className="space-y-1 md:space-y-4">
              {trees?.map((root) => (
                <Paper
                  key={root.id}
                  radius="md"
                  p="md"
                  className="border border-gray-200 transition-shadow duration-300 shadow-sm hover:shadow-md"
                >
                  <ScrollArea
                    scrollbarSize={6}
                    type="auto"
                    className="overflow-x-auto"
                  >
                    <div className="min-w-max">
                      <TreeNode tree={root} />
                    </div>
                  </ScrollArea>
                </Paper>
              ))}
            </div>
          </ScrollArea>
        </Paper>
      </Container>
    </div>
  );
};
