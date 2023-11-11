import React from "react";
import { Chart } from "react-google-charts";
import {COLOR} from "../../../util/util";

export default function SummaryBarChart({data, options}) {

  const defaultOptions = {
    backgroundColor: 'transparent', // Example color
    colors: [COLOR.blue],
    titleTextStyle: {
      color: COLOR.default,
    },
    hAxis: {
      textStyle: {
        color: COLOR.default,
      },
    },
    vAxis: {
      textStyle: {
        color: COLOR.default,
      }
    },
    legend: {
      textStyle: {
        color: COLOR.default,
      }
    },
  };

  const combinedOptions = { ...defaultOptions, ...options };

  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="100%"
      options={combinedOptions}
      data={data}
    />
  );
}
