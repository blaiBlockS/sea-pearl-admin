import {
  QuestConfigRequestType,
  QuestConfigType,
} from "@/schemas/sea-pearl-quest.schema";
import dayjs from "dayjs";

export const getDefaultSeaPearlQuestValues = (
  data: QuestConfigRequestType
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

  const startDayJs = dayjs(period.start || new Date(2024, 12, 31, 0, 0));
  const endDayJs = dayjs(period.end || new Date(2050, 12, 31, 0, 0));

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
      startDate: startDayJs.startOf("day").toDate(),
      startTime: dayjs(startDayJs.format("HH:mm:ss"), "HH:mm:ss"), // dayjs 객체
      endDate: endDayJs.startOf("day").toDate(), // 또는 dayjs().toDate()
      endTime: dayjs(endDayJs.format("HH:mm:ss"), "HH:mm:ss"),
    },
  };
};
