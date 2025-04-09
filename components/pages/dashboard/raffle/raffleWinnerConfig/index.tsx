"use client";

import Button from "@/components/common/button";
import { cn } from "@/utils/cn";
import WinnerConfigRow from "./winnerConfigRow";
import { Control, UseFormRegister, useWatch } from "react-hook-form";
import {
  CreateRaffleFormData,
  CreateRewardFormData,
  // CreateRewardFormData,
} from "@/schemas/raffle.schema";
import { useEffect, useState } from "react";

interface RaffleWinnerConfigProps {
  control: Control<CreateRaffleFormData>;
  register: UseFormRegister<CreateRaffleFormData>;
  winnerCols: CreateRewardFormData[];
  onPressAddButton: () => void;
  onPressSubButton: (index: number) => void;
  disabled?: boolean;
}

const RaffleWinnerConfig = ({
  register,
  control,
  winnerCols,
  onPressAddButton,
  onPressSubButton,
  disabled,
}: RaffleWinnerConfigProps) => {
  // rhf으로 default value 위에서 받기

  const watchedRewards = useWatch({
    control,
    name: "reward",
    defaultValue: [],
  });

  const isDisabled = disabled || watchedRewards?.length >= 10;
  const [totalReward, setTotalReward] = useState<number | null>(null);

  useEffect(() => {
    const handleCalcTotal = () => {
      const res = watchedRewards
        .map((item) => {
          const usdtAmount = item.amount ? item.amount : 0;
          const winnerAmount = item.winners ? item.winners : 0;
          return usdtAmount * winnerAmount;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      return res;
    };

    setTotalReward(handleCalcTotal());
  }, [watchedRewards]);

  const totalRewardAmount = (index: number) =>
    (watchedRewards[index].amount ? watchedRewards[index].amount : 0) *
    (watchedRewards[index].winners ? watchedRewards[index].winners : 0);

  return (
    <div className="w-full overflow-hidden rounded-lg">
      {/* HEADER */}
      <div className="bg-background-teritary grid h-14 w-full grid-cols-16">
        <div className="col-span-2 flex items-center pl-4">등수</div>
        <div className="col-span-5 flex items-center">USDT</div>
        <div className="col-span-5 flex items-center">당첨자 수</div>
        <div className="col-span-4 flex items-center pl-4">총 합산</div>
      </div>

      {/* EDITABLE LISTS */}
      {winnerCols.length !== 0 ? (
        winnerCols.map((item, index) => {
          // 랭크버튼 지울 수 있는 한계
          const isRankButtonDisabled = index < 4;

          return (
            <WinnerConfigRow
              control={control}
              key={index}
              index={index}
              register={register}
              onPressSubButton={onPressSubButton}
              isRankButtonDisabled={isRankButtonDisabled}
              item={item}
              totalRewardAmount={totalRewardAmount}
            />
          );
        })
      ) : (
        <div className="bg-background-secondary text-body4-medium flex h-24 items-center justify-center">
          No Results.
        </div>
      )}

      <div className="bg-background-secondary grid h-10 grid-cols-4">
        <div className="text-text-secondary col-start-3 flex items-center justify-end pr-4">
          Total:
        </div>
        <div className="col-start-4 flex items-center pl-4">
          {totalReward?.toLocaleString()} USDT
        </div>
      </div>

      {/* ADD BUTTON */}
      <Button
        className={cn(
          "bg-background-teritary/75 hover:bg-background-teritary h-10 w-full",
          isDisabled && "opacity-25"
        )}
        onClick={onPressAddButton}
        disabled={isDisabled}
      >
        <span>+ 추가하기</span>
      </Button>
    </div>
  );
};

export default RaffleWinnerConfig;
