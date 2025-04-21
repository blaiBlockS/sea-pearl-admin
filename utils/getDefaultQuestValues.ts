import { GetRaffleFormDataDto } from "@/schemas/raffle.schema";
import { QuestConfigType } from "@/schemas/quest.schema";
import dayjs from "dayjs";

export const getDefaultQuestValues = (data: GetRaffleFormDataDto) => {
  const {
    min_participants,
    entry_fee,
    entry_type,
    reward,
    start,
    end,
    winners,
  } = data;

  const startDayJs = new Date(start);
  const endDayJs = new Date(end);

  return {
    period: {
      startDate: new Date(),
      startTime: new Date(), // dayjs 객체
      endDate: new Date(), // 또는 dayjs().toDate()
      endTime: new Date(),
    },
  };
};
