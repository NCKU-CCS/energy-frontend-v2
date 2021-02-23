import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Content from './content';
import Title from './title';
import Time from './time';
import User from './user';

const Navbar: React.FC = () => {
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  const [navbarType, setNavbarType] = useState<string>('');

  useEffect(() => {
    if (user.role === 'aggregator')
      setNavbarType(classnames('navbar', 'navbar--Aggregator'));
    else if (user.role === 'tpc')
      setNavbarType(classnames('navbar', 'navbar--Taipower'));
    else setNavbarType(classnames('navbar'));
  }, [user.role]);

  return (
    <nav className={navbarType}>
      <Title />
      <User />
      <Content
        isUser={user.role === 'user'}
        isAggregator={user.role === 'aggregator'}
        isTaipower={user.role === 'tpc'}
      />
      <Time />
    </nav>
  );
};

export default Navbar;
