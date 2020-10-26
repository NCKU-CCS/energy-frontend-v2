import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

interface IProps {
  date: string;
  interval: string;
  value: number;
  price: number;
  total: number;
}

const ListItem: React.FC<IProps> = ({
  date,
  interval,
  value,
  price,
  total,
}) => {
  // display data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [displayDate, setDisplayDate] = useState<string>(date);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [displayInterval, setDisplayInterval] = useState<string>(interval);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [displayValue, setDisplayValue] = useState<number>(value);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [displayPrice, setDisplayPrice] = useState<number>(price);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const determineEditable = () => {
    if (
      date === dayjs().add(1, 'day').format('YYYY/MM/DD') &&
      new Date().getHours() * 60 + new Date().getMinutes() >= 630
    ) {
      setEditable(false);
      setBidBtnDisabled(true);
      setBidBtnText('已過期');
      setBidBtnClassName('bidding-dr-list-listitem-bid-btn--expired--show');
    } else {
      setEditable(true);
      setBidBtnDisabled(false);
      setBidBtnText('投標');
    }
  };

  // determine editable or not every minute
  useEffect(() => {
    determineEditable();
    setInterval(determineEditable, 1000 * 60);
  }, []);

  // handle click edit btn
  const handleClickEditBtn = () => {
    setEditMode(true);
  };

  // handle click bid btn
  const handleClickBidBtn = () => {
    setBidBtnText('已投標');
    setBidBtnDisabled(true);
  };

  return editMode ? (
    <div className={classNames('bidding-dr-list-listitem-container-in--edit')}>
      {/* <input type="date" />
        <select>
          <option>1</option>
        </select>
        <input type="number" />
        <input type="number" />
        <input type="number" /> */}
    </div>
  ) : (
    <div className={classNames('bidding-dr-list-listitem-container-in--show')}>
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
