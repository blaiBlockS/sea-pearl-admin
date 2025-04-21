import {
  GetRaffleFormDataDto,
  ProcessedRaffleFormDataDto,
} from "@/schemas/raffle.schema";
import dayjs from "dayjs";

export const getDefaultValues = (
  data: GetRaffleFormDataDto
): ProcessedRaffleFormDataDto => {
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
      startDate: new Date(),
      startTime: new Date(), // dayjs 객체
      endDate: new Date(), // 또는 dayjs().toDate()
      endTime: new Date(),
    },

    min_participants,
    entry_fee,
    entry_type,

    reward,
    winners,
  };
};
