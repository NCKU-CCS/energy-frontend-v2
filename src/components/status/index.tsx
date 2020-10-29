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
    value: number;
  };
  counterpart: {
    address: string;
    name: string;
  };
  wins: {
    price: number;
    value: number;
  };
  transaction_hash: string;
  id: string;
  upload: string;
  achievement: number;
}

interface ITrainInfo {
  bids: {
    price: number;
    value: number;
  };
  counterpart: {
    address: string;
    name: string;
  };
  id: string;
  status: string;
  upload: string;
  wins: {
    price: number;
    value: number;
  };
}

interface IStatus {
  status: string;
  achievement: number;
}

const Status: React.FC = () => {
  const [listInfo, setListInfo] = useState<IListInfo[]>([]);
  const [trainInfo, setTrainInfo] = useState<ITrainInfo[]>([]);
  const [nowIndex, setNowIndex] = useState<number>(-1);
  const [statusInfo, setStatusInfo] = useState<IStatus[]>([]);

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
      setTrainInfo(data);
      setStatusInfo(data);
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
        <Percentage input={statusInfo} nowIndex={nowIndex} />
        <Train input={trainInfo} index={nowIndex} />
      </div>
      <List listInfo={listInfo} changeIndex={setNowIndex} />
    </div>
  );
};

export default Status;
