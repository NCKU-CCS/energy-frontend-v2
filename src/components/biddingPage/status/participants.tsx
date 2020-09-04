import React from 'react';
import classNames from 'classnames';

interface IProps {
  participants: number;
}

const Participants: React.FC<IProps> = ({ participants }) => {
  return (
    <div className={classNames('bidding-status-participants-container-in')}>
      <img
        className={classNames('bidding-status-participants-img')}
        alt=""
        src={`${process.env.PUBLIC_URL}/biddingPage/people.png`}
      />
      <div className={classNames('bidding-status-participants-text-container')}>
        <div className={classNames('bidding-status-participants-text-value')}>
          {participants}
        </div>
        <div className={classNames('bidding-status-participants-text-title')}>
          即時交易人數
        </div>
      </div>
    </div>
  );
};

export default Participants;
