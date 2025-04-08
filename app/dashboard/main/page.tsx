import Title from "@/components/layout/title";
import LineChartBox from "@/components/pages/dashboard/main/chart";

const dummy = [
  {
    name: "25 Q1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "25 Q2",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "25 Q3",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "25 Q4",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "26 Q1",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "26 Q2",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "26 Q3",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "26 Q4",
    uv: 3290,
    pv: 5500,
    amt: 2100,
  },
];

export default function Dashboard() {
  return (
    <div className="px-9 py-7">
      {/* 타이틀 */}
      <Title>메인</Title>

      {/* 차트들 */}
      <div className="grid grid-cols-2 grid-rows-2 gap-8">
        <LineChartBox //
          chartName={"유저 수"}
          data={dummy}
          isLegendOn
        />
        <LineChartBox
          chartName={"기간 별 유저 수"}
          data={dummy}
          isDatePickerOn
          isLegendOn
        />
        <LineChartBox //
          chartName={"광고 시청 수"}
          data={dummy}
        />
        <LineChartBox
          chartName={"기간 별 광고 시청 수"}
          data={dummy}
          isDatePickerOn
        />
      </div>
    </div>
  );
}
