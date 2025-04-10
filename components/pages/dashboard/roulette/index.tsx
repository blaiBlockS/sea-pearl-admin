import Input from "@/components/common/input";
import { LiveBarConfigType } from "@/schemas/live-bar.schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface LiveBarConfigTableProps {
  register: UseFormRegister<LiveBarConfigType>;
  errors: FieldErrors<LiveBarConfigType>;
}

const LiveBarConfigTable = ({ register, errors }: LiveBarConfigTableProps) => {
  return (
    <div className="flex flex-col gap-5 border p-8 pb-10 rounded-lg border-stroke-secondary bg-background-secondary">
      <div className="flex items-center gap-8">
        <label htmlFor="timeRange" className="w-32">
          집계/게시 주기 (분)
        </label>
        <Input
          id="timeRange"
          type="number"
          placeholder="Enter Quantity"
          {...register("timeRange", { valueAsNumber: true })}
          hint={errors.timeRange?.message}
        />
      </div>
      <div className="flex items-center gap-8">
        <label htmlFor="limit" className="w-32">
          집계 한도 (명)
        </label>
        <Input
          id="limit"
          type="number"
          placeholder="Enter Quantity"
          {...register("limit", { valueAsNumber: true })}
          hint={errors.limit?.message}
        />
      </div>
    </div>
  );
};

export default LiveBarConfigTable;
