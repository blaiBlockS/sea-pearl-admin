import { z } from "zod";

export const liveBarConfigSchema = z.object({
  timeRange: z
    .number({
      invalid_type_error: "해당 입력값은 숫자여야 합니다.",
    })
    .min(1),
  limit: z
    .number({
      invalid_type_error: "해당 입력값은 숫자여야 합니다.",
    })
    .min(0),
});

// 리워드 타입 추론
export type LiveBarConfigType = z.infer<typeof liveBarConfigSchema>;
