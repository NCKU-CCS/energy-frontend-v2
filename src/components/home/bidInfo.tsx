import React from 'react';
import classnames from 'classnames';
import data from './bidInfoTest.json';

const BidInfo: React.FC = () => {
  const listItem = data.map((content) => {
    return (
      <div className={classnames('home-bid-info-listContainer')}>
        <div className={classnames('home-bid-info-listContent-date')}>
          {content.date}
        </div>
        <div className={classnames('home-bid-info-listContent-time')}>
          {content.time}
        </div>
        <div className={classnames('home-bid-info-listContent-success')}>
          {content.success}
        </div>
        <div className={classnames('home-bid-info-listContent-number')}>
          得標度數:{content.number}kWh
        </div>
        <div className={classnames('home-bid-info-listContent-price')}>
          單價:${content.price}/kWh
        </div>
      </div>
    );
  });

  return (
    <div className={classnames('home-bid-info')}>
      <div className={classnames('home-bid-info-title')}>得標資訊</div>
      <div className={classnames('home-bid-info-list')}>{listItem}</div>
    </div>
  );
};

export default BidInfo;
