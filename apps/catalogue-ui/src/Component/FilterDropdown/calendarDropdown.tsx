// CalendarDropdown.tsx
import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import calendar from '../../app/assets/calendar.png';
import downarr from '../../app/assets/arrow-down.png';

const CalendarDropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Today');

  return (
    <div className="relative inline-block text-left font-quicksand">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="inline-flex justify-center w-full px-6 py-3 text-sm font-medium text-[#787486] bg-white border border-[#787486] rounded-md hover:bg-gray-100 focus:outline-none ">
            <img src={calendar} alt="Logo" className="m-1" />
              Today
            <img src={downarr} alt="Logo" className="m-1" />
            </Menu.Button>
            {open && (
              <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ">
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