// CalendarDropdown.tsx
import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import calendar from '../../app/assets/calendar.png';
import downarr from '../../app/assets/arrow-down.png';
import './filter.css'

const CalendarDropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Today');

  return (
    <div className="relative inline-block text-left font-quicksand">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button>
              <div className="filter_align-1 flex items-center">
                <img src={calendar} alt="Calendar Icon" className="h-5 m-1" />
                  <span className="text-gray-600">Today</span>
                <img src={downarr} alt="Dropdown Icon" className="h-5 m-1 ml-auto" />
              </div>
            </Menu.Button>
            {open && (
              <Menu.Items className="absolute left-2 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSelectedOption('Today')}
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex items-center w-full px-4 py-2 text-sm`}
                      >
                        Today
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSelectedOption('Last month')}
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex items-center w-full px-4 py-2 text-sm`}
                      >
                        Last month
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

export default CalendarDropdown;
