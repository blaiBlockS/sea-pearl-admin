import {
  GetRaffleFormDataDto,
  ProcessedRaffleFormDataDto,
} from "@/schemas/raffle.schema";

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

  return {
    period: {
      startDate: new Date(start),
      startTime: new Date(start),
      endDate: new Date(end),
      endTime: new Date(start),
    },

    min_participants,
    entry_fee,
    entry_type,

    reward,
    winners,
  };
};
