import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import List from './list';
import Percentage from './percentage';
import Train from './train';

interface IListInfo {
  bid_type: string;
  status: string;
  date: string;
  time: string;
  bids: {
    price: number;
  };
}

const Status: React.FC = () => {
  const [listInfo, setListInfo] = useState<IListInfo[]>([]);

  const fetchMatchResult = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to User Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/matchresult`,
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
      setListInfo(data);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchMatchResult();
    })();
  }, []);

  return (
    <div className={classnames('status')}>
      <div className={classnames('status-upContainer')}>
        <Percentage />
        <Train />
      </div>
      <List listInfo={listInfo} />
    </div>
  );
};

export default Status;
