import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Content from './content';
import Title from './title';
import Time from './time';
import User from './user';

interface IUserInfo {
  username?: string;
  avatar?: string;
  balance?: number;
  address?: string;
  eth_address?: string;
  is_aggregator: boolean;
}

const Navbar: React.FC = () => {
  const [info, setInfo] = useState<IUserInfo>({
    is_aggregator: false,
  });

  const fetchUser = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to User Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/user`,
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
      },
    );
    if (response.status === 200) {
      // fetch success
      const data = await response.json();
      setInfo(data);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  let navbarType = '';
  if (info.is_aggregator === true)
    navbarType = classnames('navbar', 'navbar--Aggregator');
  else navbarType = classnames('navbar');

  return (
    <nav className={navbarType}>
      <Title />
      <User />
      <Content />
      <Time />
    </nav>
  );
};

export default Navbar;
