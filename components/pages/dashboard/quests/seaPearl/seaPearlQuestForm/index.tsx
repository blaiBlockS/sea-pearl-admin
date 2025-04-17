import { DatePicker } from "@/components/common/datePicker";
import Input from "@/components/common/input";
import { SelectBox } from "@/components/common/selectBox";
import TimePicker from "@/components/common/timePicker";
import { Switch } from "@/components/ui/switch";
import { QuestConfigType } from "@/schemas/quest.schema";
import dayjs from "dayjs";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

interface QuestFormProps {
  control: Control<QuestConfigType>;
  register: UseFormRegister<QuestConfigType>;
  errors: FieldErrors<QuestConfigType>;
}

const QuestForm = ({ control, register, errors }: QuestFormProps) => {
  return (
    <div className="bg-background-secondary mb-8 flex flex-col gap-5 rounded-xl p-8">
      {/* 퀘스트 노출 여부 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 flex-1 max-w-1/5">퀘스트 노출 여부</span>
        <div className="flex  flex-1 max-w-4/5 gap-4">
          <Controller
            name={"enabled"}
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <>
                <Switch onCheckedChange={onChange} checked={value} />
                {value && (
                  <span className="text-text-teritary">
                    *노출 여부 활성화 시 생성하자마자 사용자에게 노출됩니다.
                  </span>
                )}
              </>
            )}
          />
        </div>
      </div>

      {/* 퀘스트 순번 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 flex-1 max-w-1/5">퀘스트 순번</span>
        <div className="flex  flex-1 max-w-4/5 gap-4">
          <Input
            type="number"
            inputClassName="h-10 input-no-spinner"
            placeholder="Enter quantity"
            hint={errors?.questNumber?.message}
            {...register("questNumber", { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* 퀘스트명 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 flex-1 max-w-1/5">퀘스트 명</span>
        <div className="flex  flex-1 max-w-4/5 gap-4">
          <Input
            inputClassName="h-10 input-no-spinner"
            placeholder="Enter quantity"
            hint={errors?.title?.message}
            {...register("title")}
          />
        </div>
      </div>

      {/* 퀘스트 분류 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 flex-1 max-w-1/5">퀘스트 분류</span>
        <div className="flex  flex-1 max-w-4/5 gap-4">
          <Controller
            name={"questLogo"}
            control={control}
            defaultValue="check-in"
            render={({ field: { onChange, value } }) => (
              <SelectBox
                onValueChange={onChange}
                value={value}
                valueList={[
                  "shellraffle",
                  "pearlraffle",
                  "freebox",
                  "website",
                  "telegram",
                  "youtube",
                  "x",
                  "discord",
                  "check-in",
                ]}
              />
            )}
          />
        </div>
      </div>

      {/* 리워드 분류 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 flex-1 max-w-1/5">리워드 분류</span>
        <div className="flex  flex-1 max-w-4/5 gap-4">
          <Controller
            name={`reward.0.type`}
            control={control}
            defaultValue="shell"
            render={({ field: { onChange, value } }) => (
              <SelectBox
                onValueChange={onChange}
                value={value}
                valueList={["shell", "pearl"]}
              />
            )}
          />
        </div>
      </div>

      {/* 리워드 수량 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 flex-1 max-w-1/5">리워드 수량</span>
        <div className="flex  flex-1 max-w-4/5 gap-4">
          <Input
            type="number"
            inputClassName="h-10 input-no-spinner"
            placeholder="Enter quantity"
            {...register("reward.0.amount", { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* 링크 (선택) */}
      <div className="flex items-center justify-between">
        <span className="text-body2 flex-1 max-w-1/5">링크 (선택)</span>
        <div className="flex  flex-1 max-w-4/5 gap-4">
          <Input
            type="string"
            inputClassName="h-10 input-no-spinner"
            placeholder="Enter URL"
            hint={errors?.url?.message}
            {...register("url")}
          />
        </div>
      </div>

      {/* 반복 주기 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 flex-1 max-w-1/5">반복 주기</span>
        <div className="flex  flex-1 max-w-4/5 gap-4">
          <Controller
            name={"resetCycle"}
            control={control}
            defaultValue="daily"
            render={({ field: { onChange, value } }) => (
              <SelectBox
                onValueChange={onChange}
                value={value}
                valueList={["daily", "weekly", "monthly", "none"]}
              />
            )}
          />
        </div>
      </div>

      {/* 퀘스트 완료 기준 횟수 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 flex-1 max-w-1/5">
          퀘스트 완료 기준 횟수
        </span>
        <div className="flex flex-1 max-w-4/5 gap-4">
          <Input
            type="number"
            inputClassName="h-10 input-no-spinner"
            placeholder="Enter quantity"
            hint={errors?.roundInCycle?.message}
            {...register("roundInCycle", { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* 최대 참여자 수 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 flex-1 max-w-1/5">최대 참여자 수</span>
        <div className="flex  flex-1 max-w-4/5 gap-4">
          <Input
            type="number"
            inputClassName="h-10 input-no-spinner"
            placeholder="Enter quantity"
            hint={errors?.maxParticipants?.message}
            {...register("maxParticipants", { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* 시작일시 */}
      <div className="flex items-center justify-between">
        <span className="text-body2 max-w-1/5 flex-1">시작일시</span>
        <div className="flex max-w-4/5 flex-1 gap-4">
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
        <span className="text-body2 max-w-1/5 flex-1">종료일시</span>
        <div className="flex max-w-4/5 flex-1 gap-4">
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
    </div>
  );
};

export default QuestForm;
