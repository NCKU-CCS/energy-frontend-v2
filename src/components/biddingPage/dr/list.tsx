import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import ListItem from './listItem';
import AddBidBtn from './addBidBtn';

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

interface IProps {
  data: IData[];
  setData(d: IData[]): void;
  isAggr: boolean;
}

const List: React.FC<IProps> = ({ data, isAggr, setData }) => {
  // i18n
  const { t } = useTranslation();

  // map data
  const createList = data.map((d) => {
    let correctDate = dayjs(new Date()).add(1, 'day').format('YYYY/MM/DD');
    if (d.status === '2')
      correctDate = dayjs(new Date()).add(2, 'day').format('YYYY/MM/DD');
    else if (d.status === '3')
      correctDate = dayjs(new Date()).add(3, 'day').format('YYYY/MM/DD');
    return (
      <ListItem
        date={d.status !== 'new' ? correctDate : d.date}
        interval={d.interval}
        time={d.time}
        value={d.value}
        price={d.price}
        total={d.total}
        status={d.status}
        accepted={d.accepted}
        isAggr={isAggr}
        data={data}
        setData={setData}
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
          {t('biddingpage.date')}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-interval',
          )}
        >
          {t('biddingpage.time')}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-value',
          )}
        >
          {t('biddingpage.drVolume')}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-price',
          )}
        >
          {t('biddingpage.price')}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-total',
          )}
        >
          {t('biddingpage.total')}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-space2',
          )}
        >
          {!isAggr && <AddBidBtn data={data} setData={setData} />}
        </div>
      </div>
      <div className={classNames('bidding-dr-list-listitem-container-out')}>
        {createList}
      </div>
    </div>
  );
};

export default List;
