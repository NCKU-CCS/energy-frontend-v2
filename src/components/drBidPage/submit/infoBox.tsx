/* eslint-disable no-alert */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IData {
  date: string;
  mode: number;
  total_volume: number;
  price: number;
  total_price: number;
  is_submitted: boolean;
}

interface IProps {
  date: string;
  data: IData;
}

const InfoBox: React.FC<IProps> = ({ date, data }) => {
  // i18n
  const { t } = useTranslation();

  // get user from local storage or session storage
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  // user type: user, aggregator
  const [userType] = useState<string>(user.role);

  // click open or not
  const [openInfoBox, setOpenInfoBox] = useState<boolean>(false);

  return (
    <div className={classNames('drbid-submit-infobox-container-in')}>
      {!openInfoBox ? (
        <button
          type="button"
          className={classNames('drbid-submit-infobox-open-btn')}
          onClick={() => setOpenInfoBox(true)}
        >
          <img
            className={classNames('drbid-submit-infobox-open-btn-img')}
            alt="magnifier"
            src={`${process.env.PUBLIC_URL}/drBidPage/magnifier-gray.png`}
          />
        </button>
      ) : (
        <div className={classNames('drbid-submit-infobox-canvas')}>
          <div className={classNames('drbid-submit-infobox-content')}>
            <div
              className={classNames(
                `drbid-submit-infobox-content-header--${userType}`,
              )}
            >
              <button
                type="button"
                className={classNames(
                  'drbid-submit-infobox-content-header-close',
                )}
                onClick={() => setOpenInfoBox(false)}
              >
                X
              </button>
            </div>
            <div className={classNames('drbid-submit-infobox-content-center')}>
              <div
                className={classNames(
                  'drbid-submit-infobox-content-center-inside',
                )}
              >
                <div
                  className={classNames(
                    'drbid-submit-infobox-content-center-inside--show',
                  )}
                >
                  <div
                    className={classNames(
                      'drbid-submit-infobox-content-center-inside-date--show',
                      'drbid-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('drbidpage.date')} :&nbsp;</span>
                    <span>{date}</span>
                  </div>
                  <div
                    className={classNames(
                      'drbid-submit-infobox-content-center-inside-interval--show',
                      'drbid-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('drbidpage.mode')} :&nbsp;</span>
                    <span>{data.mode}</span>
                  </div>
                  <div
                    className={classNames(
                      'drbid-submit-infobox-content-center-inside-volume--show',
                      'drbid-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('drbidpage.volume')} :&nbsp;</span>
                    <span>{data.total_volume.toFixed(1)}kWh</span>
                  </div>
                  <div
                    className={classNames(
                      'drbid-submit-infobox-content-center-inside-price--show',
                      'drbid-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('drbidpage.price')} :&nbsp;</span>
                    <span>${data.price.toFixed(1)}/kWh</span>
                  </div>
                  <div
                    className={classNames(
                      'drbid-submit-infobox-content-center-inside-total--show',
                      'drbid-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('drbidpage.total')} :&nbsp;</span>
                    <span>${data.total_price.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={classNames(
                `drbid-submit-infobox-content-footer--${userType}`,
              )}
            >
              <button
                className={classNames(
                  'drbid-submit-infobox-content-footer-btn',
                )}
                type="button"
                disabled={data.is_submitted}
              >
                {data.is_submitted
                  ? t('drbidpage.accepted')
                  : t('drbidpage.accept')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
