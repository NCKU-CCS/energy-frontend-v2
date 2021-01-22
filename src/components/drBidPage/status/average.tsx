import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
  mode: string;
  averagePrice: number;
  averageVolume: number;
}

const Average: React.FC<IProps> = ({ mode, averagePrice, averageVolume }) => {
  // i18n
  const { t } = useTranslation();

  return (
    <div className={classNames('drbid-status-average-container-in')}>
      <div className={classNames('drbid-status-average-image-container')}>
        <img
          className={classNames('drbid-status-average-image-img')}
          alt=""
          src={`${process.env.PUBLIC_URL}/biddingPage/arrow${
            mode === '需量反應' ? '-b' : ''
          }.png`}
        />
      </div>
      <div className={classNames('drbid-status-average-text-container')}>
        <div
          className={classNames('drbid-status-average-text-price-container')}
        >
          <div className={classNames('drbid-status-average-text-price-value')}>
            ${averagePrice.toFixed(0)}/kWh
          </div>
          <div className={classNames('drbid-status-average-text-price-title')}>
            {t('drbidpage.avgPrice')}
          </div>
        </div>
        <div
          className={classNames('drbid-status-average-text-volume-container')}
        >
          <div className={classNames('drbid-status-average-text-volume-value')}>
            {averageVolume.toFixed(0)}kWh
          </div>
          <div className={classNames('drbid-status-average-text-volume-title')}>
            {t('drbidpage.avgVolume')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Average;
