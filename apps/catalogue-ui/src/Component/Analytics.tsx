import filter from '../app/assets/filter.png';
import downarr from '../app/assets/arrow-down.png';
import './Analytics.css'
import StickyHeadTable from './Table';
import BarGraph from './BarGraph';
import BasicPie from './PieChart';

export default function Analytics() {
  return (
    <div className="analytics-container">
        <h1 className="analytics_header">Analytics</h1>
        <div className="header_align_home">
          <div className="filter_align">
            <img src={filter} alt="Logo" className="h-5 m-1" />
            <span>Filter</span>
            <img src={downarr} alt="Logo" className="h-5 m-1 ml-4" />
          </div>
        </div>

      <div className="grid grid-cols-1 ml-8 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className='text-center font-bold text-lg md:text-xl mb-3'>Number of Projects Each Quarter</h2>
          <BarGraph/>            
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className='text-center font-bold text-lg md:text-xl mb-3'>Total Projects</h2>
          <div className="flex justify-center items-center p-4 rounded-lg">
            <BasicPie/>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow md:col-span-2">
          <h2 className='text-center font-bold text-lg md:text-xl mb-3'>Project Summary</h2>
          <StickyHeadTable/>
        </div>
      </div>
    </div>
  );
}
