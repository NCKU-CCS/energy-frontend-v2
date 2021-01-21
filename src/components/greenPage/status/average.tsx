import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
  userType: string;
  averagePrice: number;
  averageVolume: number;
}

const Average: React.FC<IProps> = ({
  userType,
  averagePrice,
  averageVolume,
}) => {
  // i18n
  const { t } = useTranslation();

  return (
    <div className={classNames('bidding-status-average-container-in')}>
      <div className={classNames('bidding-status-average-image-container')}>
        <img
          className={classNames('bidding-status-average-image-img')}
          alt=""
          src={`${process.env.PUBLIC_URL}/biddingPage/arrow-${userType}.png`}
        />
      </div>
      <div className={classNames('bidding-status-average-text-container')}>
        <div
          className={classNames('bidding-status-average-text-price-container')}
        >
          <div
            className={classNames('bidding-status-average-text-price-value')}
          >
            ${averagePrice.toFixed(0)}/kWh
          </div>
          <div
            className={classNames('bidding-status-average-text-price-title')}
          >
            {t('greenpage.avgPrice')}
          </div>
        </div>
        <div
          className={classNames('bidding-status-average-text-volume-container')}
        >
          <div
            className={classNames('bidding-status-average-text-volume-value')}
          >
            {averageVolume.toFixed(0)}kWh
          </div>
          <div
            className={classNames('bidding-status-average-text-volume-title')}
          >
            {t('greenpage.avgVolume')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Average;
