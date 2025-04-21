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
import { cn } from "@/utils/cn";

interface Props {
  onValueChange: (arg: string) => void;
  value?: string;
  valueList?: string[];
  triggerClassName?: string;
}

export const SelectBox = React.forwardRef<HTMLButtonElement, Props>(
  (
    { onValueChange, value, valueList, triggerClassName, ...props }: Props,
    ref
  ) => {
    return (
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger
          className={cn(
            "w-[120px] h-7.5 rounded-sm hover:bg-background-primary focus:bg-background-primary border-none bg-background-primary/50",
            triggerClassName
          )}
          {...props}
          ref={ref}
        >
          <SelectValue placeholder="리워드를 선택하세요." />
        </SelectTrigger>
        <SelectContent className="bg-background-primary text-text-primary border-none">
          <SelectGroup>
            <SelectLabel>리워드 타입</SelectLabel>
            {valueList?.map((value) => (
              <SelectItem
                key={value}
                value={value}
                className="hover:bg-background-secondary focus:bg-background-secondary focus:text-text-primary"
              >
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);
