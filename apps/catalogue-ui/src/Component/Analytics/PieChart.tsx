import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { getStatusCount } from '../../api/analytics';
import { useEffect, useState } from 'react';

interface ChartData {
  id: number;
  value: number;
  label: string;
}

// Function to generate a color
function generateColor(index: number, total: number): string {
  const hue = (index / total) * 360;
  return `hsl(${hue}, 70%, 50%)`;
}

export default function BasicPie() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [colors, setColors] = useState<string[]>([]);

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

        // Generate colors based on the number of statuses
        const generatedColors = transformedData.map((_, index) => 
          generateColor(index, transformedData.length)
        );
        setColors(generatedColors);
      } catch (error) {
        console.error("Error fetching status count:", error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <PieChart
      colors={colors}
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