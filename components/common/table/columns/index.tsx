"use client";

import { Winner } from "@/schemas/raffle.schema";
import { RaffleType } from "@/types/columns";
import { CommunityQuestType } from "@/types/communityQuest";
import { ExpenseType } from "@/types/expense";
import { SeaPearlQuestType } from "@/types/seaPearlQuest";
import { createColumnHelper } from "@tanstack/react-table";

export const raffleColumnHelper = createColumnHelper<RaffleType>();
export const winnerColumnHelper = createColumnHelper<Winner>();

export const seaPearlQuestColumnHelper =
  createColumnHelper<SeaPearlQuestType>();
export const communityQuestColumnHelper =
  createColumnHelper<CommunityQuestType>();

export const expenseColumnHelper = createColumnHelper<ExpenseType>();
