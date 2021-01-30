/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IData {
  mode: number;
  aggregator?: string;
  executor?: string;
  interval: string;
  total_volume: number;
  price: number;
  total_price: number;
  is_accepted: boolean;
}

interface IProps {
  userType: string;
  data: IData;
}

const InfoBox: React.FC<IProps> = ({ userType, data }) => {
  // i18n
  const { t } = useTranslation();

  // click open or not
  const [openInfoBox, setOpenInfoBox] = useState<boolean>(false);

  return (
    <div className={classNames('draccept-submit-infobox-container-in')}>
      {!openInfoBox ? (
        <button
          type="button"
          className={classNames('draccept-submit-infobox-open-btn')}
          onClick={() => setOpenInfoBox(true)}
        >
          <img
            className={classNames('draccept-submit-infobox-open-btn-img')}
            alt="magnifier"
            src={`${process.env.PUBLIC_URL}/drBidPage/magnifier-gray.png`}
          />
        </button>
      ) : (
        <div className={classNames('draccept-submit-infobox-canvas')}>
          <div className={classNames('draccept-submit-infobox-content')}>
            <div
              className={classNames(
                `draccept-submit-infobox-content-header--${userType}`,
              )}
            >
              <button
                type="button"
                className={classNames(
                  'draccept-submit-infobox-content-header-close',
                )}
                onClick={() => setOpenInfoBox(false)}
              >
                X
              </button>
            </div>
            <div
              className={classNames('draccept-submit-infobox-content-center')}
            >
              <div
                className={classNames(
                  'draccept-submit-infobox-content-center-inside',
                )}
              >
                <div
                  className={classNames(
                    'draccept-submit-infobox-content-center-inside--show',
                  )}
                >
                  <div
                    className={classNames(
                      'draccept-submit-infobox-content-center-inside-interval--show',
                      'draccept-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('dracceptpage.mode')} :&nbsp;</span>
                    <span>{data.mode}</span>
                  </div>
                  <div
                    className={classNames(
                      'draccept-submit-infobox-content-center-inside-user--show',
                      'draccept-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>
                      {userType === 'taipower'
                        ? t('dracceptpage.aggregator')
                        : t('dracceptpage.executor')}{' '}
                      :&nbsp;
                    </span>
                    <span>
                      {userType === 'taipower'
                        ? data.aggregator
                        : data.executor}
                    </span>
                  </div>
                  <div
                    className={classNames(
                      'draccept-submit-infobox-content-center-inside-interval--show',
                      'draccept-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('dracceptpage.interval')} :&nbsp;</span>
                    <span>{data.interval}</span>
                  </div>
                  <div
                    className={classNames(
                      'draccept-submit-infobox-content-center-inside-volume--show',
                      'draccept-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('dracceptpage.volume')} :&nbsp;</span>
                    <span>{data.total_volume.toFixed(1)}kWh</span>
                  </div>
                  <div
                    className={classNames(
                      'draccept-submit-infobox-content-center-inside-price--show',
                      'draccept-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('dracceptpage.price')} :&nbsp;</span>
                    <span>${data.price.toFixed(1)}/kWh</span>
                  </div>
                  <div
                    className={classNames(
                      'draccept-submit-infobox-content-center-inside-total--show',
                      'draccept-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('dracceptpage.total')} :&nbsp;</span>
                    <span>${data.total_price.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={classNames(
                `draccept-submit-infobox-content-footer--${userType}`,
              )}
            >
              <button
                className={classNames(
                  'draccept-submit-infobox-content-footer-btn',
                )}
                type="button"
                disabled={data.is_accepted}
                onClick={() => alert('success')}
              >
                {data.is_accepted
                  ? userType === 'taipower'
                    ? t('dracceptpage.announced')
                    : t('dracceptpage.bidAccepted')
                  : userType === 'taipower'
                  ? t('dracceptpage.accept')
                  : t('dracceptpage.acceptBid')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
