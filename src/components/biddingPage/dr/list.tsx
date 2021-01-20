/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import ListItem from './listItem';
import AddBidBtn from './addBidBtn';

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
  isAggr: boolean;
}

const List: React.FC<IProps> = ({ apiData, isAggr }) => {
  // i18n
  const { t } = useTranslation();

  const createList = apiData.map((d) => {
    return (
      <ListItem
        start_time={d.start_time}
        end_time={d.end_time}
        uuid={d.uuid}
        date={d.start_time.substring(0, 10)}
        interval={
          d.end_time
            ? `${d.start_time.substring(11, 16)} - ${d.end_time.substring(
                11,
                16,
              )}`
            : t('biddingpage.notAccepted')
        }
        value={d.volume}
        price={d.price}
        total={d.volume * d.price}
        status="api"
        accepted={d.result}
        isAggr={isAggr}
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
          {!isAggr && <AddBidBtn />}
        </div>
      </div>
      <div className={classNames('bidding-dr-list-listitem-container-out')}>
        {createList}
      </div>
    </div>
  );
};

export default List;
