import React from 'react';
import classNames from 'classnames';

interface IProps {
  averagePrice: number;
  averageVolume: number;
}

const Average: React.FC<IProps> = ({ averagePrice, averageVolume }) => {
  return (
    <div className={classNames('bidding-status-average-container-in')}>
      <div className={classNames('bidding-status-average-image-container')}>
        <img
          className={classNames('bidding-status-average-image-img')}
          alt=""
          src={`${process.env.PUBLIC_URL}/biddingPage/arrow.png`}
        />
      </div>
      <div>
        <div>${averagePrice}/kWh</div>
        <div>平均交易價</div>
      </div>
      <div>
        <div>{averageVolume}kWh</div>
        <div>平均交易量</div>
      </div>
    </div>
  );
};

export default Average;
