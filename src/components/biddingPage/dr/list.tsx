import React from 'react';
import classNames from 'classnames';
import data from './test.json';

const List: React.FC = () => {
  // map data
  const createList = data.map((d) => {
    return (
      <div className={classNames('bidding-dr-list-listitem-container-in')}>
        <div
          className={classNames(
            'bidding-dr-list-listitem-item',
            'bidding-dr-list-listitem-date',
          )}
        >
          {d.date}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-listitem-item',
            'bidding-dr-list-listitem-interval',
          )}
        >
          {d.interval}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-listitem-item',
            'bidding-dr-list-listitem-value',
          )}
        >
          {d.value}kWh
        </div>
        <div
          className={classNames(
            'bidding-dr-list-listitem-item',
            'bidding-dr-list-listitem-price',
          )}
        >
          ${d.price}/kWh
        </div>
        <div
          className={classNames(
            'bidding-dr-list-listitem-item',
            'bidding-dr-list-listitem-total',
          )}
        >
          ${d.total}
        </div>
        <div
          className={classNames(
            'bidding-dr-list-listitem-item',
            'bidding-dr-list-listitem-button-container',
          )}
        >
          <button
            className={classNames('bidding-dr-list-listitem-button-btn')}
            type="button"
          >
            接受
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className={classNames('bidding-dr-list-container-in')}>
      <div className={classNames('bidding-dr-list-title-container')}>
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
            'bidding-dr-list-title-space',
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
