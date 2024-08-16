import React, { useEffect, useState } from 'react';
import { Menu, MenuButton } from '@headlessui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import filter from '../../app/assets/filter.png';
import downarr from '../../app/assets/arrow-down.png';
import './filter.css';
import { getFilters } from '../../api/analytics';

interface FilterState {
  [key: string]: string[];
}

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? element : <Navigate to="/" replace />;
};

const FilterDropdown: React.FC = () => {
  const [filterState, setFilterState] = useState<FilterState>({});
  const [options, setOptions] = useState<{ [key: string]: string[] }>({});
  const [isOpen, setIsOpen] = useState(false);
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
      console.log(searchParams.toString())
      navigate(`/projects/filter?${searchParams.toString()}`);
      setIsOpen(false);
    }
  };

  const clearFilters = () => {
    setFilterState({});
  };

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
          <div className="absolute left-8 w-96 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="py-1">
              <div className="grid grid-cols-2 gap-4 px-4">
                {categories.map(category => (
                  <div key={category} className="py-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    {isLoading ? (
                      <p className="text-sm text-gray-500 mt-2">Loading options...</p>
                    ) : options[category]?.length > 0 ? (
                      options[category].map((option) => (
                        <label key={option} className="flex items-center mt-2">
                          <input
                            type="checkbox"
                            value={option}
                            checked={(filterState[category] || []).includes(option)}
                            onChange={() => handleOptionSelect(category, option)}
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">{option}</span>
                        </label>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 mt-2">No options available</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="px-4 py-2">
                <button
                  onClick={applyFilters}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded text-sm mb-2"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default FilterDropdown;