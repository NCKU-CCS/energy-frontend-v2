import React from 'react';
import classNames from 'classnames';
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
}

interface IProps {
  data: IData[];
  isAggr: boolean;
}

const List: React.FC<IProps> = ({ data, isAggr }) => {
  // map data
  const createList = data.map((d) => {
    if (new Date(d.date).getTime() > new Date().getTime() && d.status !== 'new')
      return (
        <ListItem
          date={d.date}
          interval={d.interval}
          time={d.time}
          value={d.value}
          price={d.price}
          total={d.total}
          status={d.status}
          isAggr={isAggr}
        />
      );
    // if (
    //   addBid &&
    //   new Date(d.date).getTime() > new Date().getTime() &&
    //   d.status === 'new'
    // )
    //   return (
    //     <ListItem
    //       date={d.date}
    //       interval={d.interval}
    //       time={d.time}
    //       value={d.value}
    //       price={d.price}
    //       total={d.total}
    //       status={d.status}
    //       isAggr={isAggr}
    //     />
    //   );
    return null;
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
