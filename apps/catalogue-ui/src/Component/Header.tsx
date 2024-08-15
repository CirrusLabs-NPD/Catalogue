import React, { useState, useRef, useEffect } from 'react';
import logo from '../app/assets/CirrusLabsLogo.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface User {
  name: string;
  username: string;
  role: string;
}

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleIconClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    setIsModalOpen(false);
    navigate('/');
    window.location.reload();
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-results?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="flex items-center justify-between p-2.5 bg-[#f8f9fa] border border-gray-300 relative fixed top-0 left-0 w-full">
      <div className="ml-7">
        <Link to="/home">
          <img src={logo} alt="Logo" className="h-[55px]" />
        </Link>
      </div>
      <div className="flex-1 ml-[10%] mr-5">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}  // Update searchTerm state on input change
            className="w-full p-2.5 border border-gray-300 rounded-lg"
          />
        </form>
      </div>
      <div className="flex flex-col items-end mr-5">
        <div className="text-xl font-bold">{user ? user.name : 'Guest'}</div>
        <div className="text-sm text-gray-500">{user ? user.username : ''}</div>
        <div className="text-sm text-gray-700 mt-1">
          {user ? capitalizeFirstLetter(user.role) : ''}
        </div>
      </div>
      <div
        className="relative ml-2.5 cursor-pointer"
        onClick={handleIconClick}
      >
        <FontAwesomeIcon icon={faAngleDown} size="xl" />
        {isModalOpen && (
          <div
            ref={modalRef}
            className="absolute top-[calc(100%+25px)] right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="text-sm text-gray-700">Profile Settings</div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;