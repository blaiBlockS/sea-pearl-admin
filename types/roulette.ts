type RewardType = "usdt" | "shell" | "pearl";

type RouletteEntryType = {
  amount: number;
  reward_type: RewardType;
  chance: number;
};

export type RouletteRewardType = {
  liveBar: boolean;
  amount: number;
  reward_type: RewardType;
  chance: number;
};

export interface GetRouletteConfigDto {
  id: string;

  entry: RouletteEntryType[];

  reward: RouletteRewardType[];
}

export interface PutUpdateRouletteConfigDto {
  id: string;

  entry: RouletteEntryType[];

  reward: RouletteRewardType[];
}
