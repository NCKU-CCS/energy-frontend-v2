import React, { useEffect, useState } from 'react';

interface IUserInfo {
  username: string;
  avatar: string;
  balance?: number;
  address?: string;
  eth_address?: string;
  is_aggregator: boolean;
}

const User: React.FC = () => {
  const [info, setInfo] = useState<IUserInfo>({
    username: '--',
    avatar: `${process.env.PUBLIC_URL}/nav/avatar.png`,
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
    } else {
      // fetch failure
      const data = await response.json();
      // eslint-disable-next-line no-alert
      alert(data);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  return (
    <div className="navbar-user">
      <img className="navbar-avatar" alt="" src={info.avatar} />
      <div className="navbar-username-box">
        {info.is_aggregator && <span className="navbar-star">★</span>}
        <span className="navbar-username">{info.username}</span>
      </div>
    </div>
  );
};

export default User;
