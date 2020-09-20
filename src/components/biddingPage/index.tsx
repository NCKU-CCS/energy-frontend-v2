import React, { useState } from 'react';
import classNames from 'classnames';
import BiddingStatus from './status';
import ModeButton from './modeButton';
import Submit from './submit';
import Graph from './graph';
import Dr from './dr';

const BiddingPageContainer: React.FC = () => {
  // mode
  const [mode, setMode] = useState('綠能交易');

  return (
    <div className={classNames('bidding-container')}>
      <div className={classNames('bidding-a1')}>
        <ModeButton setMode={setMode} />
      </div>
      <div className={classNames('bidding-a2')}>
        <div className={classNames('bidding-a2-b1')}>
          <BiddingStatus mode={mode} />
        </div>
        <div className={classNames('bidding-a2-b2')}>
          <Graph mode={mode} />
        </div>
      </div>
      <div className={classNames('bidding-a3')}>
        {mode === '綠能交易' ? <Submit /> : <Dr />}
      </div>
    </div>
  );
};

export default BiddingPageContainer;
