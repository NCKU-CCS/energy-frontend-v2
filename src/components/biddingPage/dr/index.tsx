import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import List from './list';
import AddBid from './addBid';
import PageControl from './pageControl';
import testData from './user.json';

interface IData {
  date: string;
  interval: string;
  time: number;
  value: number;
  price: number;
  total: number;
  status: string;
}

const Dr: React.FC = () => {
  // data
  const [data, setData] = useState<IData[]>(testData);

  // is aggregator or not
  const [isAggr, setIsAggr] = useState<boolean>(false);

  // class name
  const [className, setClassName] = useState<string>('--user');

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
      const apiData = await response.json();
      setIsAggr(apiData.is_aggregator);
      // eslint-disable-next-line no-alert
    } else alert('failed fetching user info');
  };

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  useEffect(() => {
    setClassName(isAggr ? '--aggr' : '--user');
  }, [isAggr]);

  return (
    <div className={classNames('bidding-dr-container-in')}>
      <div className={classNames(`bidding-dr-title-container${className}`)}>
        {isAggr ? '需量反應決標' : '需量反應競標'}
      </div>
      <div className={classNames(`bidding-dr-list-container-out${className}`)}>
        <List data={data} setData={setData} isAggr={isAggr} />
      </div>
      {!isAggr && (
        <div className={`bidding-dr-addbid-container-out${className}`}>
          <AddBid data={data} setData={setData} />
        </div>
      )}
      <div
        className={classNames(
          `bidding-dr-pagecontrol-container-out${className}`,
        )}
      >
        <PageControl />
      </div>
    </div>
  );
};

export default Dr;
