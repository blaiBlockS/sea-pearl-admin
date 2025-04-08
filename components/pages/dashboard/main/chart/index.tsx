"use client";

import { ChartIngredient } from "@/types/chart";
import { useEffect } from "react";
import {
  CartesianGrid,
  // Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./chartTooltip";
import { DateRangePicker } from "../../../../common/dateRangePicker";

interface LineChartBoxProps {
  chartName: string;
  isLegendOn?: boolean;
  isDatePickerOn?: boolean;
  data: ChartIngredient[];
}

const LineChartBox = ({
  chartName,
  isLegendOn = false,
  isDatePickerOn = false,
  data,
}: LineChartBoxProps) => {
  useEffect(() => {}, []);

  const pvColor = "#3382F9";
  const uvColor = "#48BCFF";
  const amtColor = "#777777";
  const colorArray = [pvColor, uvColor, amtColor];

  // 항목(레전드)에 들어갈 항목
  let labels: string[] | null = null;
  if (data[0]) {
    labels = Object.keys(data[0]).filter((item) => item !== "name");
  }

  return (
    <div className="bg-background-secondary border-stroke-secondary aspect-[772/474] rounded-xl border p-8 pb-10">
      {/* 헤드라인 */}
      <div className="flex items-center justify-between pb-8">
        <div className="flex items-center gap-9">
          {/* 이름 */}
          <span className="text-head2">{chartName}</span>

          {/* 항목 (레전드) */}
          {isLegendOn && (
            <section className="flex gap-5">
              {labels?.map((item, index) => {
                return (
                  <div key={item} className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-2xl"
                      style={{ backgroundColor: colorArray[index] }}
                    />
                    <span className="text-body4-medium text-text-teritary">
                      {item}
                    </span>
                  </div>
                );
              })}
            </section>
          )}
        </div>

        {isDatePickerOn && <DateRangePicker />}
      </div>

      {/* 차트 */}
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart //
          data={data}
        >
          {/* 격자선 */}
          <CartesianGrid //
            strokeWidth={0.3}
            vertical={false}
          />

          {/* XY축 설정 */}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "white" }}
            tickLine={false}
            tickMargin={12}
          />
          <YAxis
            axisLine={false}
            dataKey={undefined}
            tick={{ fontSize: 12, fill: "white" }}
            tickLine={false}
            tickMargin={24}
          />

          {/* 툴팁 */}
          <Tooltip
            cursor={{ stroke: amtColor, strokeDasharray: "3 3" }}
            formatter={(value: number) => `${value.toLocaleString()}`}
            content={<CustomTooltip />}
          />

          {/* 차트 선들 */}
          <Line
            type="monotone"
            dataKey="amt"
            stroke={amtColor}
            dot={{ fill: "white", stroke: amtColor, strokeWidth: 0, r: 0 }}
          />
          <Line
            type="linear"
            dataKey="pv"
            stroke={pvColor}
            dot={{ fill: "white", stroke: pvColor, strokeWidth: 3, r: 3.5 }}
          />
          <Line
            type="linear"
            dataKey="uv"
            stroke={uvColor}
            dot={{ fill: "white", stroke: uvColor, strokeWidth: 3, r: 3.5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartBox;
