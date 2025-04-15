import { TimePicker as AntDTimePicker } from "antd";
import "./TimePickerDark.css";
import { Dayjs } from "dayjs";
import React from "react";

interface TimePickerProps {
  value: Dayjs;
  onChange: (val: Dayjs) => void;
  format: string;
}

const TimePicker = React.forwardRef<any, TimePickerProps>(
  ({ value, onChange, format, ...props }: TimePickerProps) => {
    return (
      <AntDTimePicker
        className="flex-1"
        value={value}
        onChange={onChange}
        format={format}
        {...props}
      />
    );
  }
);

export default TimePicker;
