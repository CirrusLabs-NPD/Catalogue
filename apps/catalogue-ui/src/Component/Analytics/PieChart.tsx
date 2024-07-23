import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { getStatusCount } from '../../api/analytics';
import { useEffect, useState } from 'react';

interface ChartData {
  id: number;
  value: number;
  label: string;
}

export default function BasicPie() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStatusCount();
        const transformedData = Object.keys(data).map((key, index) => ({
          id: index,
          value: data[key],
          label: key
        }));
        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching status count:", error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <PieChart
      colors ={['#7AC555', '#FFA500', '#E4CCFD', '#76A5EA']}
      series={[
        {
          data: chartData,
        },
      ]}
      width={400}
      height={200}
    />
  );
}