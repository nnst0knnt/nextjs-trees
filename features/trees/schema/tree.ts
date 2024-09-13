import { z } from "zod";

export const ListTreesSchema = z.object({
  level: z.number().nullish(),
});
