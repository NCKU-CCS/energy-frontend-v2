import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

const TimeInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={classnames('home-time-info')}>
      <div className={classnames('home-time-info-title')}>
        {t('indexpage.tradingTime')}
      </div>
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
        <div className={classnames('home-time-info-buy')}>
          {t('indexpage.buy')}
        </div>
        <div className={classnames('home-time-info-content')}>-kWh</div>
        <div className={classnames('home-time-info-content')}>$-/kWh</div>
        <div className={classnames('home-time-info-sell')}>
          {t('indexpage.sell')}
        </div>
        <div className={classnames('home-time-info-content')}>10kWh</div>
        <div className={classnames('home-time-info-content')}>$5/kWh</div>
      </div>
    </div>
  );
};

export default TimeInfo;
