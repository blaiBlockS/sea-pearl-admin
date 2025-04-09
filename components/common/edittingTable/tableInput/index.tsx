import React from "react";

export interface TableInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

const TableInput = React.forwardRef<HTMLInputElement, TableInputProps>(
  ({ type = "number", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        {...props}
        className="input-no-spinner hover:bg-background-primary focus:bg-background-primary bg-background-primary/50 w-full rounded px-2 py-1"
      />
    );
  }
);

TableInput.displayName = "TableInput"; // forwardRef 사용 시 필수로 넣는 걸 권장

export default TableInput;
