/* eslint-disable no-alert */
import React, { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface IData {
  uuid: string;
  startTime: string;
  endTime: string;
  mode: number;
  volume: number;
  price: number;
  status: string;
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

  // get interval
  const getInterval = () => {
    const startHr = dayjs(data.startTime).get('hour');
    const endHr = dayjs(data.endTime).get('hour');
    return `${startHr}:00 - ${endHr ? `${endHr}:00` : 'null'}`;
  };

  // click open or not
  const [openInfoBox, setOpenInfoBox] = useState<boolean>(false);

  // patch api
  const patch = async () => {
    // PATCH DR_bid
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/DR_bid`,
      {
        method: 'PATCH',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          uuid: data.uuid,
        }),
      },
    );

    // response
    if (response.status === 200) {
      alert('success');
      window.location.reload();
    } else {
      // alert('failed');
    }
  };

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
                      'drbid-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('drbidpage.date')} :&nbsp;</span>
                    <span>{date}</span>
                  </div>
                  <div
                    className={classNames(
                      'drbid-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('drbidpage.interval')} :&nbsp;</span>
                    <span>{getInterval()}</span>
                  </div>
                  <div
                    className={classNames(
                      'drbid-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('drbidpage.mode')} :&nbsp;</span>
                    <span>{data.mode}</span>
                  </div>
                  <div
                    className={classNames(
                      'drbid-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('drbidpage.volume')} :&nbsp;</span>
                    <span>{data.volume.toFixed(1)}kWh</span>
                  </div>
                  <div
                    className={classNames(
                      'drbid-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('drbidpage.price')} :&nbsp;</span>
                    <span>${data.price.toFixed(1)}/kWh</span>
                  </div>
                  <div
                    className={classNames(
                      'drbid-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('drbidpage.total')} :&nbsp;</span>
                    <span>${(data.price * data.volume).toFixed(1)}</span>
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
                disabled={data.status !== '投標中'}
                onClick={() => patch()}
              >
                {data.status !== '投標中'
                  ? t('drbidpage.reported')
                  : t('drbidpage.report')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
