import React from 'react';
import classNames from 'classnames';

interface IProps {
  mode: string;
  averagePrice: number;
  averageVolume: number;
}

const Average: React.FC<IProps> = ({ mode, averagePrice, averageVolume }) => {
  return (
    <div className={classNames('bidding-status-average-container-in')}>
      <div className={classNames('bidding-status-average-image-container')}>
        <img
          className={classNames('bidding-status-average-image-img')}
          alt=""
          src={`${process.env.PUBLIC_URL}/biddingPage/arrow${
            mode === '需量反應' ? '-b' : ''
          }.png`}
        />
      </div>
      <div className={classNames('bidding-status-average-text-container')}>
        <div
          className={classNames('bidding-status-average-text-price-container')}
        >
          <div
            className={classNames('bidding-status-average-text-price-value')}
          >
            ${averagePrice}/kWh
          </div>
          <div
            className={classNames('bidding-status-average-text-price-title')}
          >
            平均交易價
          </div>
        </div>
        <div
          className={classNames('bidding-status-average-text-volume-container')}
        >
          <div
            className={classNames('bidding-status-average-text-volume-value')}
          >
            {averageVolume}kWh
          </div>
          <div
            className={classNames('bidding-status-average-text-volume-title')}
          >
            平均交易量
          </div>
        </div>
      </div>
    </div>
  );
};

export default Average;
