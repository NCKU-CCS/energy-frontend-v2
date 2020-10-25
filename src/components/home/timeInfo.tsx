import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface IResult {
  status: string;
  time: string;
  date: string;
  wins: {
    price: number;
    value: number;
  };
  bid_type: string;
}

const TimeInfo: React.FC = () => {
  const { t } = useTranslation();

  const [result, setResult] = useState<IResult[]>([]);
  const [currTime, setCurrTime] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [buyValue, setBuyValue] = useState<string>('');
  const [buyPrice, setBuyPrice] = useState<string>('');
  const [sellValue, setSellValue] = useState<string>('');
  const [sellPrice, setSellPrice] = useState<string>('');

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
      setResult(data);
    }
  };

  const update = () => {
    (async () => {
      await fetchMatchResult();
    })();
    setTime(`${currTime}:00 - ${String(Number(currTime) + 1)}:00`);
  };

  useEffect(() => {
    for (let i = 0; i < result.length; i += 1) {
      if (result[i].status === '執行中') {
        if (result[i].bid_type === 'buy') {
          setBuyPrice(String(result[i].wins.price));
          setBuyValue(String(result[i].wins.value));
        } else if (result[i].bid_type === 'sell') {
          setSellPrice(String(result[i].wins.price));
          setSellValue(String(result[i].wins.value));
        }
      }
    }
  }, [result]);

  useEffect(() => {
    setCurrTime(dayjs().format('HH'));
    setInterval(() => setCurrTime(dayjs().format('HH')), 60000);
    update();
  }, []);

  useEffect(() => {
    update();
  }, [currTime]);

  return (
    <div className={classnames('home-time-info')}>
      <div className={classnames('home-time-info-title')}>
        {t('indexpage.tradingTime')}
      </div>
      <div className={classnames('home-time-info-timeContainer')}>
        <img
          className={classnames('home-time-info-timeIcon')}
          alt=""
          src={`${process.env.PUBLIC_URL}/home/Green_b_icon.png`}
        />
        <div className={classnames('home-time-info-timeContent')}>{time}</div>
      </div>
      <div className={classnames('home-time-info-priceContainer')}>
        <div className={classnames('home-time-info-buy')}>
          {t('indexpage.buy')}
        </div>
        <div className={classnames('home-time-info-content')}>
          {buyValue}kWh
        </div>
        <div className={classnames('home-time-info-content')}>
          ${buyPrice}/kWh
        </div>
        <div className={classnames('home-time-info-sell')}>
          {t('indexpage.sell')}
        </div>
        <div className={classnames('home-time-info-content')}>
          {sellValue}kWh
        </div>
        <div className={classnames('home-time-info-content')}>
          ${sellPrice}/kWh
        </div>
      </div>
    </div>
  );
};

export default TimeInfo;
