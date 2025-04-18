"use client";

import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { DatePicker } from "../datePicker";
import Input from "../input";
import TimePicker from "../timePicker";
import dayjs from "dayjs";
import { CreateRaffleFormData } from "@/schemas/raffle.schema";

interface RaffleInfoConfigProps {
  register: UseFormRegister<CreateRaffleFormData>;
  control: Control<CreateRaffleFormData>;
  errors: FieldErrors<CreateRaffleFormData>;
}

const FormContainer = ({
  register,
  control,
  errors,
}: RaffleInfoConfigProps) => {
  return (
    <div className="bg-background-secondary mb-8 flex flex-col gap-5 rounded-xl p-8">
      {/* 시작일시 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 w-1/3">시작일시</span>
        <div className="flex w-2/3 gap-4">
          {/* DATE_PICKER */}
          <Controller
            name="period.startDate"
            control={control}
            render={({ field }) => (
              <DatePicker value={field.value} onChange={field.onChange} />
            )}
          />

          {/* TIME_PICKER */}
          <Controller //
            name="period.startTime"
            control={control}
            render={({ field }) => (
              <TimePicker
                {...field}
                value={field.value}
                onChange={(value: dayjs.Dayjs) => field.onChange(value)}
                format="HH:mm"
              />
            )}
          />
        </div>
      </div>

      {/* 종료일시 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 w-1/3">종료일시</span>
        <div className="flex w-2/3 gap-4">
          {/* DATE_PICKER */}
          <Controller
            name="period.endDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value} //
                onChange={field.onChange}
              />
            )}
          />

          {/* TIME_PICKER */}
          <Controller //
            name="period.endTime"
            control={control}
            render={({ field }) => (
              <TimePicker
                {...field}
                value={field.value}
                onChange={(value: dayjs.Dayjs) => field.onChange(value)}
                format="HH:mm"
              />
            )}
          />
        </div>
      </div>

      {/* 참여기준 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 w-1/3">래플 당 가격(Pearls)</span>
        <div className="flex w-2/3 gap-4">
          <Input
            type="number"
            inputClassName="h-10 input-no-spinner"
            placeholder="Enter quantity"
            hint={errors?.entry_fee?.message}
            {...register("entry_fee", { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* 최소 참여자 수 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 w-1/3">최소 참여자 수</span>
        <div className="flex w-2/3 gap-4">
          <Input
            type="number"
            inputClassName="h-10 input-no-spinner"
            placeholder="Enter quantity"
            hint={errors?.min_participants?.message}
            {...register("min_participants", { valueAsNumber: true })}
          />
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
