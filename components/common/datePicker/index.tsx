"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value: Date;
  onChange: (val: Date | undefined) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "bg-background-teritary border-stroke-secondary text-body4-medium flex-1 justify-between border text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon />
            {value ? (
              format(value, "yyyy.MM.dd.")
            ) : (
              <span>날짜를 선택하세요.</span>
            )}
          </div>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-background-teritary w-auto border bg-[#131A25] p-0 text-gray-200"
        align="start"
      >
        <Calendar
          initialFocus
          mode="single"
          selected={value}
          onSelect={onChange}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  );
}
