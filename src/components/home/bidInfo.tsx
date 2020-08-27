import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import data from './bidInfoTest.json';

const BidInfo: React.FC = () => {
  const { t } = useTranslation();

  const [boxState, setbox] = useState<boolean>(false);
  const [icon, seticon] = useState<string>('▶');
  const listItem = data.map((content) => {
    const showInfo = () => {
      if (boxState === false) setbox(true);
      else setbox(false);
      if (boxState === false) seticon('▼');
      else seticon('▶');
    };

    let sellState = '';
    if (content.success === '得標成功') sellState = t('indexpage.sellSuccess');
    else sellState = t('indexpage.sellFail');

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
          {sellState}
        </div>
        <div className={classnames('home-bid-info-listContent-number')}>
          {t('indexpage.biddingNumber')}:{content.number}kWh
        </div>
        <div className={classnames('home-bid-info-listContent-price')}>
          {t('indexpage.biddingPrice')}:${content.price}/kWh
        </div>
        {boxState && (
          <div
            className={classnames('home-bid-info-listContent-number-nextline')}
          >
            {t('indexpage.biddingNumber')}:{content.number}kWh
          </div>
        )}
        {boxState && (
          <div
            className={classnames('home-bid-info-listContent-price-nextline')}
          >
            {t('indexpage.biddingPrice')}:${content.price}/kWh
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={classnames('home-bid-info')}>
      <div className={classnames('home-bid-info-title')}>
        {t('indexpage.biddingInfoTitle')}
      </div>
      <div className={classnames('home-bid-info-list')}>{listItem}</div>
    </div>
  );
};

export default BidInfo;
