import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Content from './content';
import Title from './title';
import Time from './time';
import User from './user';
import taipower from '../taipower.json';

const Navbar: React.FC = () => {
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  const [navbarType, setNavbarType] = useState<string>('');

  useEffect(() => {
    if (user.is_aggregator && !taipower.is_taipower)
      setNavbarType(classnames('navbar', 'navbar--Aggregator'));
    else if (taipower.is_taipower)
      setNavbarType(classnames('navbar', 'navbar--Taipower'));
    else setNavbarType(classnames('navbar'));
  }, [user.is_aggregator]);

  return (
    <nav className={navbarType}>
      <Title />
      <User />
      <Content
        isUser={!user.is_aggregator}
        isAggregator={user.is_aggregator}
        isTaipower={taipower.is_taipower}
      />
      <Time />
    </nav>
  );
};

export default Navbar;
