import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import BarChart from './barChart';
import List from './list';
import classNames from 'classnames';

interface IProps {
  mode: string;
  date: Date;
}

interface IApiData {
  Consume: number;
  Demand: number;
  ESS: number;
  EV: number;
  PV: number;
  WT: number;
}

const Summary: React.FC<IProps> = ({ mode, date }) => {
  // check whether the date is after today
  const correctDate = date.getTime() > new Date().getTime() ? new Date() : date;

  // api data array
  const [apiData, setApiData] = useState<IApiData>({
    Consume: 0,
    Demand: 0,
    ESS: 0,
    EV: 0,
    PV: 0,
    WT: 0,
  });

  // fetch api data
  const fetchApiData = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );

    // GET to Power Info API
    const response = await fetch(
      `${
        process.env.REACT_APP_BACKEND_ENDPOINT
      }/power_info?summary_date=${dayjs(correctDate).format('YYYY/MM/DD')}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
      },
    );

    // get response successfully or not
    if (response.status === 200) {
      const tmp = await response.json();
      setApiData(tmp);
    } else {
      // eslint-disable-next-line no-alert
      alert('failed to fetch api data!');
    }
  };

  useEffect(() => {
    (async () => {
      await fetchApiData();
    })();
  }, [correctDate]);

  return (
    <div className={classNames('powerinfo-summary-container')}>
      {mode === '淨負載' ? (
        <List
          date={dayjs(correctDate).format('YYYY/MM/DD')}
          apiData={apiData}
        />
      ) : (
        <BarChart date={dayjs(correctDate).format('YYYY/MM/DD')} />
      )}
    </div>
  );
};

export default Summary;
