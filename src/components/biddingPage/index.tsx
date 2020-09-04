import React from 'react';
import classNames from 'classnames';
import BiddingStatus from './biddingStatus';

const BiddingPageContainer: React.FC = () => {
  return (
    <div className={classNames('bidding-container')}>
      <div className={classNames('bidding-a1')}>mode button</div>
      <div className={classNames('bidding-a2')}>
        <div className={classNames('bidding-a2-b1')}>
          <BiddingStatus />
          {/* <div
            className={classNames('bidding-a2-b1-c1')}
          >
            即時交易人數
          </div>
          <div
            className={classNames('bidding-a2-b1-c2')}
          >
            平均交易價 / 平均交易量
          </div> */}
        </div>
        <div className={classNames('bidding-a2-b2')}>graph</div>
      </div>
      <div className={classNames('bidding-a3')}>table</div>
    </div>
  );
};

export default BiddingPageContainer;
