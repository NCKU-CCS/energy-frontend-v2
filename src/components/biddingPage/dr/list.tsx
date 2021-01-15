import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
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

interface IProps {
  apiData: IApiData[];
  data: IData[];
  setData(d: IData[]): void;
  isAggr: boolean;
}

const List: React.FC<IProps> = ({ apiData, data, isAggr, setData }) => {
  // i18n
  const { t } = useTranslation();

  useEffect(() => {
    console.log('api data content');
    console.log(apiData);
  }, [apiData]);

  const createList = apiData.map((d, i) => {
    console.log(i, d.start_time);
    return (
      <ListItem
        date={d.start_time.substring(0, 10)}
        interval={
          d.end_time
            ? `${d.start_time.substring(11, 16)} - ${d.end_time.substring(
                11,
                16,
              )}`
            : '未決標'
        }
        time={Number(d.start_time.substring(11, 13))}
        value={d.volume}
        price={d.price}
        total={d.volume * d.price}
        status="api"
        accepted
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
            'bidding-dr-list-title-date',
            `bidding-dr-list-title-date--${isAggr ? 'aggr' : 'user'}`,
          )}
        >
          {t('biddingpage.date')}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-interval',
            `bidding-dr-list-title-interval--${isAggr ? 'aggr' : 'user'}`,
          )}
        >
          {t('biddingpage.time')}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-value',
            `bidding-dr-list-title-value--${isAggr ? 'aggr' : 'user'}`,
          )}
        >
          {t('biddingpage.drVolume')}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-price',
            `bidding-dr-list-title-price--${isAggr ? 'aggr' : 'user'}`,
          )}
        >
          {t('biddingpage.price')}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-total',
            `bidding-dr-list-title-total--${isAggr ? 'aggr' : 'user'}`,
          )}
        >
          {t('biddingpage.total')}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-title-item',
            'bidding-dr-list-title-space2',
            `bidding-dr-list-title-space2--${isAggr ? 'aggr' : 'user'}`,
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
