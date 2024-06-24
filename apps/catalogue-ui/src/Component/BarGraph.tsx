import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

const BarGraph = () => {
  return (
    <div>
          <BarChart
            colors={['#7AC555', '#FFA500', '#E4CCFD', '#76A5EA']}
            series={[
              { data: [35, 44, 24, 34] },
              { data: [51, 6, 49, 30] },
              { data: [15, 25, 30, 50] },
              { data: [60, 50, 15, 25] },
            ]}
            height={200}
            width={600}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 20, left: 30, right: 20 }}
          />
    </div>
  )
}

export default BarGraph