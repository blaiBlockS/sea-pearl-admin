import dayjs from "dayjs";
import { z } from "zod";

// {
//   "roundInCycle": 0,
//   "resetCount": 0,
//   "period": {
//     "start": "2025-04-14T05:11:23.559Z",
//     "end": "2025-04-14T05:11:23.559Z"
//   },
//   "maxParticipants": 0,
//   "enabled": true
// }

const questRewardItemSchema = z.object({
  type: z.enum(["shell", "pearl", "usdt"]), // 리워드 분류
  amount: z.number().min(0.1, { message: "금액은 0 이상이어야 합니다" }), // 리워드 수량
});

export const questSchema = z.object({
  enabled: z.boolean().default(false), // 1. 퀘스트 노출 여부

  questNumber: z // 2. 퀘스트 순번
    .number({ message: "숫자를 입력해주세요." })
    .min(0, { message: "퀘스트 순번은 0이상이어야 합니다." }),

  title: z // 3. 퀘스트 명
    .string()
    .nonempty({ message: "타이틀은 필수적으로 입력해야 합니다." }),

  questLogo: z.enum([
    "shellraffle",
    "pearlraffle",
    "freebox",
    "website",
    "telegram",
    "youtube",
    "x",
    "discord",
    "checkin",
  ]), // 4. 퀘스트 타입

  reward: z // (5. 리워드 분류, 6. 리워드 수량)
    .array(questRewardItemSchema)
    .min(1, { message: "최소 1개의 보상 항목이 필요합니다" })
    .default([{ type: "shell", amount: 0 }]),

  url: z.string().optional(), // 7. 링크(선택)

  resetCycle: z.enum(["daily", "weekly", "monthly", "none"]), // 8. 반복 주기

  roundInCycle: z
    .number({ message: "숫자를 입력해주세요." })
    .min(1, { message: "퀘스트 완료 기준 횟수는 최소 1 이상이어야 합니다." }), // 9. 퀘스트 완료 기준 횟수

  maxParticipants: z // 10. 최대 참여자 수
    .number({ message: "숫자를 입력해주세요." })
    .optional(),

  period: z.object({
    // 10. 퀘스트 시작 일시 / 11. 퀘스트 종료 일시
    startDate: z.date(),
    startTime: z.custom<dayjs.Dayjs>(
      (val) => dayjs.isDayjs(val) && val.isValid(),
      {
        message: "유효한 시간을 선택해주세요.",
      }
    ),
    endDate: z.date(),
    endTime: z.custom<dayjs.Dayjs>(
      (val) => dayjs.isDayjs(val) && val.isValid(),
      {
        message: "유효한 시간을 선택해주세요.",
      }
    ),
  }),
});

// 프리박스 설정 타입 추론
export type QuestRewardItemConfigType = z.infer<typeof questRewardItemSchema>;
export type QuestConfigType = z.infer<typeof questSchema>;
export type QuestConfigRequestType = Omit<QuestConfigType, "period"> & {
  start: string;
  end: string;
};
