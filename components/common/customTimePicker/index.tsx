"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value: Date;
  onChange: (val: Date | undefined) => void;
  className?: string;
}

export function CustomTimePicker({
  value,
  onChange,
  className,
}: DatePickerProps) {
  // const timeValue = `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`;
  console.log(value, "value Date?");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "bg-background-teritary border-stroke-secondary text-body4-medium flex-1 justify-between border text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2">{}</div>
          <ChevronDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="border-background-teritary w-auto border bg-[#131A25] p-0 text-gray-200"
        align="start"
      >
        <div>popover</div>
      </PopoverContent>
    </Popover>
  );
}
