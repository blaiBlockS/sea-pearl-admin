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

export type UserFilterType = "friends" | "ads" | "pearl" | "shell" | "usdt";
