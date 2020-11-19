import React, { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import BiddingStatus from './status';
import ModeButton from './modeButton';
import Submit from './submit';
import Dr from './dr';
import Graph from './graph';

const BiddingPageContainer: React.FC = () => {
  // date for dr
  const [date, setDate] = useState<string>(
    dayjs(new Date()).format('YYYY-MM-DD'),
  );

  // mode
  const [mode, setMode] = useState('綠能交易');

  return (
    <div className={classNames('bidding-container')}>
      <div className={classNames('bidding-a1')}>
        <ModeButton setMode={setMode} />
        {mode === '需量反應' && (
          <input
            className={classNames('bidding-dr-date')}
            type="date"
            value={date}
            onChange={(e) =>
              setDate(dayjs(e.target.value).format('YYYY-MM-DD'))
            }
            title={dayjs(date).format('YYYY/MM/DD')}
          />
        )}
      </div>
      <div className={classNames('bidding-a2')}>
        <div className={classNames('bidding-a2-b1')}>
          <BiddingStatus mode={mode} />
        </div>
        <div className={classNames('bidding-a2-b2')}>
          <Graph mode={mode} date={date} />
        </div>
      </div>
      <div className={classNames('bidding-a3')}>
        {mode === '綠能交易' ? <Submit /> : <Dr />}
      </div>
    </div>
  );
};

export default BiddingPageContainer;
