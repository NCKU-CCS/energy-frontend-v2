/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { hrArr } from '../../../constants/constant';

interface IData {
  uuid: string;
  executor: string;
  acceptor: string;
  startTime: string;
  endTime: string;
  mode: number;
  volume: number;
  price: number;
  status: string;
  result: boolean;
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

  // input interval mode
  const [inputMode, setInputMode] = useState<boolean>(false);

  // start hour
  const [startHr, setStartHr] = useState<number>(0);

  // end hour
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [endHr, setEndHr] = useState<number>(0);

  // get interval
  const getInterval = () => {
    const startHour = dayjs(data.startTime).get('hour');
    const endHour = dayjs(data.endTime).get('hour');
    return `${startHour}:00 - ${endHour ? `${endHour}:00` : 'null'}`;
  };

  // create <select> start hour options
  const startHrOptions = hrArr.slice(0, 23).map((hr) => {
    return <option value={hr}>{hr}</option>;
  });

  // create <select> end hour options
  const endHrOptions = hrArr.slice(startHr + 1).map((hr) => {
    return <option value={hr}>{hr}</option>;
  });

  // handle click button
  const handleClickBtn = () => {
    if (inputMode) {
      setInputMode(false);
      alert('success');
      window.location.reload();
    } else setInputMode(true);
  };

  // determine end hour when start hour changes
  useEffect(() => setEndHr(startHr + 1), [startHr]);

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
                      {userType === 'tpc'
                        ? t('dracceptpage.aggregator')
                        : t('dracceptpage.executor')}{' '}
                      :&nbsp;
                    </span>
                    <span>
                      {userType === 'tpc' ? data.acceptor : data.executor}
                    </span>
                  </div>
                  <div
                    className={classNames(
                      'draccept-submit-infobox-content-center-inside-interval--show',
                      'draccept-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('dracceptpage.interval')} :&nbsp;</span>
                    <span>
                      {!inputMode ? (
                        data.result ? (
                          getInterval()
                        ) : (
                          t('dracceptpage.bidNotAccepted')
                        )
                      ) : (
                        <div>
                          <select
                            onChange={(e) =>
                              setStartHr(parseInt(e.target.value, 10))
                            }
                          >
                            {startHrOptions}
                          </select>
                          {' - '}
                          <select
                            onChange={(e) =>
                              setEndHr(parseInt(e.target.value, 10))
                            }
                          >
                            {endHrOptions}
                          </select>
                        </div>
                      )}
                    </span>
                  </div>
                  <div
                    className={classNames(
                      'draccept-submit-infobox-content-center-inside-volume--show',
                      'draccept-submit-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('dracceptpage.volume')} :&nbsp;</span>
                    <span>{data.volume.toFixed(1)}kWh</span>
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
                    <span>${data.price.toFixed(1)}</span>
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
                disabled={data.result}
                onClick={() => handleClickBtn()}
              >
                {data.result
                  ? userType === 'tpc'
                    ? t('dracceptpage.announced')
                    : t('dracceptpage.bidAccepted')
                  : userType === 'tpc'
                  ? inputMode
                    ? t('dracceptpage.confirm')
                    : t('dracceptpage.accept')
                  : inputMode
                  ? t('dracceptpage.confirm')
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
