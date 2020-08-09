import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import LeftContainer from './leftcomponent';
import RightContainer from './rightcomponent';

interface IUserInfo {
  username: string;
  avatar: string;
  balance?: number;
  address: string;
  eth_address: string;
  is_aggregator?: boolean;
}

interface IAmis {
  index: number;
  id?: string;
  name: string;
  description?: string;
}

const SettingContainer: React.FC = () => {
  const [info, setInfo] = useState<IUserInfo>({
    username: '--',
    avatar: `${process.env.PUBLIC_URL}/nav/avatar.png`,
    address: '--',
    eth_address: '--',
  });

  const [amis, setAmis] = useState<IAmis[]>([]);
  const addAMis = (amisname: string) => {
    setAmis([
      ...amis,
      {
        index: amis.length + 1,
        name: amisname,
      },
    ]);
  };

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

  const fetchAmis = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to User Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/amis`,
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
      data.map((item: string) => addAMis(Object.values(item)[2]));
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUser();
      await fetchAmis();
    })();
  }, []);

  return (
    <div className={classnames('setting-container')}>
      <LeftContainer
        username={info.username}
        avatar={info.avatar}
        address={info.address}
        ethAddress={info.eth_address}
      />
      <RightContainer IAmisList={amis} />
    </div>
  );
};

export default SettingContainer;
