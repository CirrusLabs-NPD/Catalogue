import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <PieChart
      colors ={['#7AC555', '#FFA500', '#E4CCFD', '#76A5EA']}
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Ongoing' },
            { id: 1, value: 15, label: 'Completed' },
            { id: 2, value: 20, label: 'Delayed' },
            { id: 3, value: 1, label: 'At Risk' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}