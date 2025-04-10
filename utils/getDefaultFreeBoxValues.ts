import { FreeBoxConfigType } from "@/schemas/free-box.schema";

export const getDefaultFreeBoxValues = (
  data: FreeBoxConfigType
): FreeBoxConfigType => {
  const { id, reward } = data;

  return {
    id,
    reward,
  };
};
