import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import LineChart from './lineChart';
import BarChart from './barChart';

interface IProps {
  mode: string;
}

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

const Graph: React.FC<IProps> = ({ mode }) => {
  // api data of buy
  const [apiDataBuy, setApiDataBuy] = useState<IApiData>({
    data: [],
    page: 0,
    totalCount: 0,
  });

  // api data of sell
  const [apiDataSell, setApiDataSell] = useState<IApiData>({
    data: [],
    page: 0,
    totalCount: 0,
  });

  // fetch api data of buy
  const fetchApiDataBuy = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to bidsubmit buy  API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/bidsubmit?per_page=1000&page=1&bid_type=buy`,
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
      setApiDataBuy(tmp);
    } else {
      // fetch failure
      // eslint-disable-next-line no-alert
      alert('failed');
    }
  };

  // fetch api data of sell
  const fetchApiDataSell = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to bidsubmit sell API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/bidsubmit?per_page=1000&page=1&bid_type=sell`,
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
      setApiDataSell(tmp);
    } else {
      // fetch failure
      // eslint-disable-next-line no-alert
      alert('failed');
    }
  };

  useEffect(() => {
    (async () => {
      await fetchApiDataBuy();
      await fetchApiDataSell();
    })();
  }, []);

  useEffect(() => {
    // console.log('buy', apiDataBuy);
  }, [apiDataBuy]);

  useEffect(() => {
    // console.log('sell', apiDataSell);
  }, [apiDataSell]);

  return (
    <div className={classNames('bidding-graph-container')}>
      {mode === '綠能交易' ? (
        <LineChart
          dataBuy={apiDataBuy.data.sort((a, b) => {
            if (a.volume > b.volume) return 1;
            if (a.volume < b.volume) return -1;
            return 0;
          })}
          dataSell={apiDataSell.data.sort((a, b) => {
            if (a.volume > b.volume) return 1;
            if (a.volume < b.volume) return -1;
            return 0;
          })}
        />
      ) : (
        <BarChart />
      )}
    </div>
  );
};

export default Graph;
