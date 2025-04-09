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
}

export const SelectBox = React.forwardRef<HTMLButtonElement, Props>(
  ({ onValueChange, value, ...props }: Props, ref) => {
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
            <SelectItem
              value="usdt"
              className="hover:bg-background-secondary focus:bg-background-secondary focus:text-text-primary"
            >
              usdt
            </SelectItem>
            <SelectItem
              value="shell"
              className="hover:bg-background-secondary focus:bg-background-secondary focus:text-text-primary"
            >
              shell
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);
