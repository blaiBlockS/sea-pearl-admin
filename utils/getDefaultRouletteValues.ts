import { CreateRouletteRewardFormData } from "@/schemas/roulette.schema";
import { GetRouletteConfigDto } from "@/types/roulette";

export const parseDefaultRouletteValues = (
  data: GetRouletteConfigDto
): CreateRouletteRewardFormData => {
  return { reward: data.reward };
};
