import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ModeButton from './modeButton';
import List from './list';
import PageControl from './pageControl';

interface IData {
  bid_type: string;
  date: string;
  end_time: string;
  id: string;
  price: number;
  start_time: string;
  time: number;
  total_price: number;
  upload_time: string;
  volume: number;
}

interface IApiData {
  data: IData[];
  page: number;
  totalCount: number;
}

const Submit: React.FC = () => {
  // mode -> buy or sell
  const [mode, setMode] = useState('buy');

  // api data
  const [apiData, setApiData] = useState<IApiData>({
    data: [],
    page: 0,
    totalCount: 0,
  });

  // fetch api data
  const fetchApiData = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to User Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/bidsubmit?per_page=5&page=1&bid_type=buy`,
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
      const tmp = await response.json();
      setApiData(tmp);
      // eslint-disable-next-line no-alert
      // alert('success');
    } else {
      // fetch failure
      // eslint-disable-next-line no-alert
      alert('failed');
    }
  };

  useEffect(() => {
    (async () => {
      await fetchApiData();
    })();
  }, []);

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);

  return (
    <div className={classNames('bidding-submit-container-in')}>
      <div className={classNames('bidding-submit-modebutton-container-out')}>
        <ModeButton changeMode={setMode} />
      </div>
      <div className={classNames('bidding-submit-list-container-out')}>
        <List mode={mode} apiData={apiData} />
      </div>
      <div className={classNames('bidding-submit-pagecontrol-container-out')}>
        <PageControl />
      </div>
    </div>
  );
};

export default Submit;
