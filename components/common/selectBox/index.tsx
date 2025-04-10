import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RewardType } from "@/types/roulette";

interface Props {
  onValueChange: (arg: string) => void;
  value: RewardType;
  rewardList?: ("usdt" | "shell" | "pearl")[];
}

export const SelectBox = React.forwardRef<HTMLButtonElement, Props>(
  (
    { onValueChange, value, rewardList = ["usdt", "shell"], ...props }: Props,
    ref
  ) => {
    return (
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger
          className="w-[120px] !h-7.5 rounded-sm hover:bg-background-primary focus:bg-background-primary border-none bg-background-primary/50"
          {...props}
        >
          <SelectValue placeholder="리워드를 선택하세요." />
        </SelectTrigger>
        <SelectContent className="bg-background-primary text-text-primary border-none">
          <SelectGroup>
            <SelectLabel>리워드 타입</SelectLabel>
            {rewardList.includes("usdt") && (
              <SelectItem
                value="usdt"
                className="hover:bg-background-secondary focus:bg-background-secondary focus:text-text-primary"
              >
                usdt
              </SelectItem>
            )}
            {rewardList.includes("shell") && (
              <SelectItem
                value="shell"
                className="hover:bg-background-secondary focus:bg-background-secondary focus:text-text-primary"
              >
                shell
              </SelectItem>
            )}
            {rewardList.includes("pearl") && (
              <SelectItem
                value="pearl"
                className="hover:bg-background-secondary focus:bg-background-secondary focus:text-text-primary"
              >
                pearl
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);
