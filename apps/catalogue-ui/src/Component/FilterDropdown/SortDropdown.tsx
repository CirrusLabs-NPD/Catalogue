import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDown, SortAsc } from 'lucide-react';
import { sortProjectsByName, sortProjectsByProgress, sortProjectsByEnd, sortProjectsByStart } from '../../api/analytics';

type SortOption = {
  label: string;
  field: 'name' | 'progress' | 'startDate' | 'compeltionDate';
  order: 'ascending' | 'descending';
};

const defaultSort = { label: 'Sort', field: null, order: null };

const sortOptions: SortOption[] = [
  { label: 'Name (A-Z)', field: 'name', order: 'ascending' },
  { label: 'Name (Z-A)', field: 'name', order: 'descending' },
  { label: 'Progress (Low to High)', field: 'progress', order: 'ascending' },
  { label: 'Progress (High to Low)', field: 'progress', order: 'descending' },
  { label: 'Start Date (Old to New)', field: 'startDate', order: 'ascending' },
  { label: 'Start Date (New to Old)', field: 'startDate', order: 'descending' },
  { label: 'Completion Date (Old to New)', field: 'compeltionDate', order: 'ascending' },
  { label: 'Completion Date (New to Old)', field: 'compeltionDate', order: 'descending' },
];

const SortDropdown: React.FC<{ onSortChange: (projects: any[]) => void }> = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState<typeof defaultSort | SortOption>(defaultSort);

  const handleSort = async (option: SortOption) => {
    setSelectedOption(option);
    try {
      let sortedProjects;
      if (option.field === 'name') {
        sortedProjects = await sortProjectsByName(option.order);
      } else if (option.field === 'progress') {
        sortedProjects = await sortProjectsByProgress(option.order);
      } else if (option.field === 'startDate') {
        sortedProjects = await sortProjectsByStart(option.order);
      } else {
        sortedProjects = await sortProjectsByEnd(option.order);
      }
      onSortChange(sortedProjects);
    } catch (error) {
      console.error('Error sorting projects:', error);
    }
  };

  return (
    <div className="font-quicksand">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <SortAsc className="w-5 h-5 mr-2" />
          {selectedOption.label}
          <ChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </Menu.Button>

        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => (
              <Menu.Item key={option.label}>
                {({ active }) => (
                  <button
                    onClick={() => handleSort(option)}
                    className={`${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } group flex items-center w-full px-4 py-2 text-sm`}
                  >
                    {option.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default SortDropdown;