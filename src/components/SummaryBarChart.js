import React from "react";
import { Chart } from "react-google-charts";

export default function SummaryBarChart({data}) {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="90%"
      data={data}
    />
  );
}
