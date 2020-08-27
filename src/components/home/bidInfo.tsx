import React, { useState } from 'react';
import classnames from 'classnames';
import data from './bidInfoTest.json';

const BidInfo: React.FC = () => {
  const [boxState, setbox] = useState<boolean>(false);
  const [icon, seticon] = useState<string>('▶');
  const listItem = data.map((content) => {
    const showInfo = () => {
      if (boxState === false) setbox(true);
      else setbox(false);
      if (boxState === false) seticon('▼');
      else seticon('▶');
    };

    return (
      <div className={classnames('home-bid-info-listContainer')}>
        <button
          type="button"
          className={classnames('home-bid-info-listContent-button')}
          onClick={showInfo}
        >
          {icon}
        </button>
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
        {boxState && (
          <div
            className={classnames('home-bid-info-listContent-number-nextline')}
          >
            得標度數:{content.number}kWh
          </div>
        )}
        {boxState && (
          <div
            className={classnames('home-bid-info-listContent-price-nextline')}
          >
            單價:${content.price}/kWh
          </div>
        )}
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
