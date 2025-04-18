import { z } from "zod";

export const expenseConfigSchema = z.object({
  link: z.string(),
  expenseDate: z.date(),
});

// 프리박스 설정 타입 추론
export type ExpenseConfigType = z.infer<typeof expenseConfigSchema>;
