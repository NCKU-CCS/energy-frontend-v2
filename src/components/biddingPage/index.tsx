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
  // // test
  // const [testDate, setTestDate] = useState<Date | null>(new Date(dayjs().format('YYYY/MM/DD')));

  // // test
  // const [testDateStr, setTestDateStr] = useState<string | null>(dayjs().format('YYYY/MM/DD'));

  // date for dr
  const [date, setDate] = useState<string>(
    dayjs(new Date()).format('YYYY-MM-DD'),
  );

  // mode
  const [mode, setMode] = useState('綠能交易');

  // // test
  // useEffect(() => {
  //   console.log(testDateStr);
  // }, [testDateStr]);

  return (
    <div className={classNames('bidding-container')}>
      <div className={classNames('bidding-a1')}>
        {mode === '需量反應' && (
          // <input
          //   className={classNames('bidding-dr-date')}
          //   type="date"
          //   value={date}
          //   onChange={(e) =>
          //     setDate(dayjs(e.target.value).format('YYYY-MM-DD'))
          //   }
          //   title={dayjs(date).format('YYYY/MM/DD')}
          // />
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
        {/* {mode === '綠能交易' && (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              value={testDate}
              onChange={(d) => setTestDateStr(dayjs(String(d?.toDateString())).format('YYYY/MM/DD'))}
              label='Test Date Picker'
              format='yyyy/MM/dd'
              showTodayButton
              allowKeyboardControl
            />
          </MuiPickersUtilsProvider>
        )} */}
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
