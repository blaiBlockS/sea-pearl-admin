import { z } from "zod";

const seaPearlQuestSchema = z.object({
  amount: z.number().min(0.1, { message: "금액은 0 이상이어야 합니다" }),
  reward_type: z.enum(["shell", "pearl", "usdt"]),
  chance: z.number().min(0),
});

export const freeBoxConfigSchema = z.object({
  id: z.string(),
  reward: z
    .array(seaPearlQuestSchema)
    .min(1, { message: "최소 1개의 보상 항목이 필요합니다" }),
});

// 리워드 타입 추론
export type FreeBoxRewardType = z.infer<typeof seaPearlQuestSchema>;

// 프리박스 설정 타입 추론
export type FreeBoxConfigType = z.infer<typeof freeBoxConfigSchema>;
