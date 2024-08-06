import React, { useState, useRef, useEffect } from 'react';
import './Header.css'; // Assuming you use a separate CSS file for styles
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
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      console.log(storedUser);
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
    <header className="header fixed top-0 left-0 w-full">
      <div className="header__logo">
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="header__search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="header__user-info">
        <div className="header__name">{user ? user.name : 'Guest'}</div>
        <div className="header__location">{user ? user.username : ''}</div>
        <div className="header__role">{user ? capitalizeFirstLetter(user.role) : ''}</div>
      </div>
      <div className="header__icon" onClick={handleIconClick}>
        <FontAwesomeIcon icon={faAngleDown} size="xl" />
        {isModalOpen && (
          <div ref={modalRef} className="header__dropdown">
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
