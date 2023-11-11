import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function CustomBarChart() {
  return (
    <BarChart
      xAxis={[{ data: ["A 65%", "B", "C"], scaleType: 'band' }]}
      series={[{ data: [4, 5, 6]}]}
      width={500}
      height={300}
    />
  )
}
