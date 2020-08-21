import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

interface IData {
  address: string;
  data_type: string;
  date: string;
  id: string;
  power_display: number;
  time: string;
}

interface IApiData {
  data: IData[];
  page: string;
  totalCount: number;
}

interface IProps {
  date: Date;
}

const Table: React.FC<IProps> = ({ date }) => {
  // api parameters
  const correctDate = date.getTime() > new Date().getTime() ? new Date() : date;
  // eslint-disable-next-line @typescript-eslint/camelcase
  const per_page = 10;
  const page = 1;

  // style
  const redText = { color: '#d32f2f' };
  const greenText = { color: '#2e7d32' };

  // set api data
  const [apiData, setApiData] = useState<IApiData>({
    data: [],
    page: '0',
    totalCount: 0,
  });

  // fetch api data
  const fetchApiData = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );

    // GET to Power Info API
    const response = await fetch(
      `${
        process.env.REACT_APP_BACKEND_ENDPOINT
        // eslint-disable-next-line @typescript-eslint/camelcase
      }/power_info?per_page=${per_page}&page=${page}&time=${dayjs(
        correctDate,
      ).format('YYYY/MM/DD')}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
      },
    );

    // get response successfully or not
    if (response.status === 200) {
      const tmp = await response.json();
      setApiData(tmp);
    }
  };

  // return data type
  const dataType = (str: string) => {
    switch (str) {
      case 'Consume':
        return '正常用電';
      case 'NetLoad':
        return '總淨負載';
      case 'ESS':
        return '儲能系統';
      case 'EV':
        return '充電樁';
      case 'WT':
        return '風能';
      case 'PV':
        return '太陽能';
      default:
        return 'error';
    }
  };

  // create list
  const dataList = apiData.data.map((d) => {
    return (
      <div
        className={classNames('powerinfo-table-list-item-container', 'text')}
      >
        <div className={classNames('powerinfo-table-list-item-date')}>
          {d.date}
        </div>
        <div className={classNames('powerinfo-table-list-item-time')}>
          {d.time}
        </div>
        <div className={classNames('powerinfo-table-list-item-value')}>
          {d.power_display}
        </div>
        <div
          className={classNames('powerinfo-table-list-item-type')}
          style={d.power_display >= 0 ? redText : greenText}
        >
          {dataType(d.data_type)}
        </div>
        <div className={classNames('powerinfo-table-list-item-url')}>
          <a href={d.address}>URL</a>
        </div>
        <hr />
      </div>
    );
  });

  useEffect(() => {
    (async () => {
      await fetchApiData();
    })();
  }, [correctDate]);

  useEffect(() => {}, [apiData]);

  return (
    <div className={classNames('powerinfo-table-container')}>
      <div className={classNames('powerinfo-table-title-container', 'text')}>
        <div>日期</div>
        <div>紀錄時間</div>
        <div>電力(kW)</div>
        <div>用產電種類</div>
        <div>連結</div>
      </div>
      <div>{dataList}</div>
    </div>
  );
};

export default Table;
