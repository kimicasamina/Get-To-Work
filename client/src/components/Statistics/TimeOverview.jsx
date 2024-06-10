import React from "react";
import { BarCharts } from "../Charts/BarCharts";

export default function TimeOverview({ data }) {
  return (
    <div className="w-full bg-primary">
      <BarCharts data={data} />
    </div>
  );
}
