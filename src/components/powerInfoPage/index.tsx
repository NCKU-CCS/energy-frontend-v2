import React, { useState } from 'react';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import Chart from './chart';
import ModeButton from './modeButton';
import Summary from './summary';
import Table from './table';

const PowerInfoPageContainer: React.FC = () => {
  // mode -> 淨負載 or 產能設備
  const [mode, setMode] = useState('淨負載');
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className={classNames('powerinfo-container')}>
      <div className={classNames('c', 'c1')}>
        {/* <DatePicker setDate={setDate} currDate={date} /> */}
        <div className={classNames('powerinfo-datepicker-container')}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={date}
              onChange={(d) =>
                setDate(new Date(dayjs(d?.toDateString()).format('YYYY-MM-DD')))
              }
              format="yyyy/MM/dd"
              disableFuture
              showTodayButton
              allowKeyboardControl
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <div className={classNames('c', 'c2')}>
        <ModeButton changeMode={setMode} />
      </div>
      <div className={classNames('c', 'c3')}>
        <Chart mode={mode} date={date} />
      </div>
      <div className={classNames('c', 'c4')}>
        <Summary mode={mode} date={date} />
      </div>
      <div className={classNames('c', 'c5')}>
        <Table date={date} />
      </div>
    </div>
  );
};

export default PowerInfoPageContainer;
