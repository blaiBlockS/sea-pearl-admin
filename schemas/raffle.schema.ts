import dayjs from "dayjs";
import { z } from "zod";

const rewardItemSchema = z.object({
  grade: z.number().min(1), // 등수: 1등, 2등...
  reward_type: z.string(),
  amount: z.number().min(0, { message: "금액은 0 이상이어야 합니다" }),
  winners: z
    .number()
    .int()
    .min(1, { message: "당첨자 수는 1 이상이어야 합니다" }),
});

export const raffleFormSchema = z.object({
  period: z.object({
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
  min_participants: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "숫자를 입력해주세요." })
      .min(0, { message: "최소 0 이상의 값을 입력해주세요." })
  ),
  entry_fee: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "숫자를 입력해주세요." })
      .min(0, { message: "최소 0 이상의 값을 입력해주세요." })
  ),
  entry_type: z.string(),

  reward: z
    .array(rewardItemSchema)
    .min(1, { message: "최소 1개의 보상 항목이 필요합니다" }),
});

// 2. 타입 추론
export type CreateRewardFormData = z.infer<typeof rewardItemSchema>;
export type CreateRaffleFormData = z.infer<typeof raffleFormSchema>;

raffleFormSchema.superRefine((data: CreateRaffleFormData, ctx) => {
  const { startDate, endDate } = data.period;

  if (endDate < startDate) {
    ctx.addIssue({
      path: ["period", "endDate"], // 어떤 필드에 에러를 붙일지
      message: "종료일은 시작일보다 뒤여야 합니다.",
      code: z.ZodIssueCode.custom,
    });
  }
});

export type Winner = {
  name: string;
  lotto_number: string;
  grade: number;
  reward: number;
  handle: string | null;
}[];

// ["/new", "[id]"] 입력 필드에 맞게 가공
export type CreateRaffleFormDataDto = Omit<CreateRaffleFormData, "period"> & {
  period: {
    start: string;
    end: string;
  };
};

// ["[id]"] 입력 필드에 맞게 가공
export type CreateRaffleFormDataDtoWithId = Omit<
  CreateRaffleFormData,
  "period"
> & {
  period: {
    start: string;
    end: string;
  };
  id: string;
};

//
export type GetRaffleFormDataDto = Omit<CreateRaffleFormDataDto, "period"> & {
  start: string;
  end: string;
  status: string;
  winners: Winner[];
};

export type ProcessedRaffleFormDataDto = CreateRaffleFormData & {
  winners: Winner[];
};

export type UpdateRaffleFormDataDto = CreateRaffleFormDataDto & {};
