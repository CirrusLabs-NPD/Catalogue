// FilterDropdown.tsx
import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import filter from '../../app/assets/filter.png';
import downarr from '../../app/assets/arrow-down.png';
import './filter.css'

const FilterDropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Low to High');

  return (
    <div className="relative inline-block text-left font-quicksand">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className='ml-6'>
              <div className="filter_align-1 flex items-center">
                <img src={filter} alt="Filter Icon" className="h-5 m-1" />
                  <span className="text-gray-600">Filter</span>
                <img src={downarr} alt="Dropdown Icon" className="h-5 m-1 ml-auto" />
              </div>
            </Menu.Button>
            {open && (
              <Menu.Items className="absolute left-8 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSelectedOption('Low to High')}
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex items-center w-full px-4 py-2 text-sm`}
                      >
                        Low to High
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSelectedOption('High to Low')}
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex items-center w-full px-4 py-2 text-sm`}
                      >
                        High to Low
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
      {/*<p className="mt-2">Selected: {selectedOption}</p>*/}
    </div>
  );
};

export default FilterDropdown;
