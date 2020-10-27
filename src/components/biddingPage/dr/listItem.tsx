import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { intervalArr } from '../../../constants/constant';

interface IProps {
  date: string;
  interval: string;
  time: number;
  value: number;
  price: number;
  total: number;
  status: string;
  isAggr: boolean;
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
  // display data
  const [displayDate, setDisplayDate] = useState<string>(date);
  const [displayInterval, setDisplayInterval] = useState<string>(interval);
  const [displayValue, setDisplayValue] = useState<number>(value);
  const [displayPrice, setDisplayPrice] = useState<number>(price);
  const [displayTotal, setDisplayTotal] = useState<number>(total);

  // edit mode
  const [editMode, setEditMode] = useState<boolean>(false);

  // bid btn disabled or not
  const [bidBtnDisabled, setBidBtnDisabled] = useState<boolean>(false);

  // bid btn's text
  const [bidBtnText, setBidBtnText] = useState<string>('投標');

  // bid btn class name
  const [bidBtnClassName, setBidBtnClassName] = useState<string>(
    'bidding-dr-list-listitem-bid-btn--show',
  );

  // this bid is editable or not
  const [editable, setEditable] = useState<boolean>(true);

  // determine editable or not
  // const determineEditable = () => {
  //   if (
  //     date === dayjs().add(1, 'day').format('YYYY/MM/DD') &&
  //     new Date().getHours() * 60 + new Date().getMinutes() >= 630
  //   ) {
  //     setEditable(false);
  //     setBidBtnDisabled(true);
  //     setBidBtnText('已過期');
  //     setBidBtnClassName('bidding-dr-list-listitem-bid-btn--expired--show');
  //   } else {
  //     setEditable(true);
  //     setBidBtnDisabled(false);
  //     setBidBtnText('投標');
  //   }
  // };

  // status
  // useEffect(() => {
  //   if (status === 'bid') {
  //     setEditable(false);
  //     setBidBtnDisabled(true);
  //     // setBidBtnText('已投標');
  //   } else if (status === 'expired') {
  //     setEditable(false);
  //     setBidBtnDisabled(true);
  //     // setBidBtnText('已過期');
  //     setBidBtnClassName('bidding-dr-list-listitem-bid-btn--expired--show');
  //   }
  // }, [status]);

  useEffect(() => {
    if (isAggr) {
      if (status === 'bid') {
        setBidBtnText('接受');
        setBidBtnDisabled(false);
      } else {
        setBidBtnText('未開放');
        setBidBtnDisabled(true);
        setBidBtnClassName('bidding-dr-list-listitem-bid-btn--expired--show');
      }
    } else if (status === 'bid') {
      setBidBtnText('已投標');
      setEditable(false);
      setBidBtnDisabled(true);
    } else if (status === 'expired') {
      setBidBtnText('未投標');
      setEditable(false);
      setBidBtnDisabled(true);
      setBidBtnClassName('bidding-dr-list-listitem-bid-btn--expired--show');
    } else {
      setBidBtnText('投標');
    }
  }, [isAggr, status]);

  // determine editable or not every minute
  // useEffect(() => {
  //   determineEditable();
  //   setInterval(determineEditable, 1000 * 60);
  // }, []);

  // handle click edit btn
  const handleClickEditBtn = () => {
    setEditMode(true);
  };

  // handle click bid btn
  const handleClickBidBtn = () => {
    if (isAggr) setBidBtnText('已接受');
    else setBidBtnText('已投標');
    setBidBtnDisabled(true);
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

  // calculate total
  useEffect(() => {
    setDisplayTotal(parseFloat((displayValue * displayPrice).toFixed(2)));
  }, [displayPrice, displayValue]);

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
      <input
        type="date"
        className={classNames(
          'bidding-dr-list-listitem-item--edit',
          'bidding-dr-list-listitem-date--edit',
        )}
        defaultValue={dayjs(new Date(date)).format('YYYY-MM-DD').toString()}
        onChange={(e) =>
          setDisplayDate(dayjs(e.target.value).format('YYYY/MM/DD'))
        }
      />
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
  ) : (
    <div className={classNames('bidding-dr-list-listitem-container-in--show')}>
      {isAggr ? (
        <div
          className={classNames(
            'bidding-dr-list-listitem-item--show',
            'bidding-dr-list-listitem-space1--show--aggr',
          )}
        >
          {}
        </div>
      ) : (
        <button
          type="button"
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
        {displayDate}
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
        {displayValue}kWh
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-price--show',
        )}
      >
        ${displayPrice}/kWh
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-total--show',
        )}
      >
        ${displayTotal}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item--show',
          'bidding-dr-list-listitem-button-container--show',
        )}
      >
        <button
          className={classNames(`${bidBtnClassName}`)}
          type="button"
          onClick={() => handleClickBidBtn()}
          disabled={bidBtnDisabled}
        >
          {bidBtnText}
        </button>
      </div>
    </div>
  );
};

export default ListItem;
