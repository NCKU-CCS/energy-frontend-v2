import React from 'react';
import classNames from 'classnames';
import Total from './total';

interface IProps {
  totalPrice: number;
  totalVolume: number;
}

const BiddingStatus: React.FC<IProps> = ({ totalPrice, totalVolume }) => {
  return (
    <div className={classNames('drbid-status-container')}>
      <div className={classNames('drbid-status-total-container-out')}>
        <Total totalPrice={totalPrice} totalVolume={totalVolume} />
      </div>
    </div>
  );
};

export default BiddingStatus;
