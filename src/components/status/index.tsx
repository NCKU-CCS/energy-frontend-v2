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
  mode: number;
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
  counterpart_address: string;
  counterpart_name: string;
  end_time: string;
  executor: string;
  order_method: string;
  price: number;
  rate: number;
  result: boolean;
  settlement: number;
  start_time: string;
  status: string;
  trading_mode: number;
  uuid: string;
  volume: number;
}

const Status: React.FC = () => {
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );
  // data
  const [listInfo, setListInfo] = useState<IListInfo[]>([]);
  const [DRResult, setDRResult] = useState<IDR[]>([]);
  const [trainInfo, setTrainInfo] = useState<ITrainInfo[]>([]);
  const [nowIndex, setNowIndex] = useState<number>(-1);
  const [statusInfo, setStatusInfo] = useState<IStatus[]>([]);
  // user state
  const [isGreen, setIsGreen] = useState<boolean>(user.role !== 'tpc');
  const [isDR, setIsDR] = useState<boolean>(user.role === 'tpc');
  const [isDRBid, setIsDRBid] = useState<boolean>(true);
  const [isDRAccept, setIsDRAccept] = useState<boolean>(false);

  const fetchMatchResult = async () => {
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
      const data = await response.json();
      setListInfo(data);
      setTrainInfo(data);
      setStatusInfo(data);
    }
  };

  const fetchDR = async () => {
    let DRType = '';
    if (user.role === 'aggregator')
      DRType = isDRBid ? '&acceptor_role=tpc' : '&acceptor_role=aggregator';
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/DR_bid?per_page=10&page=1${DRType}`,
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
      const data = await response.json();
      setDRResult(data);
    }
  };

  useEffect(() => {
    (async () => {
      if (isGreen) await fetchMatchResult();
      else if (isDR) await fetchDR();
    })();
  }, [isGreen, isDR, isDRBid, isDRAccept]);

  // add list data
  useEffect(() => {
    if (DRResult.length > 0) {
      const listDBData = [];
      for (let i = 0; i < DRResult.length; i += 1) {
        const APItime = dayjs(DRResult[i].start_time);
        let { rate } = DRResult[i];
        if (rate === null) rate = 0;
        const DBdata: IListInfo = {
          bid_type: DRResult[i].order_method,
          status: DRResult[i].status,
          date: APItime.format('YYYY-MM-DD'),
          time: `${APItime.format('HH:mm')}-${APItime.add(1, 'hour').format(
            'HH:mm',
          )}`,
          bids: {
            price: DRResult[i].price,
            value: DRResult[i].volume,
          },
          counterpart: {
            address: DRResult[i].counterpart_address,
            name: DRResult[i].counterpart_name,
          },
          wins: {
            price: 0,
            value: 0,
          },
          transaction_hash: DRResult[i].blockchain_url,
          id: DRResult[i].uuid,
          upload: DRResult[i].start_time,
          achievement: rate,
          mode: DRResult[i].trading_mode,
        };
        listDBData.push(DBdata);
      }
      setListInfo(listDBData);
    }
  }, [DRResult]);

  // add train data
  useEffect(() => {
    if (DRResult.length > 0) {
      const listDBData = [];
      for (let i = 0; i < DRResult.length; i += 1) {
        const DBdata: ITrainInfo = {
          status: DRResult[i].status,
          bids: {
            price: DRResult[i].settlement,
            value: DRResult[i].volume,
          },
          counterpart: {
            address: DRResult[i].counterpart_address,
            name: DRResult[i].counterpart_name,
          },
          wins: {
            price: 0,
            value: 0,
          },
          id: DRResult[i].uuid,
          upload: DRResult[i].start_time,
        };
        listDBData.push(DBdata);
      }
      setTrainInfo(listDBData);
    }
  }, [DRResult]);

  // add status data
  useEffect(() => {
    if (DRResult.length > 0) {
      const listDBData = [];
      for (let i = 0; i < DRResult.length; i += 1) {
        let { rate } = DRResult[i];
        if (rate === null) rate = 0;
        const DBdata: IStatus = {
          status: DRResult[i].status,
          achievement: rate,
        };
        listDBData.push(DBdata);
      }
      setStatusInfo(listDBData);
    }
  }, [DRResult]);

  return (
    <div
      className={
        user.role === 'tpc'
          ? classnames('status', 'status--tpc')
          : classnames('status')
      }
    >
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
