import React from 'react';
import classNames from 'classnames';
import ListItem from './listItem';
import testData from './user.json';

interface IProps {
  isAggr: boolean;
  addBid: boolean;
}

const List: React.FC<IProps> = ({ isAggr, addBid }) => {
  // map data
  const createList = testData.map((d) => {
    if (isAggr && (d.status === 'bid' || d.status === 'clicked'))
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
    if (!isAggr && d.status !== 'new')
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
    if (!isAggr && d.status === 'new' && addBid)
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
