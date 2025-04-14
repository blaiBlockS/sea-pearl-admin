import { GetRaffleFormDataDto } from "@/schemas/raffle.schema";
import { QuestConfigType } from "@/schemas/sea-pearl-quest.schema";
import dayjs from "dayjs";

export const getDefaultQuestValues = (
  data: GetRaffleFormDataDto
): QuestConfigType => {
  const {
    min_participants,
    entry_fee,
    entry_type,
    reward,
    start,
    end,
    winners,
  } = data;

  const startDayJs = dayjs(start);
  const endDayJs = dayjs(end);

  return {
    period: {
      startDate: startDayJs.startOf("day").toDate(),
      startTime: dayjs(startDayJs.format("HH:mm:ss"), "HH:mm:ss"), // dayjs 객체
      endDate: endDayJs.startOf("day").toDate(), // 또는 dayjs().toDate()
      endTime: dayjs(endDayJs.format("HH:mm:ss"), "HH:mm:ss"),
    },

    min_participants,
    entry_fee,
    entry_type,

    reward,
    winners,
  };
};
