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

  // 탭키 눌렀을 때
  onKeyDownTab?: () => void;
}

interface TimeValueType {
  targetDigit: 1 | 2;
  firstValue: number;
  secondValue: number;
}

export const CustomTimePicker = React.forwardRef<
  HTMLButtonElement,
  DatePickerProps
>(({ value, onChange, className, onKeyDownTab }: DatePickerProps, ref) => {
  // 팝오버 창이 열렸는지 안 열렸는지
  const [open, setOpen] = React.useState(false);

  // 어디가 포커스 되어있는지
  const [focusedSection, setFocusedSection] = React.useState<"hour" | "minute">(
    "hour" // 기본값 hour
  );

  const [hourValue, setHourValue] = React.useState<TimeValueType>({
    targetDigit: 1,
    firstValue: 0,
    secondValue: 0,
  });
  const [minuteValue, setMinuteValue] = React.useState<TimeValueType>({
    targetDigit: 1,
    firstValue: 0,
    secondValue: 0,
  });
  const [highlightedDigit, setHighlightedDigit] = React.useState(1);

  React.useEffect(() => {
    setHighlightedDigit(1);
    setFocusedSection("hour");
    setHourValue((prev) => {
      const temp = { ...prev };
      temp.targetDigit = 1;
      return temp;
    });
  }, [open]);

  const timeValue = `${String(value?.getHours()).padStart(2, "0")}:${String(value?.getMinutes()).padStart(2, "0")}`;

  const hours = Array.from({ length: 24 }, (_, i) => i); // 0 ~ 23
  const minutes = Array.from({ length: 60 }, (_, i) => i); // 0 ~ 59

  const handleHourChange = (h: number) => {
    console.log(h, "h");
    const newDate = new Date(value);
    newDate.setHours(Number(h));
    onChange(newDate);
  };

  const handleMinuteChange = (m: number) => {
    console.log(m, "m");
    const newDate = new Date(value);
    newDate.setMinutes(Number(m));
    onChange(newDate);
  };

  const settingHour = value?.getHours();
  const settingMinute = value?.getMinutes();

  const hourFocused = focusedSection === "hour";
  const minuteFocused = focusedSection === "minute";

  const handleKeyDownHour: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    // 숫자 키 외 무시
    if (!/^\d$/.test(e.key)) return;

    let targetKey = Number(e.key);
    console.log("--- hour value ---", targetKey);

    // 시 조작이라면
    setHourValue((prev) => {
      const temp = { ...prev };

      if (prev.targetDigit === 1) {
        temp.targetDigit = 2;
        // hour 첫 번째 자리 입력이라면

        // hour 맨 앞글자가 3 이상이라면
        if (targetKey >= 3) {
          targetKey = 2;
          if (prev.secondValue > 3) {
            prev.secondValue = 3;
          }
        }

        temp.firstValue = targetKey;

        console.log(focusedSection, "fc");

        // hour 두 번째 숫자 조작으로 전환 (next)
        handleHourChange(Number(`${temp.firstValue}${temp.secondValue}`));
        return temp;
      } else {
        temp.targetDigit = 1;
        // hour 두 번째 자리 입력이라면

        // hour 총 입력값이 24가 넘으면
        if (temp.firstValue > 1 && targetKey > 3) {
          temp.firstValue = 2;
          targetKey = 3;
        }

        // hour 두 번째 숫자 변경
        temp.secondValue = targetKey;

        // hour 첫 번째 입력으로 다시 전환
        console.log(focusedSection, "fc");

        handleHourChange(Number(`${temp.firstValue}${temp.secondValue}`));
        setFocusedSection("minute");
        return temp;
      }
    });
  };

  const handleKeyDownMinute: React.KeyboardEventHandler<HTMLDivElement> = (
    e
  ) => {
    // 숫자 키 외 무시
    if (!/^\d$/.test(e.key)) return;
    let targetKey = Number(e.key);

    // minute 조작이라면
    setMinuteValue((prev) => {
      const temp = { ...prev };

      if (prev.targetDigit === 1) {
        temp.targetDigit = 2;

        // minute 첫 번째 자리 입력이라면
        if (targetKey > 6) targetKey = 5;

        temp.firstValue = targetKey;

        handleMinuteChange(Number(`${temp.firstValue}${temp.secondValue}`));
        return temp;
      } else {
        temp.targetDigit = 1;

        // minute 두 번째 숫자 변경
        temp.secondValue = targetKey;
        console.log("minute: ", prev);

        handleMinuteChange(Number(`${temp.firstValue}${temp.secondValue}`));
        setFocusedSection("hour");
        return temp;
      }
    });
  };

  const handlePopOverKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (hourFocused && hourValue.targetDigit === 1) {
      setHighlightedDigit(2);
    } else if (hourFocused && hourValue.targetDigit === 2) {
      setHighlightedDigit(3);
    } else if (minuteFocused && minuteValue.targetDigit === 1) {
      setHighlightedDigit(4);
    } else if (minuteFocused && minuteValue.targetDigit === 2) {
      setHighlightedDigit(1);
    }

    hourFocused ? handleKeyDownHour(e) : handleKeyDownMinute(e);
  };

  const handleClickHourButton = (v: number, type: "hour" | "minute") => {
    console.log(v, type, "v type");
    if (type === "hour") {
      setFocusedSection("hour");
      handleHourChange(v);
    } else {
      setFocusedSection("minute");
      handleMinuteChange(v);
    }
  };

  const highlighten = (timeValue: string, highlightedDigit: number) => {
    const divided = timeValue.split(":").map((item) => item.split(""));

    if (!open) {
      return <span>{timeValue}</span>;
    }

    if (highlightedDigit === 1) {
      return (
        <span>
          <span className="text-text-brand bg-blue-50">{divided[0][0]}</span>
          <span>{divided[0][1]}</span>
          <span>:</span>
          <span>{divided[1][0]}</span>
          <span>{divided[1][1]}</span>
        </span>
      );
    } else if (highlightedDigit === 2) {
      return (
        <span>
          <span>{divided[0][0]}</span>
          <span className="text-text-brand bg-blue-50">{divided[0][1]}</span>
          <span>:</span>
          <span>{divided[1][0]}</span>
          <span>{divided[1][1]}</span>
        </span>
      );
    } else if (highlightedDigit === 3) {
      return (
        <span>
          <span>{divided[0][0]}</span>
          <span>{divided[0][1]}</span>
          <span>:</span>
          <span className="text-text-brand bg-blue-50">{divided[1][0]}</span>
          <span>{divided[1][1]}</span>
        </span>
      );
    } else if (highlightedDigit === 4) {
      return (
        <span>
          <span>{divided[0][0]}</span>
          <span>{divided[0][1]}</span>
          <span>:</span>
          <span>{divided[1][0]}</span>
          <span className="text-text-brand bg-blue-50">{divided[1][1]}</span>
        </span>
      );
    }

    return <span>{timeValue}</span>;
  };

  const handleKeyDownWrapper: React.KeyboardEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.key === "Tab" && onKeyDownTab) {
      console.log("tab pressed");
      e.preventDefault();
      onKeyDownTab();

      setOpen(false);
    }
  };

  return (
    <div onKeyDown={handleKeyDownWrapper}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            id="date"
            variant={"outline"}
            className={cn(
              "_auto-clickable bg-background-teritary border-stroke-secondary text-body4-medium flex-1 justify-between border text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
          >
            <div className="flex items-center gap-2">
              {highlighten(timeValue, highlightedDigit)}
            </div>
            <ClockIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="border-background-teritary w-auto border bg-[#131A25] p-0 text-gray-200"
          align="start"
        >
          <div className="flex h-40" onKeyDown={handlePopOverKeyDown}>
            {/* HOUR SECTION */}
            <section className="flex flex-col h-full overflow-y-scroll scrollbar-hide">
              {hours.map((h) => (
                <Button
                  key={h}
                  value={h}
                  className={cn(
                    settingHour === h && "bg-background-teritary",
                    settingHour === h && hourFocused && "bg-background-brand",
                    "hover:bg-background-secondary scrollbar-hide cursor-pointer"
                  )}
                  onClick={() => handleClickHourButton(h, "hour")}
                >
                  {String(h).padStart(2, "0")}
                </Button>
              ))}
            </section>

            {/* MINUTES SECTION */}
            <section className="flex flex-col h-full overflow-y-scroll">
              {minutes.map((m) => (
                <Button
                  key={m}
                  value={m}
                  className={cn(
                    settingMinute === m && "bg-background-teritary",
                    settingMinute === m &&
                      minuteFocused &&
                      "bg-background-brand",
                    "hover:bg-background-secondary scrollbar-hide cursor-pointer"
                  )}
                  onClick={() => handleClickHourButton(m, "minute")}
                >
                  {String(m).padStart(2, "0")}
                </Button>
              ))}
            </section>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});
