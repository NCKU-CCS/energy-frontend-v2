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

interface IDRData {
  current_page: number;
  data: IDR;
  max_page: number;
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
  const [DRData, setDRData] = useState<IDRData[]>([]);
  const [trainInfo, setTrainInfo] = useState<ITrainInfo[]>([]);
  const [nowIndex, setNowIndex] = useState<number>(-1);
  const [statusInfo, setStatusInfo] = useState<IStatus[]>([]);
  // user state
  const [isGreen, setIsGreen] = useState<boolean>(user.role !== 'tpc');
  const [isDR, setIsDR] = useState<boolean>(user.role === 'tpc');
  const [isDRBid, setIsDRBid] = useState<boolean>(true);
  const [isDRAccept, setIsDRAccept] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [pageSize, setPagesize] = useState<number>(15);

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
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/DR_bid?per_page=${pageSize}&page=${currentPage}&sort="DESC"${DRType}`,
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
      setDRData(data);
    }
  };

  useEffect(() => {
    (async () => {
      if (isGreen) await fetchMatchResult();
      else if (isDR) await fetchDR();
    })();
  }, [isGreen, isDR, isDRBid, isDRAccept, pageSize, currentPage]);

  useEffect(() => {
    if (DRData.length > 0) {
      const listDBData = [];
      for (let i = 0; i < DRData.length; i += 1)
        listDBData.push(DRData[i].data);
      setDRResult(listDBData);
      setMaxPage(DRData[0].max_page);
    }
  }, [DRData]);

  // add list data
  useEffect(() => {
    if (DRResult.length > 0) {
      const listDBData = [];
      for (let i = 0; i < DRResult.length; i += 1) {
        const startTime = dayjs(DRResult[i].start_time);
        const endTime = dayjs(DRResult[i].end_time);
        let rate = 0;
        if (DRResult[i].status === '已結算') rate = 1;
        let winsPrice = 0;
        if (DRResult[i].status === '已結算') winsPrice = DRResult[i].settlement;
        let winsValue = 0;
        if (
          DRResult[i].status === '已結算' ||
          DRResult[i].status === '結算中' ||
          DRResult[i].status === '執行中' ||
          DRResult[i].status === '已得標'
        )
          winsValue = DRResult[i].volume;
        const DBdata: IListInfo = {
          bid_type: DRResult[i].order_method,
          status: DRResult[i].status,
          date: startTime.format('YYYY-MM-DD'),
          time: `${startTime.format('HH:mm')}-${endTime.format('HH:mm')}`,
          bids: {
            price: DRResult[i].price,
            value: DRResult[i].volume,
          },
          counterpart: {
            address: DRResult[i].counterpart_address,
            name: DRResult[i].counterpart_name,
          },
          wins: {
            price: winsPrice,
            value: winsValue,
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
        let winsPrice = 0;
        if (DRResult[i].status === '已結算') winsPrice = DRResult[i].settlement;
        let winsValue = 0;
        if (
          DRResult[i].status === '已結算' ||
          DRResult[i].status === '結算中' ||
          DRResult[i].status === '執行中' ||
          DRResult[i].status === '已得標'
        )
          winsValue = DRResult[i].volume;
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
            price: winsPrice,
            value: winsValue,
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
        let rate = 0;
        if (DRResult[i].status === '已結算') rate = 1;
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
        setCurrentPage={setCurrentPage}
        setNowIndex={setNowIndex}
      />
      <div className={classnames('status-upContainer')}>
        <Percentage input={statusInfo} nowIndex={nowIndex} />
        <Train input={trainInfo} index={nowIndex} />
      </div>
      <List
        listInfo={listInfo}
        setNowIndex={setNowIndex}
        isDR={isDR}
        setPagesize={setPagesize}
        maxPage={maxPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        nowIndex={nowIndex}
      />
    </div>
  );
};

export default Status;
