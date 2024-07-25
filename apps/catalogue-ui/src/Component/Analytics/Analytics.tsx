import './Analytics.css';
import StickyHeadTable from './Table';
import BarGraph from './BarGraph';
import BasicPie from './PieChart';
import FilterDropdown from '../FilterDropdown/filter';

export default function Analytics() {
  return (
    <div className="ml-64 mt-6 h-[calc(100%-100px)] overflow-y-scroll">
      <div className="analytics-container">
        <h1 className="analytics_header">Analytics</h1>
        <div className="mt-4 mb-4 ">
          <FilterDropdown />
        </div>

        <div className="grid grid-cols-1 ml-8 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-center font-bold text-lg md:text-xl mb-3">
              Number of Projects Per Month
            </h2>
            <div className="flex justify-center items-center p-4 rounded-lg">
              <BarGraph />
            </div>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-center font-bold text-lg md:text-xl mb-3">
              Total Projects by Status
            </h2>
            <div className="flex justify-center items-center p-4 rounded-lg">
              <BasicPie />
            </div>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow md:col-span-2">
            <h2 className="text-center font-bold text-lg md:text-xl mb-3">
              Project Summary
            </h2>
            <StickyHeadTable />
          </div>
        </div>
      </div>
    </div>
  );
}
