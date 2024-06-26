import React, { useState, useRef, useEffect } from 'react';
import './Header.css'; // Assuming you use a separate CSS file for styles
import logo from '../app/assets/CirrusLabsLogo.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
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
    setIsModalOpen(false); 
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/home">
          {' '}
          {/* Navigate to Home page */}
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="header__search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="header__user-info">
        <div className="header__name">Rohan Shah</div>
        <div className="header__location">Darjeeling, WB</div>
      </div>
      <div className="header__icon" onClick={handleIconClick}>
        <FontAwesomeIcon icon={faAngleDown} size="xl" />
      </div>
      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-4 mt-40"
        >
          <div className="flex flex-col items-center space-y-4 ">
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
    </header>
  );
}

export default Header;

