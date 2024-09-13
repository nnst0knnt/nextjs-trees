import { listTrees } from "@/features/trees/routes";
import { router } from "@/utils/trpc/factories";

export const trees = router({
  list: listTrees,
});
