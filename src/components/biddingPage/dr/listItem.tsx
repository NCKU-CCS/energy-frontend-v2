import React, { useState } from 'react';
import classNames from 'classnames';

interface IProps {
  date: string;
  interval: string;
  value: number;
  price: number;
  total: number;
  // editable: boolean;
}

const ListItem: React.FC<IProps> = ({
  date,
  interval,
  value,
  price,
  total,
  // editable
}) => {
  const [acceptBtnDisabled, setAcceptBtnDisabled] = useState<boolean>(false);

  return (
    <div className={classNames('bidding-dr-list-listitem-container-in')}>
      <button
        type="button"
        className={classNames(
          'bidding-dr-list-listitem-item',
          'bidding-dr-list-listitem-edit',
        )}
      >
        <img
          alt="edit"
          src={`${process.env.PUBLIC_URL}/biddingPage/pencil-orange.png`}
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
          className={classNames('bidding-dr-list-listitem-button-btn')}
          type="button"
          onClick={() => setAcceptBtnDisabled(true)}
          disabled={acceptBtnDisabled}
        >
          {acceptBtnDisabled ? '已投標' : '投標'}
        </button>
      </div>
    </div>
  );
};

export default ListItem;
