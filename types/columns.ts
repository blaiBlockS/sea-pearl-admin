export interface tableResponseType<T> {
  data: T;
  total: number;
}

export type RaffleType = {
  id: string;
  index: number;
  status: string;

  start: string;
  end: string;

  reward: number;
  entry_fee: number;
  entry_type: string;
  participants: number;
};

export type WinnerType = {
  rank: number;
  reward_type: "usdt" | "shell" | "pearl";
  reward_amount: number;
  numberOfWinners: number;
};
