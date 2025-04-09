"use client";

import Button from "@/components/common/button";
import {
  CreateRaffleFormData,
  CreateRewardFormData,
} from "@/schemas/raffle.schema";
import { cn } from "@/utils/cn";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Control, UseFormRegister, useWatch } from "react-hook-form";

interface WinnerConfigRowProps {
  index: number;

  onPressSubButton: (index: number) => void;
  isRankButtonDisabled: boolean;

  item: CreateRewardFormData;
  control: Control<CreateRaffleFormData>;

  register: UseFormRegister<CreateRaffleFormData>;
  totalRewardAmount: (index: number) => number;
}

const WinnerConfigRow = ({
  index,
  onPressSubButton,
  isRankButtonDisabled,

  item,
  control,

  register,
}: WinnerConfigRowProps) => {
  const [sum, setSum] = useState(item.amount * item.winners);

  // 감시...
  const watchedRewards = useWatch({ control, name: "reward" });

  useEffect(() => {
    setSum(watchedRewards[index].amount * watchedRewards[index].winners);
    // eslint-disable-next-line
  }, [watchedRewards]);

  return (
    <div
      key={index}
      className={cn(
        // index !== winnerCols.length - 1 &&
        "border-background-teritary border-b",
        "bg-background-secondary grid h-14 w-full grid-cols-16"
      )}
    >
      {/* 등수 */}
      <label className="text-body3-bold col-span-2 flex items-center gap-3 px-4">
        {
          <Button
            onClick={() => onPressSubButton(index)}
            disabled={isRankButtonDisabled}
            className={cn(
              isRankButtonDisabled && "opacity-30",
              "bg-background-teritary flex h-5 w-5 shrink-0 items-center justify-center rounded-4xl"
            )}
          >
            <XIcon size={14} color="white" />
          </Button>
        }
        <input
          {...register(`reward.${index}.grade`, { valueAsNumber: true })}
          value={item.grade ?? index}
          disabled
        />
      </label>

      {/* USDT 당첨량 */}
      <label
        htmlFor="amount"
        className="col-span-5 flex cursor-pointer items-center pr-4"
      >
        <input
          {...register(`reward.${index}.amount`, { valueAsNumber: true })}
          type="number"
          id="amount"
          className="input-no-spinner hover:bg-background-primary focus:bg-background-primary bg-background-primary/50 w-full rounded px-2 py-1"
        />
      </label>

      {/* 당첨자 수 */}
      <label
        htmlFor={`numberOfWinners-${index}`}
        className="col-span-5 flex cursor-pointer items-center pr-4"
      >
        <input
          {...register(`reward.${index}.winners`, {
            valueAsNumber: true,
          })}
          type="number"
          id={`numberOfWinners-${index}`}
          className="input-no-spinner hover:bg-background-primary focus:bg-background-primary bg-background-primary/50 w-full rounded px-2 py-1"
        />
      </label>

      {/* 리워드 규모 */}
      <label
        htmlFor="totalAmountOfReward"
        className={cn(
          "col-span-4 flex items-center pl-4",
          sum <= 0 && "opacity-30"
        )}
      >
        {sum ? sum.toLocaleString() : 0} USDT
      </label>

      <input type="hidden" {...register(`reward.${index}.reward_type`)} />
    </div>
  );
};

export default WinnerConfigRow;
