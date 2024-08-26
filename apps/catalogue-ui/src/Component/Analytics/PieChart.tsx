import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { getStatusCount } from '../../api/analytics';

interface ChartData {
  id: number;
  value: number;
  label: string;
}

// Memoize the color generation function
const generateColor = (index: number, total: number): string => {
  const hue = (index / total) * 360;
  return `hsl(${hue}, 70%, 50%)`;
};

const BasicPie: React.FC = () => {
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
        setColors(transformedData.map((_, index) => generateColor(index, transformedData.length)));
      } catch (error) {
        console.error("Error fetching status count:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PieChart
      colors={colors}
      series={[{ data: chartData }]}
      width={500}
      height={200}
    />
  );
};

export default BasicPie;
