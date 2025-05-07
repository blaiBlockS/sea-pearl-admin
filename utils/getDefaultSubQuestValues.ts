import {
  QuestConfigWithCombinedPeriod,
  QuestConfigType,
} from "@/schemas/quest.schema";

export const getDefaultSubQuestValues = (
  data: QuestConfigWithCombinedPeriod
): QuestConfigType => {
  console.log(data, "data!");

  const {
    // id,
    enabled,
    period,
    questLogo,
    questNumber,
    resetCycle,
    reward,
    roundInCycle,
    maxParticipants,
    title,
    url,
  } = data;

  const startDay = period.start
    ? new Date(period.start)
    : new Date(2024, 12, 31, 0, 0);
  const endDay = period.start
    ? new Date(period.end)
    : new Date(2050, 12, 31, 0, 0);

  return {
    enabled,
    questLogo,
    questNumber,
    resetCycle,
    reward,
    roundInCycle,
    maxParticipants,
    title,
    url,

    period: {
      startDate: startDay,
      startTime: startDay,
      endDate: endDay,
      endTime: endDay,
    },
  };
};
