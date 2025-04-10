import { z } from "zod";

// const entryItemSchema = z.object({
//   grade: z.number().min(1), // 등수: 1등, 2등...
//   reward_type: z.string(),
//   amount: z.number().min(0, { message: "금액은 0 이상이어야 합니다" }),
//   winners: z
//     .number()
//     .int()
//     .min(1, { message: "당첨자 수는 1 이상이어야 합니다" }),
// });

const rewardConfigSchema = z.object({
  live_bar: z.boolean(),
  amount: z.number().min(0), // 등수: 1등, 2등...
  reward_type: z.enum(["usdt", "shell", "pearl"]),
  chance: z.number().min(0, { message: "확률은 0 이상이어야 합니다" }),
});

// 룰렛 스키마
export const rouletteFormSchema = z.object({
  reward: z
    .array(rewardConfigSchema)
    .min(1, { message: "최소 1개의 보상 항목이 필요합니다" }),
});

// 리워드 타입 추론
export type RouletteRewardType = z.infer<typeof rewardConfigSchema>;

// useForm용 리워드
export type CreateRouletteRewardFormData = z.infer<typeof rouletteFormSchema>;
