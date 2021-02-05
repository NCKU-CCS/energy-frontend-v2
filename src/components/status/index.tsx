import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import List from './list';
import Percentage from './percentage';
import Train from './train';
import Mode from './mode';

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

interface IDR {
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
  const [DRResult, setDRResult] = useState<IDR[]>([]);
  const [trainInfo, setTrainInfo] = useState<ITrainInfo[]>([]);
  const [nowIndex, setNowIndex] = useState<number>(-1);
  const [statusInfo, setStatusInfo] = useState<IStatus[]>([]);
  const [isAggregator, setIsAggregator] = useState<boolean>();
  const [isGreen, setIsGreen] = useState<boolean>(true);
  const [isDR, setIsDR] = useState<boolean>(false);
  const [isDRBid, setIsDRBid] = useState<boolean>(true);
  const [isDRAccept, setIsDRAccept] = useState<boolean>(false);

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
    const day = dayjs().add(2, 'day');
    const endTime = day.format('YYYY-MM-DD');
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to User Info API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/DR_result?start_date=2021-01-01&end_date=${endTime}`,
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
      setDRResult(data);
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
    if (DRResult.length > 0 && isAggregator != null) {
      const listDBData = [];
      for (let i = 0; i < DRResult.length; i += 1) {
        const APItime = dayjs(DRResult[i].start_time);
        let name = '';
        name =
          isAggregator === true ? DRResult[i].executor : DRResult[i].acceptor;
        let { rate } = DRResult[i];
        if (rate == null) rate = 0;
        const DBdata: IListInfo = {
          bid_type: 'dr',
          status: DRResult[i].status,
          date: APItime.format('YYYY-MM-DD'),
          time: `${APItime.format('HH:mm')}-${APItime.add(1, 'hour').format(
            'HH:mm',
          )}`,
          bids: {
            price: Math.round(DRResult[i].price * DRResult[i].volume),
            value: 0,
          },
          counterpart: {
            address: '',
            name,
          },
          wins: {
            price: 0,
            value: DRResult[i].volume,
          },
          transaction_hash: DRResult[i].blockchain_url,
          id: DRResult[i].uuid,
          upload: '',
          achievement: rate,
        };
        listDBData.push(DBdata);
      }
      setListInfo([...listInfo, ...listDBData]);
    }
  }, [DRResult, isAggregator]);

  // add train data
  useEffect(() => {
    if (DRResult.length > 0 && isAggregator != null) {
      const listDBData = [];
      for (let i = 0; i < DRResult.length; i += 1) {
        let name = '';
        name =
          isAggregator === true ? DRResult[i].executor : DRResult[i].acceptor;
        const DBdata: ITrainInfo = {
          status: DRResult[i].status,
          bids: {
            price: Math.round(DRResult[i].price * DRResult[i].volume),
            value: 0,
          },
          counterpart: {
            address: '',
            name,
          },
          wins: {
            price: 0,
            value: DRResult[i].volume,
          },
          id: DRResult[i].uuid,
          upload: '',
        };
        listDBData.push(DBdata);
      }
      setTrainInfo([...trainInfo, ...listDBData]);
    }
  }, [DRResult, isAggregator]);

  // add status data
  useEffect(() => {
    if (DRResult.length > 0) {
      const listDBData = [];
      for (let i = 0; i < DRResult.length; i += 1) {
        let { rate } = DRResult[i];
        if (rate == null) rate = 0;
        const DBdata: IStatus = {
          status: DRResult[i].status,
          achievement: rate,
        };
        listDBData.push(DBdata);
      }
      setStatusInfo([...statusInfo, ...listDBData]);
    }
  }, [DRResult]);

  return (
    <div className={classnames('status')}>
      <Mode
        isDR={isDR}
        isGreen={isGreen}
        isDRBid={isDRBid}
        isDRAccept={isDRAccept}
        setIsGreen={setIsGreen}
        setIsDR={setIsDR}
        setIsDRBid={setIsDRBid}
        setIsDRAccept={setIsDRAccept}
      />
      <div className={classnames('status-upContainer')}>
        <Percentage input={statusInfo} nowIndex={nowIndex} />
        <Train input={trainInfo} index={nowIndex} />
      </div>
      <List listInfo={listInfo} changeIndex={setNowIndex} isDR={isDR} />
    </div>
  );
};

export default Status;
