import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import ListItem from './listItem';

interface IResult {
  status: string;
  time: string;
  date: string;
  wins: {
    price: number;
    value: number;
  };
}

const BidInfo: React.FC = () => {
  const { t } = useTranslation();

  const [result, setResult] = useState<IResult[]>([]);
  const [list, setList] = useState<IResult[]>([]);
  const [currTime, setCurrTime] = useState<string>('');

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

  useEffect(() => {
    setCurrTime(dayjs().format('HH'));
    (async () => {
      await fetchMatchResult();
    })();
  }, []);

  useEffect(() => {
    const allList = result;
    for (let i = 0; i < allList.length; i += 1) {
      if (
        !(allList[i].status === '得標成功' || allList[i].status === '未得標')
      ) {
        allList.splice(i, 1);
        i -= 1;
      }
    }
    setList(allList);
  }, [result]);

  useEffect(() => {
    (async () => {
      await fetchMatchResult();
    })();
  }, [currTime]);

  useEffect(() => {
    setInterval(() => setCurrTime(dayjs().format('HH')), 300000);
  }, []);

  return (
    <div className={classnames('home-bid-info')}>
      <div className={classnames('home-bid-info-title')}>
        {t('indexpage.biddingInfoTitle')}
      </div>
      <ListItem input={list} />
    </div>
  );
};

export default BidInfo;
