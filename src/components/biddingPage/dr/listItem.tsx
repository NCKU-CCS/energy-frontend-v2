/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import InfoBox from './infoBox';

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
  const [acceptBtnDisabled, setAcceptBtnDisabled] = useState<boolean>(
    !!accepted,
  );

  // bid btn's text
  const [acceptBtnText, setAcceptBtnText] = useState<string>(
    accepted ? t('biddingpage.accepted') : t('biddingpage.accept'),
  );

  // post dr bid for aggregator
  const acceptBid = async () => {
    // start time
    const startTime = end_time
      ? start_time
      : dayjs().add(1, 'day').minute(0).second(0).format('YYYY-MM-DD HH:mm:ss');

    // end time
    const endTime =
      end_time ||
      dayjs()
        .add(1, 'day')
        .add(1, 'hour')
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
        setAcceptBtnText(t('biddingpage.accepted'));
        setAcceptBtnDisabled(true);
        window.location.reload();
      } else alert('failed');
    } catch (error) {
      alert('err');
    }
  };

  // insert spaces to date string for RWD
  const insertSpaces = (str: string) => {
    return `${str.substring(0, 4)} /${str.substring(5, 7)}/${str.substring(
      8,
      10,
    )}`;
  };

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
        {interval}
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
            onClick={() => acceptBid()}
            disabled={acceptBtnDisabled}
          >
            {interval ? acceptBtnText : interval}
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
