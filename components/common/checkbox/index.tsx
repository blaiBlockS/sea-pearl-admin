import { LucideCheck } from "lucide-react";
import React from "react";

interface CheckBoxProps {}

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ ...props }, ref) => {
    return (
      <label className="flex">
        <input ref={ref} type="checkbox" className="peer hidden" {...props} />
        <div
          className={`w-4 h-4 rounded-xs border border-stroke-secondary bg-background-primary peer-checked:border-none peer-checked:bg-blue-500`}
        />
        <LucideCheck
          size={12}
          className="w-4 h-4 peer-checked:opacity-100 opacity-0 absolute"
        />
      </label>
    );
  }
);

CheckBox.displayName = "CheckBox";

export default CheckBox;
