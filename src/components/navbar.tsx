import React from 'react';
import dayjs from 'dayjs';
import { FaAlignJustify } from 'react-icons/fa';
import NavLink from './navlink';

const getCurrentTime = () => dayjs().format('YYYY/MM/DD HH:mm');

const Navbar: React.FC = () => {
  const dropdownRef = React.createRef<HTMLDivElement>();

  const handleDropdown = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (dropdownRef.current?.classList.contains('navbar-dropdown')) {
      dropdownRef.current?.classList.replace(
        'navbar-dropdown',
        'navbar-dropdown--show',
      );
    } else {
      dropdownRef.current?.classList.replace(
        'navbar-dropdown--show',
        'navbar-dropdown',
      );
    }
  };

  const handleLogout = (event: React.SyntheticEvent) => {
    event.preventDefault();
    localStorage.removeItem('BEMS_USER');
    sessionStorage.removeItem('BEMS_USER');
    window.location.replace('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <span>能源交易平台</span>
      </div>
      <div className="navbar-content">
        <div
          className="navbar-button"
          onClick={handleDropdown}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <FaAlignJustify />
        </div>
        <div ref={dropdownRef} className="navbar-dropdown">
          <NavLink pathname="/" imgName="home_icon" name="首頁　　" />
          <NavLink pathname="/bidding" imgName="b_icon" name="投標　　" />
          <NavLink pathname="/status" imgName="bs_icon" name="競標動態" />
          <NavLink
            pathname="/power_info"
            imgName="flash_icon"
            name="電力資訊"
          />
          <NavLink pathname="/setting" imgName="setting_icon" name="設定　　" />
          <NavLink
            onLogout={handleLogout}
            imgName="logout_icon"
            name="登出　　"
          />
        </div>
      </div>
      <div className="navbar-time">{getCurrentTime()}</div>
    </nav>
  );
};

export default Navbar;
