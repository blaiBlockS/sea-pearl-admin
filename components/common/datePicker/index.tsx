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
  className?: string;
}

interface DateValueType {
  targetDigit: 3 | 4 | 5 | 6 | 7 | 8;
  year: [number, number, number, number];
  month: [number, number];
  date: [number, number];
}

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  // 팝오버 창이 열렸는지 안 열렸는지
  const [open, setOpen] = React.useState(false);

  // VALUE => PARSED
  const handleSplitDate = (value: Date) => {
    const year = value.getFullYear().toString().padStart(2, "0").split(""); // 년
    const month = (value.getMonth() + 1).toString().padStart(2, "0").split(""); // 월
    const date = value.getDate().toString().padStart(2, "0").split(""); // 일

    return {
      year: [...year].map(Number) as [number, number, number, number],
      month: [...month].map(Number) as [number, number],
      date: [...date].map(Number) as [number, number],
    };
  };

  // DATA
  const [dateValue, setDateValue] = React.useState<DateValueType>(() => {
    const { year, month, date } = handleSplitDate(value);

    return {
      targetDigit: 3,
      year,
      month,
      date,
    };
  });

  // 실제 존재하는 날인지 아닌지 검사
  const isValidDate = (year: number, month: number, day: number): boolean => {
    const date = new Date(year, month - 1, day); // JS는 month가 0부터 시작
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  // 입력값 => VALUE
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    let eventKey: number | string = e.key;
    const isBackspace = eventKey === "Backspace";
    // Backspace인 경우
    if (isBackspace) {
      eventKey = 0;
    } else if (!/^\d$/.test(eventKey)) {
      return;
    }

    let targetKey = Number(eventKey);

    setDateValue((prev) => {
      const temp = { ...prev };

      const currentFullYear = new Date().getFullYear().toString().split("");
      const currentThreeDigit = +currentFullYear[2];
      const currentFourDigit = +currentFullYear[3];

      console.log(currentThreeDigit, currentFourDigit, "curYear 2, 3");

      // 타겟 숫자가 첫 - 두 번째는 고정 ( 2, 0 )
      // 타겟 숫자가 세 번째라면? (year의 세 번째)
      if (temp.targetDigit === 3) {
        // 이전 년도 선택 안 되게
        if (targetKey < currentThreeDigit) {
          targetKey = currentThreeDigit;
        }

        temp.year[2] = targetKey;

        const resultYear = Number(`${temp.year[2]}${temp.year[3]}`);
        const minYear = Number(`${currentThreeDigit}${currentFourDigit}`);
        if (resultYear < minYear) {
          console.log("year to 2, 5");
          temp.year[2] = currentThreeDigit;
          temp.year[3] = currentFourDigit;
        }
      }

      // 타겟 숫자가 네 번째라면? (year의 네 번째)
      if (temp.targetDigit === 4) {
        // 이전 년도 선택 안 되게
        if (
          temp.year[2] === currentThreeDigit &&
          targetKey < currentFourDigit
        ) {
          targetKey = currentFourDigit;
        }

        temp.year[3] = targetKey;

        const resultYear = Number(`${temp.year[2]}${temp.year[3]}`);
        const minYear = Number(`${currentThreeDigit}${currentFourDigit}`);
        if (resultYear < minYear) {
          console.log("year to 2, 5");
          temp.year[2] = currentThreeDigit;
          temp.year[3] = currentFourDigit;
        }
      }

      // 타겟 숫자가 다섯 번째라면? (month의 첫 번째)
      // (0 - 1만 허용)
      if (temp.targetDigit === 5) {
        if (targetKey >= 2) {
          targetKey = 1;
        }
        temp.month[0] = targetKey;

        // 달이 00이면 01로 강제 전환
        if (targetKey === 0 && temp.month[0] === 0) {
          temp.month[1] = 1;
        }

        // 달이 13이상이면 12로 강제 전환
        if (targetKey >= 3 && temp.month[0] >= 1) {
          temp.month[0] = 1;
          temp.month[1] = 2;
        }
      }

      // 타겟 숫자가 여섯 번째라면? (month의 두 번째)
      // (month 총합 12가 안 넘어가게 설정)
      if (temp.targetDigit === 6) {
        temp.month[1] = targetKey;

        // 달이 00이면 01로 강제 전환
        if (targetKey === 0 && temp.month[0] === 0) {
          temp.month[1] = 1;
        }

        // 달이 13이상이면 12로 강제 전환
        if (targetKey >= 3 && temp.month[0] >= 1) {
          temp.month[0] = 1;
          temp.month[1] = 2;
        }
      }

      // 타겟 숫자가 일곱 번째라면? (day의 첫 번째)
      // 일단 0 - 3까지만 받도록
      if (temp.targetDigit === 7) {
        temp.date[0] = targetKey;

        if (targetKey > 3) {
          temp.date[0] = 3;
        }
      }

      // 타겟 숫자가 여덟 번째라면? (day의 두 번째)
      if (temp.targetDigit === 8) {
        temp.date[1] = targetKey;

        if (temp.date[0] === 0 && temp.date[1] === 0) {
          temp.date[1] = 1;
        }

        const joinedYear = Number(temp.year.join(""));
        const joinedMonth = Number(temp.month.join(""));
        let joinedDate = Number(temp.date.join(""));

        // 유효한 날짜인지 체크
        let isVerified = false;
        while (!isVerified) {
          if (joinedDate <= 10) break;

          isVerified = isValidDate(joinedYear, joinedMonth, joinedDate);
          if (!isVerified) joinedDate--;

          if (joinedDate <= 0) break;
        }

        if (isVerified) {
          const [verifiedFirstLetter, verifiedSecondLetter] = joinedDate
            .toString()
            .split("");
          temp.date[0] = +verifiedFirstLetter;
          temp.date[1] = +verifiedSecondLetter;

          console.log(
            verifiedFirstLetter,
            verifiedSecondLetter,
            "verifiedFirstLetter, verifiedSecondLetter"
          );
        }
      }

      const resultYear = Number(temp.year.join(""));
      const resultMonth = Number(temp.month.join(""));
      const resultDate = Number(temp.date.join(""));

      const result = new Date(resultYear, resultMonth - 1, resultDate); // JS는 month가 0부터 시작

      // 다음 타겟 자릿수 올리기
      if (isBackspace) {
        temp.targetDigit--;
      } else {
        temp.targetDigit++;
      }

      if (temp.targetDigit < 3 || temp.targetDigit >= 9) {
        temp.targetDigit = 3;
      }

      // hour 두 번째 숫자 조작으로 전환 (next)
      onChange(result);
      return temp;
    });
  };

  // VALUE => UI
  const highlighten = (date: Date) => {
    if (!open) {
      return <span>{format(date, "yyyy.MM.dd.")}</span>;
    }

    const focusedDigitStyle = "text-text-brand bg-blue-50";

    return (
      <span>
        <span>{dateValue.year[0]}</span>
        <span>{dateValue.year[1]}</span>
        <span className={dateValue.targetDigit === 3 ? focusedDigitStyle : ""}>
          {dateValue.year[2]}
        </span>
        <span className={dateValue.targetDigit === 4 ? focusedDigitStyle : ""}>
          {dateValue.year[3]}
        </span>
        <span>.</span>
        <span className={dateValue.targetDigit === 5 ? focusedDigitStyle : ""}>
          {dateValue.month[0]}
        </span>
        <span className={dateValue.targetDigit === 6 ? focusedDigitStyle : ""}>
          {dateValue.month[1]}
        </span>
        <span>.</span>
        <span className={dateValue.targetDigit === 7 ? focusedDigitStyle : ""}>
          {dateValue.date[0]}
        </span>
        <span className={dateValue.targetDigit === 8 ? focusedDigitStyle : ""}>
          {dateValue.date[1]}
        </span>
        <span>.</span>
      </span>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
          <div className="flex items-center gap-2">
            <CalendarIcon />
            {value ? (
              // format(value, "yyyy.MM.dd.")
              highlighten(value)
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
        onKeyDown={handleKeyDown}
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
