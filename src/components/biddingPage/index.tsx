import React from 'react';
import classNames from 'classnames';
import BiddingStatus from './status';
import ModeButton from './modeButton';
import Submit from './submit';

const BiddingPageContainer: React.FC = () => {
  return (
    <div className={classNames('bidding-container')}>
      <div className={classNames('bidding-a1')}>
        <ModeButton />
      </div>
      <div className={classNames('bidding-a2')}>
        <div className={classNames('bidding-a2-b1')}>
          <BiddingStatus />
        </div>
        <div className={classNames('bidding-a2-b2')}>graph</div>
      </div>
      <div className={classNames('bidding-a3')}>
        <Submit />
      </div>
    </div>
  );
};

export default BiddingPageContainer;
