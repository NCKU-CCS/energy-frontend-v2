import React from 'react';
import classnames from 'classnames';

const TimeInfo: React.FC = () => {
  return (
    <div className={classnames('home-time-info')}>
      <div className={classnames('home-time-info-title')}>目前電力交易時間</div>
      <div className={classnames('home-time-info-timeContainer')}>
        <img
          className={classnames('home-time-info-timeIcon')}
          alt=""
          src={`${process.env.PUBLIC_URL}/home/Green_b_icon.png`}
        />
        <div className={classnames('home-time-info-timeContent')}>
          13:00 - 14:00
        </div>
      </div>
      <div className={classnames('home-time-info-priceContainer')}>
        <div className={classnames('home-time-info-buy')}>買</div>
        <div className={classnames('home-time-info-content')}>-kWh</div>
        <div className={classnames('home-time-info-content')}>$-/kWh</div>
        <div className={classnames('home-time-info-sell')}>賣</div>
        <div className={classnames('home-time-info-content')}>10kWh</div>
        <div className={classnames('home-time-info-content')}>$5/kWh</div>
      </div>
    </div>
  );
};

export default TimeInfo;
