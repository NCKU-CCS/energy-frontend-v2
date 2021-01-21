/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { hrArr } from '../../../constants/constant';

interface IProps {
  start_time: string;
  end_time: string | null;
  uuid: string;
  accepted: Boolean | null;
  isAggr: boolean;
  date: string;
  interval: string;
  value: number;
  price: number;
  total: number;
}

const InfoBox: React.FC<IProps> = ({
  uuid,
  accepted,
  isAggr,
  date,
  interval,
  value,
  price,
  total,
}) => {
  // i18n
  const { t } = useTranslation();

  // open infobox or not
  const [openInfoBox, setOpenInfoBox] = useState<boolean>(false);

  // bid btn disabled or not
  const [btnDisabled, setBtnDisabled] = useState<boolean>(!!accepted);

  // bid btn's text
  const [btnText, setBtnText] = useState<string>(
    accepted ? t('biddingpage.accepted') : t('biddingpage.accept'),
  );

  // aggregator clicked accept button
  const [acceptClicked, setAcceptClicked] = useState<boolean>(false);

  // start hour
  const [startHr, setStartHr] = useState<number>(0);

  // end hour
  const [endHr, setEndHr] = useState<number>(0);

  // create <select> start hour options
  const startHrOptions = hrArr.slice(0, 23).map((hr) => {
    return <option value={hr}>{hr}</option>;
  });

  // create <select> end hour options
  const endHrOptions = hrArr.slice(startHr + 1).map((hr) => {
    return <option value={hr}>{hr}</option>;
  });

  // post dr bid for aggregator
  const acceptBid = async () => {
    // start time
    const startTime = dayjs(date)
      .hour(startHr)
      .minute(0)
      .second(0)
      .format('YYYY-MM-DD HH:mm:ss');

    // end time
    const endTime = dayjs(date)
      .hour(endHr)
      .minute(0)
      .second(0)
      .format('YYYY-MM-DD HH:mm:ss');

    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );

    // POST to DR bid
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/DR_bid`,
        {
          method: 'POST',
          headers: new Headers({
            Authorization: `Bearer ${user.bearer}`,
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            start_time: startTime,
            end_time: endTime,
            uuid: new Array(uuid),
          }),
        },
      );

      // success or not
      if (response.status === 200) {
        alert('success');
        setBtnText(t('biddingpage.accepted'));
        setBtnDisabled(true);
        window.location.reload();
      } else alert('failed');
    } catch (error) {
      alert('err');
    }
  };

  // handle click accept button
  const handleClickBtn = () => {
    if (acceptClicked) {
      acceptBid();
    } else {
      setAcceptClicked(true);
      setBtnText('確認');
    }
  };

  // determine end hour when start hour changes
  useEffect(() => setEndHr(startHr + 1), [startHr]);

  return (
    <div className={classNames('bidding-dr-infobox-container-in')}>
      <button
        type="button"
        className={classNames('bidding-dr-infobox-open-btn')}
        onClick={() => setOpenInfoBox(true)}
      >
        <img
          alt="magnifier"
          className={classNames('bidding-dr-infobox-open-btn-img')}
          src={`${process.env.PUBLIC_URL}/biddingPage/magnifier-gray.png`}
        />
      </button>
      {openInfoBox && (
        <div className={classNames('bidding-dr-infobox-canvas')}>
          <div className={classNames('bidding-dr-infobox-content')}>
            <div className={classNames('bidding-dr-infobox-content-header')}>
              <button
                type="button"
                className={classNames(
                  'bidding-dr-infobox-content-header-close',
                )}
                onClick={() => setOpenInfoBox(false)}
              >
                X
              </button>
            </div>
            <div className={classNames('bidding-dr-infobox-content-center')}>
              <div
                className={classNames(
                  'bidding-dr-infobox-content-center-inside',
                )}
              >
                <div
                  className={classNames(
                    'bidding-dr-infobox-content-center-inside--show',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-dr-infobox-content-center-inside-date--show',
                      'bidding-dr-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('biddingpage.date')} :&nbsp;</span>
                    <span>{date}</span>
                  </div>
                  <div
                    className={classNames(
                      'bidding-dr-infobox-content-center-inside-interval--show',
                      'bidding-dr-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('biddingpage.time')} :&nbsp;</span>
                    <span>
                      {isAggr && acceptClicked ? (
                        <div>
                          <select
                            onChange={(e) =>
                              setStartHr(parseInt(e.target.value, 10))
                            }
                          >
                            {startHrOptions}
                          </select>
                          <span>{' - '}</span>
                          <select
                            onChange={(e) =>
                              setEndHr(parseInt(e.target.value, 10))
                            }
                          >
                            {endHrOptions}
                          </select>
                        </div>
                      ) : (
                        interval
                      )}
                    </span>
                  </div>
                  <div
                    className={classNames(
                      'bidding-dr-infobox-content-center-inside-volume--show',
                      'bidding-dr-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('biddingpage.drVolume')} :&nbsp;</span>
                    <span>{value}kWh</span>
                  </div>
                  <div
                    className={classNames(
                      'bidding-dr-infobox-content-center-inside-price--show',
                      'bidding-dr-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('biddingpage.price')} :&nbsp;</span>
                    <span>${price}/kWh</span>
                  </div>
                  <div
                    className={classNames(
                      'bidding-dr-infobox-content-center-inside-total--show',
                      'bidding-dr-infobox-content-center-inside-item--show',
                    )}
                  >
                    <span>{t('biddingpage.total')} :&nbsp;</span>
                    <span>${total.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={classNames('bidding-dr-infobox-content-footer')}>
              {isAggr && (
                <button
                  type="button"
                  className={classNames(
                    'bidding-dr-infobox-content-footer-accept',
                  )}
                  onClick={() => handleClickBtn()}
                  disabled={btnDisabled}
                >
                  <img
                    alt="accept"
                    className={classNames(
                      'bidding-dr-infobox-content-footer-accept-img',
                    )}
                    src={`${process.env.PUBLIC_URL}/biddingPage/check-white.png`}
                  />
                  {btnText}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
