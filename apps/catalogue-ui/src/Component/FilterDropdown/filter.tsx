import React, { useEffect, useState } from 'react';
import { Menu, MenuButton } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import filter from '../../app/assets/filter.png';
import downarr from '../../app/assets/arrow-down.png';
import './filter.css';
import { getFilters } from '../../api/analytics';

const FilterDropdown: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory) {
      fetchFilterOptions(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchFilterOptions = async (category: string) => {
    setIsLoading(true);
    try {
      const response = await getFilters(category);
      setOptions(Array.isArray(response) ? response : response.data || []);
    } catch (error) {
      console.error('Error fetching filter options:', error);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedOptions([]);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const applyFilters = () => {
    if (!selectedCategory || selectedOptions.length === 0) return;

    const searchParams = new URLSearchParams();
    selectedOptions.forEach(option => searchParams.append('value', option));
    
    navigate(`/projects/filter/${selectedCategory}?${searchParams.toString()}`);
    setIsOpen(false);
  };

  const categories = ['technology', 'resources', 'statuses', 'members'];

  return (
    <div className="relative inline-block text-left font-quicksand z-10">
      <Menu as="div" className="relative">
        <MenuButton
          onClick={() => setIsOpen(!isOpen)}
          className='ml-6'
        >
          <div className="filter_align-1 flex items-center">
            <img src={filter} alt="Filter Icon" className="h-5 m-1" />
            <span className="text-gray-600">Filter</span>
            <img src={downarr} alt="Dropdown Icon" className="h-5 m-1 ml-auto" />
          </div>
        </MenuButton>

        {isOpen && (
          <div className="absolute left-8 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
            {!selectedCategory ? (
              <div className="py-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-1">
                <div className="px-4 py-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                  </h3>
                  {isLoading ? (
                    <p className="text-sm text-gray-500 mt-2">Loading options...</p>
                  ) : options.length > 0 ? (
                    options.map((option) => (
                      <label key={option} className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          value={option}
                          checked={selectedOptions.includes(option)}
                          onChange={() => handleOptionSelect(option)}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">{option}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">No options available</p>
                  )}
                </div>
                <div className="px-4 py-2">
                  <button
                    onClick={applyFilters}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded text-sm"
                  >
                    Apply Filters
                  </button>
                </div>
                <div className="border-t border-gray-200"></div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Back to Categories
                </button>
              </div>
            )}
          </div>
        )}
      </Menu>
    </div>
  );
};

export default FilterDropdown;