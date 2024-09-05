import React, { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Filter, X } from 'lucide-react';
import { getFilters } from '../../api/analytics';

interface FilterState {
  [key: string]: string[];
}

const FilterDropdown: React.FC = () => {
  const [filterState, setFilterState] = useState<FilterState>({});
  const [options, setOptions] = useState<{ [key: string]: string[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ['technology', 'resources', 'statuses', 'members'];

  useEffect(() => {
    categories.forEach(fetchFilterOptions);
  }, []);

  const fetchFilterOptions = async (category: string) => {
    setIsLoading(true);
    try {
      const response = await getFilters(category);
      setOptions(prev => ({
        ...prev,
        [category]: Array.isArray(response) ? response : response.data || []
      }));
    } catch (error) {
      console.error(`Error fetching filter options for ${category}:`, error);
      setOptions(prev => ({ ...prev, [category]: [] }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (category: string, option: string) => {
    setFilterState(prev => {
      const categoryOptions = prev[category] || [];
      const updatedOptions = categoryOptions.includes(option)
        ? categoryOptions.filter(o => o !== option)
        : [...categoryOptions, option];
      
      return {
        ...prev,
        [category]: updatedOptions
      };
    });
  };

  const applyFilters = () => {
    const searchParams = new URLSearchParams();
    
    Object.entries(filterState).forEach(([category, selectedOptions]) => {
      if (selectedOptions.length > 0) {
        searchParams.append(category, selectedOptions.join(','));
      }
    });
    
    if (searchParams.toString()) {
      navigate(`/projects/filter?${searchParams.toString()}`);
    }
  };

  const clearFilters = () => {
    setFilterState({});
  };

  const removeFilter = (category: string, option: string) => {
    setFilterState(prev => ({
      ...prev,
      [category]: prev[category].filter(o => o !== option)
    }));
  };

  return (
    <div className="font-quicksand flex justify-end">
      {/* Added flex justify-end to align it to the right */}
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Filter className="w-5 h-5 mr-2" />
          Filter
          <ChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </Menu.Button>

        <Menu.Items className="absolute right-0 w-96 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Filters</h3>
            {categories.map(category => (
              <div key={category} className="mt-4">
                <Menu as="div" className="relative inline-block text-left w-full">
                  <Menu.Button className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    <ChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
                  </Menu.Button>
                  <Menu.Items className="absolute z-10 w-full mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 max-h-60 overflow-y-auto">
                      {isLoading ? (
                        <div className="px-4 py-2 text-sm text-gray-500">Loading options...</div>
                      ) : options[category]?.length > 0 ? (
                        options[category].map((option) => (
                          <Menu.Item key={option}>
                            <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <input
                                type="checkbox"
                                value={option}
                                checked={(filterState[category] || []).includes(option)}
                                onChange={() => handleOptionSelect(category, option)}
                                className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <span className="ml-2">{option}</span>
                            </label>
                          </Menu.Item>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">No options available</div>
                      )}
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            ))}
          </div>
          <div className="px-4 py-3">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filterState).map(([category, selectedOptions]) =>
                selectedOptions.map(option => (
                  <span key={`${category}-${option}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {option}
                    <button
                      type="button"
                      onClick={() => removeFilter(category, option)}
                      className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                    >
                      <span className="sr-only">Remove filter for {option}</span>
                      <X className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
          <div className="px-4 py-3">
            <button
              onClick={applyFilters}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="mt-2 w-full px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear Filters
            </button>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default FilterDropdown;
