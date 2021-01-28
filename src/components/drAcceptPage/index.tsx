import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import Status from './status';
import Submit from './submit';
import Graph from './graph';
import allTestData from './data.json';
import taipowerData from './taipower.json';
import aggregatorData from './aggregator.json';

interface IData {
  date: string;
  mode: number;
  total_volume: number;
  price: number;
  total_price: number;
  is_submitted: boolean;
}

interface INewData {
  mode: number;
  aggregator?: string;
  executor?: string;
  interval: string;
  total_volume: number;
  price: number;
  total_price: number;
  is_accepted: boolean;
}

const DrAcceptPageContainer: React.FC = () => {
  // date
  const [date, setDate] = useState<string>(dayjs().format('YYYY/MM/DD'));

  // data type: dayBefore(日前), realTime(即時)
  const [dataType, setDataType] = useState<string>('dayBefore');

  // api data
  const [apiData, setApiData] = useState<IData[]>([]);

  // new api data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newApiData, setNewApiData] = useState<INewData[]>([]);

  // get user from local storage or session storage
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  // user type: aggregator, taipower
  const [userType] = useState<string>(
    user.is_aggregator ? 'aggregator' : 'taipower',
  );

  // fetch api data
  useEffect(() => {
    setApiData([
      ...allTestData.filter((d) => d.day === dayjs(date).day())[0].data,
    ]);
    if (userType === 'aggregator') {
      setNewApiData([
        ...aggregatorData.filter((d) => d.day === dayjs(date).day())[0].data,
      ]);
    } else {
      setNewApiData([
        ...taipowerData.filter((d) => d.day === dayjs(date).day())[0].data,
      ]);
    }
  }, [date, dataType]);

  return (
    <div className={classNames('draccept-container')}>
      <div className={classNames('draccept-date-container')}>
        <div className={classNames('draccept-dr-date')}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              inputProps={{
                style: {
                  color: `${date ? '#707070' : '#d1d2d1'}`,
                  cursor: 'pointer',
                },
              }}
              value={date}
              onChange={(d) =>
                setDate(dayjs(String(d?.toDateString())).format('YYYY/MM/DD'))
              }
              format="yyyy/MM/dd"
              showTodayButton
              allowKeyboardControl
              autoOk
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <div className={classNames('draccept-left')}>
        <div className={classNames('draccept-left-top')}>
          <Status
            userType={userType}
            totalPrice={newApiData
              .filter((d) => d.is_accepted)
              .map((d) => d.total_price)
              .reduce((a, b) => a + b, 0)}
            totalVolume={newApiData
              .filter((d) => d.is_accepted)
              .map((d) => d.total_volume)
              .reduce((a, b) => a + b, 0)}
          />
        </div>
        <div className={classNames('draccept-left-bottom')}>
          <Graph
            date={date}
            values={[1, 2, 3, 4, 5].map((i) => {
              return newApiData
                .filter((d) => d.is_accepted && d.mode === i)
                .map((d) => d.total_price)
                .reduce((a, b) => a + b, 0);
            })}
          />
        </div>
      </div>
      <div className={classNames('draccept-right')}>
        <Submit
          date={date}
          userType={userType}
          apiData={apiData}
          newApiData={newApiData}
          setDataType={setDataType}
        />
      </div>
    </div>
  );
};

export default DrAcceptPageContainer;
