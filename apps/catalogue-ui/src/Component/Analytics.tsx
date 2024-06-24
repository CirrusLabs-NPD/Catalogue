import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import filter from '../app/assets/filter.png';
import downarr from '../app/assets/arrow-down.png';
import './Analytics.css'

export default function Analytics() {
  return (
    <div className="analytics-container">
      <div>
        <h1 className='title-h1'>Analytics</h1>

        <div className="filter_align">
          <img src={filter} alt="Filter" className="h-5 m-1" />
          <span>Filter</span>
          <img src={downarr} alt="Dropdown Arrow" className="h-5 m-1 ml-14" />
        </div>

        <div className='container border border-gray-300 w-1/2 mt-12 ml-10 bg-gray-100 p-4 rounded-[16px] flex-center'>
          <h2 className='subheading-h2'>Number of Projects Each Quarter</h2>
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
      </div>

      <div className='container border border-gray-300 w-1/3 mt-12 ml-10 bg-gray-100 p-4 rounded-[16px] flex-center'>
        <h2 className='subheading-h2'>Total Projects</h2>
        <PieChart
          colors={['#7AC555', '#FFA500', '#E4CCFD', '#76A5EA']}
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
      </div>
    </div>
  );
}
