/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import InfoBox from './infoBox';
import { hrArr } from '../../../constants/constant';

interface IProps {
  start_time: string;
  end_time: string | null;
  uuid: string;
  accepted: Boolean | null;
  date: string;
  interval: string;
  value: number;
  price: number;
  total: number;
  status: string;
  isAggr: boolean;
}

const ListItem: React.FC<IProps> = ({
  start_time,
  end_time,
  uuid,
  accepted,
  date,
  interval,
  value,
  price,
  total,
  isAggr,
}) => {
  // i18n
  const { t } = useTranslation();

  // accept bid btn disabled or not
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

  // insert spaces to date string for RWD
  const insertSpaces = (str: string) => {
    return `${str.substring(0, 4)} /${str.substring(5, 7)}/${str.substring(
      8,
      10,
    )}`;
  };

  // determine end hour when start hour changes
  useEffect(() => setEndHr(startHr + 1), [startHr]);

  return (
    <div className={classNames('bidding-dr-list-listitem-container-in--show')}>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-date--show',
          `bidding-dr-list-listitem-date--${isAggr ? 'aggr' : 'user'}`,
        )}
      >
        {insertSpaces(date)}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-interval--show',
          `bidding-dr-list-listitem-interval--${isAggr ? 'aggr' : 'user'}`,
        )}
      >
        {isAggr && acceptClicked ? (
          <div>
            <select onChange={(e) => setStartHr(parseInt(e.target.value, 10))}>
              {startHrOptions}
            </select>
            <span>{' - '}</span>
            <select onChange={(e) => setEndHr(parseInt(e.target.value, 10))}>
              {endHrOptions}
            </select>
          </div>
        ) : (
          interval
        )}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-value--show',
          `bidding-dr-list-listitem-value--${isAggr ? 'aggr' : 'user'}`,
        )}
      >
        {value}&thinsp;kWh
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-price--show',
          `bidding-dr-list-listitem-price--${isAggr ? 'aggr' : 'user'}`,
        )}
      >
        $&thinsp;{price}&thinsp;/&thinsp;kWh
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-total--show',
          `bidding-dr-list-listitem-total--${isAggr ? 'aggr' : 'user'}`,
        )}
      >
        $&thinsp;{total.toFixed(1)}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          `bidding-dr-list-listitem-button-container--${
            isAggr ? 'aggr' : 'user'
          }`,
        )}
      >
        {isAggr && (
          <button
            className={classNames('bidding-dr-list-listitem-delete-btn--show')}
            type="button"
            onClick={() => handleClickBtn()}
            disabled={btnDisabled}
          >
            {interval ? btnText : interval}
          </button>
        )}
        <InfoBox
          start_time={start_time}
          end_time={end_time}
          uuid={uuid}
          accepted={accepted}
          isAggr={isAggr}
          date={date}
          interval={interval}
          value={value}
          price={price}
          total={total}
        />
      </div>
    </div>
  );
};

export default ListItem;
