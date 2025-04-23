import { cn } from "@/utils/cn";

interface ColumnBoxProps {
  columnName: string;
  columnValue: string | number | null;
  justify?: "between" | "start";
}

const ColumnBox = ({
  columnName,
  columnValue,
  justify = "between",
}: ColumnBoxProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        justify === "between" ? "justify-between" : "justify-start"
      )}
    >
      <span className="text-body4-medium text-text-teritary">{columnName}</span>
      <span className="flex text-body4-medium">{columnValue ?? "-"}</span>
    </div>
  );
};

export default ColumnBox;
