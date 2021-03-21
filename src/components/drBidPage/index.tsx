/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import Status from './status';
import Submit from './submit';
import Graph from './graph';

interface IData {
  uuid: string;
  startTime: string;
  endTime: string;
  mode: number;
  volume: number;
  price: number;
  status: string;
}

const DrBidPageContainer: React.FC = () => {
  // get user from local storage or session storage
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  // user type: user, aggregator
  const [userType] = useState<string>(user.role);

  // date
  const [date, setDate] = useState<string>(dayjs().format('YYYY/MM/DD'));

  // data type: dayBefore(日前), realTime(即時)
  const [dataType, setDataType] = useState<string>('日前');

  // api data
  const [apiData, setApiData] = useState<IData[]>([]);

  // fetch api data
  const fetchApiData = async () => {
    // GET DR_bid
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/DR_bid?date=${dayjs(
        date,
      ).format('YYYY-MM-DD')}&order_method=${dataType}${
        user.role === 'aggregator' ? '&acceptor_role=tpc' : ''
      }`,
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
      },
    );

    // response
    if (response.status === 200) {
      // fetch success
      const tmp = await response.json();
      const extract = tmp
        .filter(
          (item: any) =>
            item.data.status === '已投標' || item.data.status === '投標中',
        )
        .map((item: any) => {
          return {
            uuid: item.data.uuid,
            startTime: item.data.start_time,
            endTime: item.data.end_time,
            mode: item.data.trading_mode,
            volume: item.data.volume,
            price: item.data.price,
            status: item.data.status,
          };
        });
      setApiData([...extract]);
    } else {
      alert('failed');
    }
  };

  // fetch api data
  useEffect(() => {
    (async () => {
      await fetchApiData();
    })();
  }, [date, dataType]);

  return (
    <div className={classNames('drbid-container')}>
      <div className={classNames('drbid-date-container')}>
        <div className={classNames('drbid-dr-date')}>
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
      <div className={classNames('drbid-left')}>
        <div className={classNames('drbid-left-top')}>
          <Status
            userType={userType}
            totalPrice={apiData
              .filter((d) => d.status === '已投標')
              .map((d) => d.price)
              .reduce((a, b) => a + b, 0)}
            totalVolume={apiData
              .filter((d) => d.status === '已投標')
              .map((d) => d.volume)
              .reduce((a, b) => a + b, 0)}
          />
        </div>
        <div className={classNames('drbid-left-bottom')}>
          <Graph
            date={date}
            values={[1, 2, 3, 4, 5].map((i) => {
              return apiData
                .filter((d) => d.status === '已投標' && d.mode === i)
                .map((d) => d.price)
                .reduce((a, b) => a + b, 0);
            })}
          />
        </div>
      </div>
      <div className={classNames('drbid-right')}>
        <Submit date={date} apiData={apiData} setDataType={setDataType} />
      </div>
    </div>
  );
};

export default DrBidPageContainer;
