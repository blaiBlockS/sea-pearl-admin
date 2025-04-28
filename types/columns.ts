export interface tableResponseType<T> {
  data: T;
  totalCount: number;
}

export type RaffleType = {
  id: string;
  index: number;
  status: string;

  start: string;
  end: string;
  round_number: number;

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
