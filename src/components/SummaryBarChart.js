import React from "react";
import { Chart } from "react-google-charts";

export default function SummaryBarChart({data, options}) {

  return (
    <Chart
      chartType="ColumnChart"
      width="95%"
      height="100%"
      options={options}
      data={data}
    />
  );
}
