import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import sortIcon from '../../app/assets/setting-2.png';
import downarr from '../../app/assets/arrow-down.png';
import { sortProjectsByName, sortProjectsByProgress, sortProjectsByEnd, sortProjectsByStart } from '../../api/analytics';
import './filter.css'

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
    <div className="relative inline-block text-left font-quicksand">
      <Menu>
        {({ open }) => (
          <>
            <MenuButton className="filter_align-1 flex items-center">
              <img src={sortIcon} alt="Sort Icon" className="h-5 m-1" />
              <span className="text-gray-600">{selectedOption.label}</span>
              <img src={downarr} alt="Dropdown Icon" className="h-5 m-1 ml-auto" />
            </MenuButton>
            {open && (
              <MenuItems className="absolute left-2 w-64 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.label}>
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
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            )}
          </>
        )}
      </Menu>
    </div>
  );
};

export default SortDropdown;