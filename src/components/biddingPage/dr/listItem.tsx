import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import DateFnsUtils from '@date-io/date-fns';
import { parseISO } from 'date-fns';
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
  date: string;
  interval: string;
  time: number;
  value: number;
  price: number;
  total: number;
  status: string;
  accepted: boolean;
  isAggr: boolean;
  data: IData[];
  setData(d: IData[]): void;
}

const ListItem: React.FC<IProps> = ({
  date,
  interval,
  time,
  value,
  price,
  total,
  status,
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
  const [DeleteBtnDisabled, setDeleteBtnDisabled] = useState<boolean>(false);

  // bid btn's text
  const [DeleteBtnText, setDeleteBtnText] = useState<string>(
    t('biddingpage.bid'),
  );

  // this bid is editable or not
  const [editable, setEditable] = useState<boolean>(true);

  // current time
  const [currDate, setCurrDate] = useState<Date>(new Date());

  useEffect(() => {
    if (isAggr) {
      setDeleteBtnText(t('biddingpage.accept'));
      setDeleteBtnDisabled(false);
    } else if (
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
      setDeleteBtnDisabled(true);
    } else {
      // available
      setEditable(true);
      setDeleteBtnDisabled(false);
    }
  }, [isAggr, date, time]);

  // determine editable or not every minute
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
      setDeleteBtnDisabled(true);
    }
  }, [currDate]);

  useEffect(() => {}, [status]);

  // handle click edit btn
  const handleClickEditBtn = () => {
    setEditMode(true);
  };

  // handle click delete btn
  const handleClickDeleteBtn = () => {
    if (isAggr) setDeleteBtnText(t('biddingpage.accepted'));
    else {
      setDeleteBtnText(t('biddingpage.deleted'));
      setDeleted(true);
    }
    setDeleteBtnDisabled(true);
    setEditable(false);
  };

  // handle mouse over bid button
  const handleMouseOverDeleteBtn = () => {
    if (!isAggr) setDeleteBtnText(t('biddingpage.delete'));
  };

  // handle mouse out bid button
  const handleMouseOutDeleteBtn = () => {
    if (!isAggr) setDeleteBtnText(t('biddingpage.bid'));
  };

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
            value={parseISO(displayDate)}
            onChange={(d) =>
              setDisplayDate(
                dayjs(String(d?.toDateString())).format('YYYY/MM/DD'),
              )
            }
            format="yyyy/MM/dd"
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
      {!isAggr && (
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
      )}
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-date--show',
        )}
      >
        {insertSpaces(displayDate)}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-interval--show',
        )}
      >
        {displayInterval}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-value--show',
        )}
      >
        {displayValue}&thinsp;kWh
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-price--show',
        )}
      >
        $&thinsp;{displayPrice}&thinsp;/&thinsp;kWh
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-total--show',
        )}
      >
        $&thinsp;{displayTotal.toFixed(1)}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-button-container--show',
        )}
      >
        <button
          className={classNames('bidding-dr-list-listitem-delete-btn--show')}
          type="button"
          onClick={() => handleClickDeleteBtn()}
          onMouseOver={() => handleMouseOverDeleteBtn()}
          onMouseOut={() => handleMouseOutDeleteBtn()}
          onFocus={() => 0}
          onBlur={() => 0}
          disabled={DeleteBtnDisabled}
        >
          {DeleteBtnText}
        </button>
        <InfoBox
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
