import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import List from './list';
import Percentage from './percentage';
import Train from './train';

interface IListInfo {
  bid_type: string;
  status: string;
  date: string;
  time: string;
  bids: {
    price: number;
    value: number;
  };
  counterpart: {
    address: string;
    name: string;
  };
  wins: {
    price: number;
    value: number;
  };
  transaction_hash: string;
  id: string;
  upload: string;
  achievement: number;
}

interface ITrainInfo {
  bids: {
    price: number;
    value: number;
  };
  counterpart: {
    address: string;
    name: string;
  };
  id: string;
  status: string;
  upload: string;
  wins: {
    price: number;
    value: number;
  };
}

interface IStatus {
  status: string;
  achievement: number;
}

interface IDB {
  acceptor: string;
  blockchain_url: string;
  end_time: string;
  executor: string;
  price: number;
  rate: number;
  start_time: string;
  status: string;
  uuid: string;
  volume: number;
}

const Status: React.FC = () => {
  const [listInfo, setListInfo] = useState<IListInfo[]>([]);
  const [listInfoDB, setListInfoDB] = useState<IDB[]>([]);
  const [trainInfo, setTrainInfo] = useState<ITrainInfo[]>([]);
  const [nowIndex, setNowIndex] = useState<number>(-1);
  const [statusInfo, setStatusInfo] = useState<IStatus[]>([]);
  const [listStop, setListStop] = useState<number>(0);
  const [trainStop, setTrainStop] = useState<number>(0);
  const [percentStop, setPercentStop] = useState<number>(0);
  const [isAggregator, setIsAggregator] = useState<boolean>();

  const fetchMatchResult = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to User Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/matchresult`,
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
      },
    );
    if (response.status === 200) {
      // fetch success
      const data = await response.json();
      setListInfo(data);
      setTrainInfo(data);
      setStatusInfo(data);
    }
  };

  const fetchDR = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to User Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/DR_result?start_date=2021-01-01&end_date=2021-01-02`,
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
      },
    );
    if (response.status === 200) {
      // fetch success
      const data = await response.json();
      setListInfoDB(data);
      setListStop(1);
      setTrainStop(1);
      setPercentStop(1);
    }
  };

  const fetchUser = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to User Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/user`,
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
      },
    );
    if (response.status === 200) {
      // fetch success
      const data = await response.json();
      setIsAggregator(data.is_aggregator);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchMatchResult();
      await fetchDR();
      await fetchUser();
    })();
  }, []);

  // add list data
  useEffect(() => {
    if (
      listInfo.length > 0 &&
      listInfoDB.length > 0 &&
      listStop === 1 &&
      isAggregator != null
    ) {
      setListStop(0);
      const listDBData = [];
      for (let i = 0; i < listInfoDB.length; i += 1) {
        const APItime = listInfoDB[i].start_time.split(' ');
        const time = APItime[1].split(':');
        let newTime = parseInt(time[0], 10);
        let inputTime = '';
        if (newTime !== 24) newTime += 1;
        else newTime = 0;
        if (newTime >= 10) inputTime = newTime.toString();
        else inputTime = `0${newTime.toString()}`;
        let name = '';
        name =
          isAggregator === true
            ? listInfoDB[i].executor
            : listInfoDB[i].acceptor;
        let { rate } = listInfoDB[i];
        if (rate == null) rate = 0;
        const DBdata: IListInfo = {
          bid_type: 'dr',
          status: listInfoDB[i].status,
          date: APItime[0],
          time: `${time[0]}:${time[1]}-${inputTime}:00`,
          bids: {
            price: Math.round(listInfoDB[i].price * listInfoDB[i].volume),
            value: 0,
          },
          counterpart: {
            address: '',
            name,
          },
          wins: {
            price: 0,
            value: listInfoDB[i].volume,
          },
          transaction_hash: listInfoDB[i].blockchain_url,
          id: '',
          upload: '',
          achievement: rate,
        };
        listDBData.push(DBdata);
      }
      setListInfo([...listInfo, ...listDBData]);
    }
  }, [listInfo, listInfoDB, listStop, isAggregator]);

  // add train data
  useEffect(() => {
    if (
      trainInfo.length > 0 &&
      listInfoDB.length > 0 &&
      trainStop === 1 &&
      isAggregator != null
    ) {
      setTrainStop(0);
      const listDBData = [];
      for (let i = 0; i < listInfoDB.length; i += 1) {
        let name = '';
        name =
          isAggregator === true
            ? listInfoDB[i].executor
            : listInfoDB[i].acceptor;
        const DBdata: ITrainInfo = {
          status: listInfoDB[i].status,
          bids: {
            price: Math.round(listInfoDB[i].price * listInfoDB[i].volume),
            value: 0,
          },
          counterpart: {
            address: '',
            name,
          },
          wins: {
            price: 0,
            value: listInfoDB[i].volume,
          },
          id: listInfoDB[i].uuid,
          upload: '',
        };
        listDBData.push(DBdata);
      }
      setTrainInfo([...trainInfo, ...listDBData]);
    }
  }, [trainInfo, listInfoDB, trainStop, isAggregator]);

  // add status data
  useEffect(() => {
    if (trainInfo.length > 0 && listInfoDB.length > 0 && percentStop === 1) {
      setPercentStop(0);
      const listDBData = [];
      for (let i = 0; i < listInfoDB.length; i += 1) {
        let { rate } = listInfoDB[i];
        if (rate == null) rate = 0;
        const DBdata: IStatus = {
          status: listInfoDB[i].status,
          achievement: rate,
        };
        listDBData.push(DBdata);
      }
      setStatusInfo([...statusInfo, ...listDBData]);
    }
  }, [statusInfo, statusInfo, percentStop]);

  return (
    <div className={classnames('status')}>
      <div className={classnames('status-upContainer')}>
        <Percentage input={statusInfo} nowIndex={nowIndex} />
        <Train input={trainInfo} index={nowIndex} />
      </div>
      <List listInfo={listInfo} changeIndex={setNowIndex} />
    </div>
  );
};

export default Status;
