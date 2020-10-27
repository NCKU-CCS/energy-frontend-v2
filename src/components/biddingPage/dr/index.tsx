import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import List from './list';
import PageControl from './pageControl';

const Dr: React.FC = () => {
  // is aggregator or not
  const [isAggr, setIsAggr] = useState<boolean>(false);

  // user api
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
      setIsAggr(data.is_aggregator);
      // eslint-disable-next-line no-alert
    } else alert('failed fetching user info');
  };

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  return (
    <div className={classNames('bidding-dr-container-in')}>
      <div className={classNames('bidding-dr-title-container')}>
        {isAggr ? '需量反應決標' : '需量反應競標'}
      </div>
      <div className={classNames('bidding-dr-list-container-out')}>
        <List isAggr={isAggr} />
      </div>
      <div className={classNames('bidding-dr-pagecontrol-container-out')}>
        <PageControl />
      </div>
    </div>
  );
};

export default Dr;
