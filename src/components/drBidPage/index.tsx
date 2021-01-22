import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import Status from './status';
import Submit from './submit';
import Graph from './graph';
import allTestData from './data.json';

interface IApiData {
  date: string;
  mode: number;
  total_volume: number;
  price: number;
  total_price: number;
  is_submitted: boolean;
}

const DrBidPageContainer: React.FC = () => {
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
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

  // api data
  const [apiData, setApiData] = useState<IApiData[]>([]);

  useEffect(() => {
    setApiData([
      ...allTestData.filter((d) => d.day === dayjs(date).day())[0].data,
    ]);
  }, [date]);

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
          <Status
            userType={userType}
            totalPrice={apiData
              .filter((d) => d.is_submitted)
              .map((d) => d.total_price)
              .reduce((a, b) => a + b, 0)}
            totalVolume={apiData
              .filter((d) => d.is_submitted)
              .map((d) => d.total_volume)
              .reduce((a, b) => a + b, 0)}
          />
        </div>
        <div className={classNames('drbid-a2-b2')}>
          <Graph
            values={[
              apiData
                .filter((d) => d.is_submitted && d.mode === 1)
                .map((d) => d.total_price)
                .reduce((a, b) => a + b, 0),
              apiData
                .filter((d) => d.is_submitted && d.mode === 2)
                .map((d) => d.total_price)
                .reduce((a, b) => a + b, 0),
              apiData
                .filter((d) => d.is_submitted && d.mode === 3)
                .map((d) => d.total_price)
                .reduce((a, b) => a + b, 0),
              apiData
                .filter((d) => d.is_submitted && d.mode === 4)
                .map((d) => d.total_price)
                .reduce((a, b) => a + b, 0),
              apiData
                .filter((d) => d.is_submitted && d.mode === 5)
                .map((d) => d.total_price)
                .reduce((a, b) => a + b, 0),
            ]}
          />
        </div>
      </div>
      <div className={classNames('drbid-a3')}>
        <Submit />
      </div>
    </div>
  );
};

export default DrBidPageContainer;
