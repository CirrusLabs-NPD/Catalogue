import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

interface User {
  name: string;
  username: string;
  role: string;
}

function AdminHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
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

  return (
    <header className="fixed top-0 right-0 w-full bg-white shadow-md p-4 z-10">
      <div className="flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <img
            src="../src/app/assets/bellIcon.png" 
            alt="Notifications"
            className="w-8 h-8 cursor-pointer"
          />
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleIconClick}
            >
              <img
                src="../src/app/assets/profile.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              
            </div>
            {isModalOpen && (
              <div
                ref={modalRef}
                className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-20"
              >
                <div className="flex flex-col items-center space-y-4 p-2">
                <div className="header__user-info">
                  <div className="header__name">{user ? user.name : 'Guest'}</div>
                  <div className="header__location">{user ? user.username : ''}</div>
                  <div className="header__role">{user ? capitalizeFirstLetter(user.role) : ''}</div>
                </div>
                  <div className="text-sm text-gray-700">Home</div>
                  <div className="text-sm text-gray-700">Profile</div>
                  <div className="text-sm text-gray-700">Settings</div>
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
        </div>  
      </div>
    </header>
  );
}

export default AdminHeader;