"use client";

// import { RouletteRewardType } from "@/schemas/roulette.schema";
import { RouletteRewardType } from "@/types/roulette";
import { createColumnHelper } from "@tanstack/react-table";

export const rouletteColumnHelper = createColumnHelper<RouletteRewardType>();
