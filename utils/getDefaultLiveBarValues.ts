import { LiveBarConfigType } from "@/schemas/live-bar.schema";

export const getDefaultLiveBarValues = (
  data: LiveBarConfigType
): LiveBarConfigType => {
  console.log(data, "hahaha");
  const { timeRange, limit, reason } = data;

  return {
    timeRange,
    limit,
    reason,
  };
};
