import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  formatDate,
  formatDateShort,
  formatDuration,
} from "../../utils/helper";
import tailwindConfig from "../../../tailwind.config";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return (
    <text
      // x={x + width / 2}
      // y={y}
      fill="#666"
      textAnchor="middle"
      // dy={-6}
    >{`${formatDateShort(value)}`}</text>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const time = `${formatDuration(payload[0].value)}`;
    const foo = payload;
    return (
      <div className="w-auto p-2 bg-primary text-gray-100 rounded-sm">
        <p className="">{`${label}`}</p>
        <p className="">Total hours: {time}</p>
      </div>
    );
  }

  return null;
};

export default function TimeCharts({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        width={500}
        height={100}
        margin={{
          top: 15,
          right: 50,
          left: 50,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid /> */}
        <XAxis dataKey="date" />
        {/* <YAxis dataKey="totalDuration" /> */}
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="totalDuration"
          fill={`${tailwindConfig.theme.colors.success}`}
          barSize={14}
          maxBarSize={0}
          enableBackground={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
