/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import InfoBox from './infoBox';
import { intervalArr } from '../../../constants/constant';

interface IData {
  date: string;
  interval: string;
  time: number;
  value: number;
  price: number;
  total: number;
  status: string;
  accepted: boolean;
}

interface IProps {
  start_time: string;
  end_time: string | null;
  uuid: string;
  accepted: Boolean | null;
  date: string;
  interval: string;
  time: number;
  value: number;
  price: number;
  total: number;
  status: string;
  isAggr: boolean;
  data: IData[];
  setData(d: IData[]): void;
}

const ListItem: React.FC<IProps> = ({
  start_time,
  end_time,
  uuid,
  accepted,
  date,
  interval,
  time,
  value,
  price,
  total,
  isAggr,
}) => {
  // i18n
  const { t } = useTranslation();

  // display data
  const [displayDate, setDisplayDate] = useState<string>(date);
  const [displayInterval, setDisplayInterval] = useState<string>(interval);
  const [displayValue, setDisplayValue] = useState<number>(value);
  const [displayPrice, setDisplayPrice] = useState<number>(price);
  const [displayTotal, setDisplayTotal] = useState<number>(total);

  // edit mode
  const [editMode, setEditMode] = useState<boolean>(false);

  // deleted
  const [deleted, setDeleted] = useState<boolean>(false);

  // bid btn disabled or not
  const [acceptBtnDisabled, setAcceptBtnDisabled] = useState<boolean>(
    !!accepted,
  );

  // bid btn's text
  const [acceptBtnText, setAcceptBtnText] = useState<string>(
    accepted ? t('biddingpage.accepted') : t('biddingpage.accept'),
  );

  // this bid is editable or not
  const [editable, setEditable] = useState<boolean>(true);

  // current time
  const [currDate, setCurrDate] = useState<Date>(new Date());

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

    console.log(start_time, end_time);
    console.log(startTime, endTime);

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

  // useEffect(() => {
  //   if (isAggr) {
  //     setAcceptBtnText(t('biddingpage.accept'));
  //     setAcceptBtnDisabled(false);
  //   } else if (
  //     new Date().getTime() >=
  //       new Date(
  //         new Date().getFullYear(),
  //         new Date().getMonth(),
  //         new Date().getDate(),
  //         10,
  //         30,
  //       ).getTime() &&
  //     date === dayjs().add(1, 'day').format('YYYY/MM/DD')
  //   ) {
  //     // expired
  //     setEditable(false);
  //     setAcceptBtnDisabled(true);
  //   } else {
  //     // available
  //     setEditable(true);
  //     setAcceptBtnDisabled(false);
  //   }
  // }, [isAggr, date, time]);

  // determine editable or not every second
  useEffect(() => {
    setInterval(() => setCurrDate(new Date()), 1000);
  }, []);

  useEffect(() => {
    if (
      !isAggr &&
      new Date().getTime() >=
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          10,
          30,
        ).getTime() &&
      date === dayjs().add(1, 'day').format('YYYY/MM/DD')
    ) {
      // expired
      setEditable(false);
      setAcceptBtnDisabled(true);
    }
  }, [currDate]);

  // handle click delete btn
  // const handleClickAcceptBtn = () => {
  //   if (isAggr) setAcceptBtnText(t('biddingpage.accepted'));
  //   else {
  //     setAcceptBtnText(t('biddingpage.deleted'));
  //     setDeleted(true);
  //   }
  //   setAcceptBtnDisabled(true);
  //   setEditable(false);
  // };

  // handle mouse over bid button
  // const handleMouseOverDeleteBtn = () => {
  //   if (!isAggr) setAcceptBtnText(t('biddingpage.delete'));
  // };

  // handle mouse out bid button
  // const handleMouseOutDeleteBtn = () => {
  //   if (!isAggr) setAcceptBtnText(t('biddingpage.bid'));
  // };

  // handle click submit btn
  const handleClickSubmitBtn = () => {
    setEditMode(false);
  };

  // handle click cancel btn
  const handleClickCancelBtn = () => {
    setDisplayDate(date);
    setDisplayInterval(interval);
    setDisplayValue(value);
    setDisplayPrice(price);
    setDisplayTotal(total);
    setEditMode(false);
  };

  // map the interval array and return options
  const createOptions = intervalArr.map((str, i) => {
    return (
      <option value={str} selected={i === time}>
        {str}
      </option>
    );
  });

  // insert spaces to date string for RWD
  const insertSpaces = (str: string) => {
    return `${str.substring(0, 4)} /${str.substring(5, 7)}/${str.substring(
      8,
      10,
    )}`;
  };

  // calculate total
  useEffect(() => {
    setDisplayTotal(parseFloat((displayValue * displayPrice).toFixed(2)));
  }, [displayPrice, displayValue]);

  // eslint-disable-next-line no-nested-ternary
  return editMode ? (
    <div className={classNames('bidding-dr-list-listitem-container-in--edit')}>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--edit',
          'bidding-dr-list-listitem-space--edit',
        )}
      >
        s
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--edit',
          'bidding-dr-list-listitem-date--edit',
        )}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={displayDate}
            onChange={(d) =>
              setDisplayDate(
                dayjs(String(d?.toDateString())).format('YYYY/MM/DD'),
              )
            }
            format="yyyy/MM/dd"
            // label="Choose Data Date"
            showTodayButton
            disablePast
            allowKeyboardControl
          />
        </MuiPickersUtilsProvider>
      </div>
      <select
        className={classNames(
          'bidding-dr-list-listitem-item--edit',
          'bidding-dr-list-listitem-interval--edit',
        )}
        defaultValue={interval}
        onChange={(e) => setDisplayInterval(e.target.value)}
      >
        <option value={interval}>{interval}</option>
        {createOptions}
      </select>
      <input
        type="number"
        min="0"
        step="0.1"
        className={classNames(
          'bidding-dr-list-listitem-item--edit',
          'bidding-dr-list-listitem-value--edit',
        )}
        defaultValue={value}
        onChange={(e) => setDisplayValue(parseFloat(e.target.value))}
      />
      <input
        type="number"
        min="0"
        step="0.1"
        className={classNames(
          'bidding-dr-list-listitem-item--edit',
          'bidding-dr-list-listitem-price--edit',
        )}
        defaultValue={price}
        onChange={(e) => setDisplayPrice(parseFloat(e.target.value))}
      />
      <input
        type="number"
        min="0"
        step="0.1"
        className={classNames(
          'bidding-dr-list-listitem-item--edit',
          'bidding-dr-list-listitem-total--edit',
        )}
        value={displayTotal}
        disabled
      />
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--edit',
          'bidding-dr-list-listitem-button-container--edit',
        )}
      >
        <button
          type="button"
          onClick={() => handleClickSubmitBtn()}
          className={classNames('bidding-dr-list-listitem-submit-btn--edit')}
        >
          <img
            alt="submit"
            src={`${process.env.PUBLIC_URL}/biddingPage/check-gray.png`}
            className={classNames('bidding-dr-list-listitem-submit-img--edit')}
          />
        </button>
        <button
          type="button"
          onClick={() => handleClickCancelBtn()}
          className={classNames('bidding-dr-list-listitem-cancel-btn--edit')}
        >
          <img
            alt="cancel"
            src={`${process.env.PUBLIC_URL}/biddingPage/cancel-gray.png`}
            className={classNames('bidding-dr-list-listitem-cancel-img--edit')}
          />
        </button>
      </div>
    </div>
  ) : deleted ? null : (
    <div className={classNames('bidding-dr-list-listitem-container-in--show')}>
      {/* {!isAggr && (
        <button
          type="button"
          title="edit"
          className={classNames(
            'bidding-dr-list-listitem-item--show',
            'bidding-dr-list-listitem-edit--show',
          )}
          onClick={() => handleClickEditBtn()}
          disabled={!editable}
        >
          <img
            alt="edit"
            src={`${process.env.PUBLIC_URL}/biddingPage/pencil-${
              editable ? 'orange' : 'disabled'
            }.png`}
            className={classNames('bidding-dr-list-listitem-edit-img--show')}
          />
        </button>
      )} */}
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-date--show',
          `bidding-dr-list-listitem-date--${isAggr ? 'aggr' : 'user'}`,
        )}
      >
        {insertSpaces(displayDate)}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-interval--show',
          `bidding-dr-list-listitem-interval--${isAggr ? 'aggr' : 'user'}`,
        )}
      >
        {displayInterval}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-value--show',
          `bidding-dr-list-listitem-value--${isAggr ? 'aggr' : 'user'}`,
        )}
      >
        {displayValue}&thinsp;kWh
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-price--show',
          `bidding-dr-list-listitem-price--${isAggr ? 'aggr' : 'user'}`,
        )}
      >
        $&thinsp;{displayPrice}&thinsp;/&thinsp;kWh
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-total--show',
          `bidding-dr-list-listitem-total--${isAggr ? 'aggr' : 'user'}`,
        )}
      >
        $&thinsp;{displayTotal.toFixed(1)}
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
            {/* {acceptBtnText} */}
            {displayInterval ? acceptBtnText : displayInterval}
          </button>
        )}
        <InfoBox
          start_time={start_time}
          end_time={end_time}
          uuid={uuid}
          accepted={accepted}
          isAggr={isAggr}
          editable={editable}
          displayDate={displayDate}
          displayInterval={displayInterval}
          displayValue={displayValue}
          displayPrice={displayPrice}
          displayTotal={displayTotal}
          setDisplayDate={setDisplayDate}
          setDisplayInterval={setDisplayInterval}
          setDisplayValue={setDisplayValue}
          setDisplayPrice={setDisplayPrice}
          setDisplayTotal={setDisplayTotal}
          setDeleted={setDeleted}
        />
      </div>
    </div>
  );
};

export default ListItem;
