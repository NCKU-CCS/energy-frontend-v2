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
  // bid btn disabled or not
  const [bidBtnDisabled, setBidBtnDisabled] = useState<boolean>(false);

  // bid btn's text
  const [bidBtnText, setBidBtnText] = useState<string>('投標');

  // bid btn class name
  const [bidBtnClassName, setBidBtnClassName] = useState<string>(
    'bidding-dr-list-listitem-bid-btn',
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
      setBidBtnClassName('bidding-dr-list-listitem-bid-btn--expired');
    } else {
      setEditable(true);
      setBidBtnDisabled(false);
      setBidBtnText('投標');
    }
  };

  useEffect(() => {
    determineEditable();
  }, []);

  useEffect(() => {
    setInterval(determineEditable, 1000 * 60 * 60);
  });

  // handle click bid btn
  const handleClickBidBtn = () => {
    setBidBtnText('已投標');
    setBidBtnDisabled(true);
  };

  return (
    <div className={classNames('bidding-dr-list-listitem-container-in')}>
      <button
        type="button"
        className={classNames(
          'bidding-dr-list-listitem-item',
          'bidding-dr-list-listitem-edit',
        )}
        disabled={!editable}
      >
        <img
          alt="edit"
          src={`${process.env.PUBLIC_URL}/biddingPage/pencil-${
            editable ? 'orange' : 'disabled'
          }.png`}
          className={classNames('bidding-dr-list-listitem-edit-img')}
        />
      </button>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item',
          'bidding-dr-list-listitem-date',
        )}
      >
        {date}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item',
          'bidding-dr-list-listitem-interval',
        )}
      >
        {interval}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item',
          'bidding-dr-list-listitem-value',
        )}
      >
        {value}kWh
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item',
          'bidding-dr-list-listitem-price',
        )}
      >
        ${price}/kWh
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item',
          'bidding-dr-list-listitem-total',
        )}
      >
        ${total}
      </div>
      <div
        className={classNames(
          'bidding-dr-list-listitem-item',
          'bidding-dr-list-listitem-button-container',
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
