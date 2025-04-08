"use client";

import { Winner } from "@/schemas/raffle.schema";
import { RaffleType } from "@/types/columns";
import { createColumnHelper } from "@tanstack/react-table";

export const raffleColumnHelper = createColumnHelper<RaffleType>();
export const winnerColumnHelper = createColumnHelper<Winner>();
