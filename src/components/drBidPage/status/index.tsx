import React from 'react';
import classNames from 'classnames';
import Total from './total';

interface IProps {
  userType: string;
  totalPrice: number;
  totalVolume: number;
}

const BiddingStatus: React.FC<IProps> = ({
  userType,
  totalPrice,
  totalVolume,
}) => {
  return (
    <div className={classNames('drbid-status-container')}>
      <div className={classNames('drbid-status-total-container-out')}>
        <Total
          userType={userType}
          totalPrice={totalPrice}
          totalVolume={totalVolume}
        />
      </div>
    </div>
  );
};

export default BiddingStatus;
