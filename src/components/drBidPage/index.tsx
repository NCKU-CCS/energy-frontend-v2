import React, { useState } from 'react';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import BiddingStatus from './status';
import Submit from './submit';
import Graph from './graph';

const BiddingPageContainer: React.FC = () => {
  // get user from local storage or session storage
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  // user type: user, aggregator
  const [userType] = useState<string>(
    user.is_aggregator ? 'aggregator' : 'user',
  );

  // date
  const [date, setDate] = useState<string>(
    dayjs(new Date()).format('YYYY-MM-DD'),
  );

  return (
    <div className={classNames('drbid-container')}>
      <div className={classNames('drbid-a1')}>
        <div className={classNames('drbid-dr-date')}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={date}
              onChange={(d) =>
                setDate(dayjs(String(d?.toDateString())).format('YYYY/MM/DD'))
              }
              format="yyyy/MM/dd"
              showTodayButton
              allowKeyboardControl
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <div className={classNames('drbid-a2')}>
        <div className={classNames('drbid-a2-b1')}>
          <BiddingStatus userType={userType} />
        </div>
        <div className={classNames('drbid-a2-b2')}>
          <Graph />
        </div>
      </div>
      <div className={classNames('drbid-a3')}>
        <Submit />
      </div>
    </div>
  );
};

export default BiddingPageContainer;
