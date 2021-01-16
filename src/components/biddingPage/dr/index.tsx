import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import List from './list';
import AddBid from './addBid';
import PageControl from './pageControl';
import testData from './user.json';

interface IProps {
  date: string;
}

interface IData {
  date: string;
  interval: string;
  time: number;
  value: number;
  price: number;
  total: number;
  status: string;
  accepted: boolean;
}

interface IApiData {
  uuid: string;
  executor: string;
  acceptor: string | null;
  start_time: string;
  end_time: string | null;
  volume: number;
  price: number;
  result: Boolean | null;
  rate: number | null;
  blockchain_url: string | null;
}

const Dr: React.FC<IProps> = ({ date }) => {
  // i18n
  const { t } = useTranslation();

  // data
  const [data, setData] = useState<IData[]>(testData);

  // api data
  const [apiData, setApiData] = useState<IApiData[]>([]);

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
      const tmp = await response.json();
      setIsAggr(tmp.is_aggregator);
      // eslint-disable-next-line no-alert
    } else alert('failed fetching user info');
  };

  // fetch Api Data
  const fetchApiData = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );

    // GET to Power Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/DR_result?start_date=${dayjs(
        date,
      ).format('YYYY-MM-DD')}&end_date=${dayjs(date)
        .add(2, 'day')
        .format('YYYY-MM-DD')}`,
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
      setApiData([]);
      setApiData([...tmp]);
    }
  };

  // React-Hook: useEffect -> get api data
  useEffect(() => {
    (async () => {
      await fetchApiData();
    })();
  }, [date]);

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
        {isAggr ? t('biddingpage.drAward') : t('biddingpage.drBidding')}
      </div>
      <div className={classNames(`bidding-dr-list-container-out${className}`)}>
        <List apiData={apiData} data={data} setData={setData} isAggr={isAggr} />
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
