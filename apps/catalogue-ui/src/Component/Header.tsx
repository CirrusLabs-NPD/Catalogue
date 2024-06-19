import React from 'react';
import './Header.css'; // Assuming you use a separate CSS file for styles
import logo from '../app/assets/CirrusLabsLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="header__search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="header__user-info">
        <div className="header__name">
          Rohan Shah
        </div>
        <div className="header__location">
          Darjeeling, WB
        </div>
      </div>
      <div className="header__icon">
        <FontAwesomeIcon icon={faAngleDown} size='xl' />
      </div>
    </header>
  );
}

export default Header;
