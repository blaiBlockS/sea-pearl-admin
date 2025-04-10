import { LiveBarConfigType } from "@/schemas/live-bar.schema";

export const getDefaultLiveBarValues = (
  data: LiveBarConfigType
): LiveBarConfigType => {
  const { timeRange, limit } = data;

  return {
    timeRange,
    limit,
  };
};
