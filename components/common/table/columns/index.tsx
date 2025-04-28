"use client";

import { Winner } from "@/schemas/raffle.schema";
import { RaffleType } from "@/types/columns";
import { CommunityQuestType } from "@/types/communityQuest";
import { ExpenseType } from "@/types/expense";
import { IncomeType } from "@/types/income";
import { SeaPearlQuestType } from "@/types/seaPearlQuest";
import { SubQuestType } from "@/types/subQuest";
import {
  UserQuestDoneType,
  UserRewardsType,
  UserType,
  UserUsdtExpenseType,
} from "@/types/user";
import { createColumnHelper } from "@tanstack/react-table";

export const userColumnHelper = createColumnHelper<UserType>();
export const raffleColumnHelper = createColumnHelper<RaffleType>();
export const winnerColumnHelper = createColumnHelper<Winner>();

export const seaPearlQuestColumnHelper =
  createColumnHelper<SeaPearlQuestType>();
export const communityQuestColumnHelper =
  createColumnHelper<CommunityQuestType>();
export const subQuestColumnHelper = createColumnHelper<SubQuestType>();

export const expenseColumnHelper = createColumnHelper<ExpenseType>();
export const incomeColumnHelper = createColumnHelper<IncomeType>();

// USER_DETAIL
export const userUsdtColumnHelper = createColumnHelper<UserUsdtExpenseType>();
export const userRewardColumnHelper = createColumnHelper<UserRewardsType>();
export const userQuestDoneColumnHelper =
  createColumnHelper<UserQuestDoneType>();
