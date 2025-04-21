import {
  QuestConfigWithCombinedPeriod,
  QuestConfigType,
} from "@/schemas/quest.schema";
import dayjs from "dayjs";

export const getDefaultSubQuestValues = (
  data: QuestConfigWithCombinedPeriod
): QuestConfigType => {
  const {
    // id,
    enabled,
    period,
    questLogo,
    questNumber,
    resetCycle,
    reward,
    roundInCycle,
    title,
    url,
  } = data;

  const startDay = new Date(period.start) || new Date(2024, 12, 31, 0, 0);
  const endDay = new Date(period.end) || new Date(2050, 12, 31, 0, 0);

  return {
    enabled,
    questLogo,
    questNumber,
    resetCycle,
    reward,
    roundInCycle,
    title,
    url,

    period: {
      startDate: startDay,
      startTime: startDay, // dayjs 객체
      endDate: endDay, // 또는 dayjs().toDate()
      endTime: endDay,
    },
  };
};
