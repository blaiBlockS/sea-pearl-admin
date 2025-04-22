import { CustomTimePicker } from "@/components/common/customTimePicker";
import { DatePicker } from "@/components/common/datePicker";
import Input from "@/components/common/input";
import Tag from "@/components/common/tag";
import {
  CreateRaffleFormData,
  GetRaffleFormDataDto,
} from "@/schemas/raffle.schema";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

interface RaffleInfoConfigProps {
  roundMetaData?: {
    index: number;
    status: string;
  };
  register: UseFormRegister<CreateRaffleFormData>;
  control: Control<CreateRaffleFormData>;
  errors: FieldErrors<CreateRaffleFormData>;
}

const RaffleInfoConfig = ({
  roundMetaData,
  register,
  control,
  errors,
}: RaffleInfoConfigProps) => {
  let statusText = "";
  switch (roundMetaData?.status) {
    case "1":
      statusText = "대기중";
      break;
    case "2":
      statusText = "진행중";
      break;
    case "3":
      statusText = "완료됨";
      break;
    case "4":
      statusText = "취소환불";
      break;
    case "5":
      statusText = "서버에러";
      break;
    default:
      statusText = "-";
      break;
  }

  return (
    <div className="bg-background-secondary mb-8 flex flex-col gap-5 rounded-xl p-8">
      {/* 회차 정보 [디테일페이지] */}
      {roundMetaData && (
        <div className="flex items-center justify-between">
          <span className="text-body2 w-1/3">래플회차</span>
          <div className="flex w-2/3 gap-2 items-center">
            <div>{roundMetaData.index}회차</div>
            <Tag value={roundMetaData.status} className={"scale-75"} />
          </div>
        </div>
      )}

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
              <CustomTimePicker
                {...field}
                value={field.value}
                onChange={(value: Date | undefined) => field.onChange(value)}
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
              <CustomTimePicker
                {...field}
                value={field.value}
                onChange={(value: Date | undefined) => field.onChange(value)}
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

export default RaffleInfoConfig;
