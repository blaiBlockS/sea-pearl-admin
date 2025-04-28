export interface UserType {
  id: string;
  telegramUid: string;
  firstName: string;
  lastName: string;
  userName: string;

  inviteCount: number;
  adCount: number;

  shell: number;
  pearl: number;
  usdt: number;

  createdAt: string;
  updatedAt: string;
}

export interface UserListType {
  totalCount: number;
  users: UserType[];
}

export type UserFilterType =
  | "friends"
  | "ads"
  | "pearl"
  | "shell"
  | "usdt"
  | "createdAt";

export interface UserDetailType {
  id: string;
  firstName: string;
  lastName: string;
  handle: string;
  telegramUid: number;
  signUpData: string; // ISO date string
  lastConnection: string; // ISO date string
  inviter: {
    id: string | null;
    telegramUid: number | null;
    firstName: string | null;
    lastName: string | null;
    handle: string | null;
  };
  totalFriends: number;
  totalAds: number;
  shells: {
    have: number;
    total_earn: number;
    spent: number;
  };
  pearls: {
    have: number;
    total_earn: number;
    spent: number;
    storage: number;
    fassive: number;
  };
  usdt: {
    have: number;
    total_earn: number;
    draw: number;
    wallet_address: string;
  };
  freebox: number;
  roulette: number;
  shellRaffle: number;
  pearlRaffle: number;
}

export interface UserUsdtExpenseType {
  id: string;
  expenseDate: string;
  from: string;
  to: string;
  amount: number;
  link: string;
}

export interface UserRewardsType {
  id: string;
  expenseDate: string;
  fee_type: string;
  reason: string;
  amount: number;
}

export interface UserQuestDoneType {
  id: string;
  projectName: string;
  questName: string;
  rewardAmount: number;
  rewardType: string;
  createdAt: string;
}
