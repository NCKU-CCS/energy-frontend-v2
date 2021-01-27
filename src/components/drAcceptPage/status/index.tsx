import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface IProps {
  userType: string;
  totalPrice: number;
  totalVolume: number;
}

const BiddingStatus: React.FC<IProps> = ({
  userType,
  totalPrice,
  totalVolume,
}) => {
  // i18n
  const { t } = useTranslation();

  return (
    <div className={classNames('draccept-status-container')}>
      <div className={classNames('draccept-status-total-container-out')}>
        <div className={classNames('draccept-status-total-container-in')}>
          <div className={classNames('draccept-status-total-image-container')}>
            <img
              className={classNames('draccept-status-total-image-img')}
              alt=""
              src={`${process.env.PUBLIC_URL}/drBidPage/arrow-${userType}.png`}
            />
          </div>
          <div className={classNames('draccept-status-total-text-container')}>
            <div
              className={classNames(
                'draccept-status-total-text-price-container',
              )}
            >
              <div
                className={classNames('draccept-status-total-text-price-value')}
              >
                ${totalPrice.toFixed(0)}
              </div>
              <div
                className={classNames('draccept-status-total-text-price-title')}
              >
                {t('drbidpage.totalPrice')}
              </div>
            </div>
            <div
              className={classNames(
                'draccept-status-total-text-volume-container',
              )}
            >
              <div
                className={classNames(
                  'draccept-status-total-text-volume-value',
                )}
              >
                {totalVolume.toFixed(0)}kWh
              </div>
              <div
                className={classNames(
                  'draccept-status-total-text-volume-title',
                )}
              >
                {t('drbidpage.totalVolume')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingStatus;
