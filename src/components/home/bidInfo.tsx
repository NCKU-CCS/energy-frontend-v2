import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import ListContent from './listContent';

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
    (async () => {
      await fetchMatchResult();
    })();
  }, []);

  let List = result;
  for (let i = 0; i < result.length; i += 1) {
    if (!(result[i].status === '得標成功' || result[i].status === '未得標')) {
      List = result.splice(i, 1);
      i -= 1;
    }
  }

  const listItem = List.map((content) => {
    return (
      <ListContent
        status={content.status}
        time={content.time}
        date={content.date}
        price={content.wins.price}
        value={content.wins.value}
      />
    );
  });

  return (
    <div className={classnames('home-bid-info')}>
      <div className={classnames('home-bid-info-title')}>
        {t('indexpage.biddingInfoTitle')}
      </div>
      <div className={classnames('home-bid-info-list')}>{listItem}</div>
    </div>
  );
};

export default BidInfo;
