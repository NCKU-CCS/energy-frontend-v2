import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { FaAlignJustify } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import NavLink from './link';

interface IContent {
  isAggregator: boolean;
}

const Content: React.FC<IContent> = ({ isAggregator }) => {
  const dropdownRef = React.createRef<HTMLDivElement>();
  const [navbarClass, setNavbarClass] = useState<string>('');
  const { t } = useTranslation();

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

  useEffect(() => {
    setNavbarClass(
      `${
        isAggregator
          ? classnames('navbar-dropdown', 'navbar-dropdown--Aggregator')
          : classnames('navbar-dropdown')
      }`,
    );
  }, [isAggregator]);

  return (
    <div className="navbar-content">
      {/**
       * Button for display Dropdown Menu
       */}
      <div
        className="navbar-button"
        onClick={handleDropdown}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        <FaAlignJustify />
      </div>
      {/**
       * Dropdown Menu
       */}
      <div ref={dropdownRef} className={navbarClass}>
        <NavLink pathname="/" imgName="home_icon" name={t('navbar.home')} />
        <NavLink pathname="/dr_bid" imgName="b_icon" name={t('navbar.drBid')} />
        <NavLink
          pathname="/status"
          imgName="bs_icon"
          name={t('navbar.status')}
        />
        <NavLink
          pathname="/power_info"
          imgName="flash_icon"
          name={t('navbar.powerInfo')}
        />
        <NavLink
          pathname="/setting"
          imgName="setting_icon"
          name={t('navbar.setting')}
        />
        <NavLink
          onLogout={handleLogout}
          imgName="logout_icon"
          name={t('navbar.logout')}
        />
      </div>
    </div>
  );
};

export default Content;
