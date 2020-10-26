import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import ListItem from './listItem';
import { intervalArr } from '../../../constants/constant';

interface IFakeData {
  date: string;
  interval: string;
  value: number;
  price: number;
  total: number;
}

const List: React.FC = () => {
  // const [editable, setEditable] = useState<boolean>(true);
  const [fakeData, setFakeData] = useState<IFakeData[]>([]);

  // get random int
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const createFakeData = () => {
    // temp arr of fake data
    const tmpFakeData: IFakeData[] = [];

    // array that stores today, today + 1, today + 2
    const dateArr: string[] = [
      dayjs().add(1, 'day').format('YYYY/MM/DD'),
      dayjs().add(2, 'day').format('YYYY/MM/DD'),
    ];

    // creating
    for (const date of dateArr) {
      for (const interval of intervalArr) {
        const value = getRandomInt(10) + 1;
        const price = getRandomInt(10) + 1;
        tmpFakeData.push({
          date,
          interval,
          value,
          price,
          total: value * price,
        });
      }
    }

    // setState
    setFakeData(tmpFakeData);
  };

  useEffect(() => {
    createFakeData();
  }, []);

  // useEffect(() => {
  //   setInterval(createFakeData, 60 * 60 * 1000);
  // }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setEditable(
  //       !(new Date().getHours() >= 10 &&
  //       new Date().getMinutes() >= 30)
  //     );
  //   }, 1000);
  // }, []);

  // map data
  const createList = fakeData.map((d) => {
    return (
      <ListItem
        date={d.date}
        interval={d.interval}
        value={d.value}
        price={d.price}
        total={d.total}
        // editable={editable}
      />
    );
  });

  return (
    <div className={classNames('bidding-dr-list-container-in')}>
      <div className={classNames('bidding-dr-list-title-container')}>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-space1',
          )}
        >
          s
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-date',
          )}
        >
          日期
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-interval',
          )}
        >
          時段
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-value',
          )}
        >
          DR量
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-price',
          )}
        >
          單價
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-total',
          )}
        >
          總金額
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-space2',
          )}
        >
          s
        </div>
      </div>
      <div className={classNames('bidding-dr-list-listitem-container-out')}>
        {createList}
      </div>
    </div>
  );
};

export default List;
