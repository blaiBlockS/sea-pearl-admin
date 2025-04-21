"use client";

import * as React from "react";
import { ClockIcon } from "lucide-react";

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
  const timeValue = `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`;

  const hours = Array.from({ length: 24 }, (_, i) => i); // 0 ~ 23
  const minutes = Array.from({ length: 60 }, (_, i) => i); // 0 ~ 59

  const handleHourChange = (h: number) => {
    const newDate = new Date(value);
    newDate.setHours(Number(h));
    onChange(newDate);
  };

  const handleMinuteChange = (m: number) => {
    const newDate = new Date(value);
    newDate.setMinutes(Number(m));
    onChange(newDate);
  };

  const settingHour = value.getHours();
  const settingMinute = value.getMinutes();

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
          <div className="flex items-center gap-2">{timeValue}</div>
          <ClockIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="border-background-teritary w-auto border bg-[#131A25] p-0 text-gray-200"
        align="start"
      >
        <div className="flex h-40">
          <section className="flex flex-col h-full overflow-y-scroll scrollbar-hide">
            {hours.map((h) => (
              <Button
                key={h}
                value={h}
                className={cn(
                  settingHour === h && "bg-background-teritary",
                  "hover:bg-background-secondary scrollbar-hide cursor-pointer"
                )}
                onClick={() => handleHourChange(h)}
              >
                {String(h).padStart(2, "0")}
              </Button>
            ))}
          </section>
          <section className="flex flex-col h-full overflow-y-scroll">
            {minutes.map((m) => (
              <Button
                key={m}
                value={m}
                className={cn(
                  settingMinute === m && "bg-background-teritary",
                  "hover:bg-background-secondary scrollbar-hide cursor-pointer"
                )}
                onClick={() => handleMinuteChange(m)}
              >
                {String(m).padStart(2, "0")}
              </Button>
            ))}
          </section>
        </div>
      </PopoverContent>
    </Popover>
  );
}
