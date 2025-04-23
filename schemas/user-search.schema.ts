import { z } from "zod";

export const userSearchSchema = z.object({
  search: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, {
      message: "검색어는 최소 1자 이상이어야 합니다.",
    }),
});

export type UserSearchFormData = z.infer<typeof userSearchSchema>;
