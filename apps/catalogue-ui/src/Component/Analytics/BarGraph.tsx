import React, { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { getMonthlyCompletion } from '../../api/analytics';

const BarGraph = () => {
  const [monthlyCompletions, setMonthlyCompletions] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMonthlyCompletion();
        setMonthlyCompletions(response.monthlyCompletions);
      } catch (error) {
        console.error("Error fetching monthly completions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <BarChart
        colors={['#7AC555', '#FFA500', '#E4CCFD', '#76A5EA']}
        series={[
          { data: monthlyCompletions }
        ]}
        height={200}
        width={600}
        xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], scaleType: 'band' }]}
        margin={{ top: 10, bottom: 20, left: 30, right: 20 }}
      />
    </div>
  );
}

export default BarGraph;