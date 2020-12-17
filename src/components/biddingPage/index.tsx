import React, { useState } from 'react';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
        {mode === '需量反應' && (
          <div className={classNames('bidding-dr-date')}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                value={date}
                onChange={(d) =>
                  setDate(dayjs(String(d?.toDateString())).format('YYYY/MM/DD'))
                }
                format="yyyy/MM/dd"
                // label="Choose Data Date"
                showTodayButton
                allowKeyboardControl
              />
            </MuiPickersUtilsProvider>
          </div>
        )}
        <ModeButton setMode={setMode} />
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
