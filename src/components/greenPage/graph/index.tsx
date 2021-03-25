/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import BarChart from './barChart';

interface IData {
  bid_type: string;
  date: string;
  end_time: string;
  id: string;
  price: number;
  start_time: string;
  time: number;
  total_price: number;
  upload_time: string;
  volume: number;
}

interface IApiData {
  data: IData[];
  page: number;
  totalCount: number;
}

interface IProps {
  dataType: string;
}

const Graph: React.FC<IProps> = ({ dataType }) => {
  // api data
  const [apiData, setApiData] = useState<IApiData>({
    data: [],
    page: 0,
    totalCount: 0,
  });

  // display data
  const [displayData, setDisplayData] = useState<IData[]>([]);

  // fetch api data of buy
  const fetchApiData = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // GET to bidsubmit buy  API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/bidsubmit?per_page=1000&page=1&bid_type=${dataType}`,
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
      const tmp = await response.json();
      setApiData(tmp);
    } else {
      // fetch failure
      alert('failed');
    }
  };

  useEffect(() => {
    (async () => {
      await fetchApiData();
    })();
  }, []);

  // get data to display on chart
  useEffect(() => {
    const tmpArr: IData[] = [];
    const now = new Date();
    const validTime = now.getHours() + 1 === 24 ? 0 : now.getHours() + 1;
    const dateStr: string = `${now.getFullYear().toString()}/${(
      now.getMonth() + 1
    ).toString()}/${now.getDate().toString()}`;
    apiData.data.map((d) => {
      if (
        new Date(d.date).getTime() === new Date(dateStr).getTime() &&
        d.time === validTime &&
        validTime !== 0
      ) {
        tmpArr.push(d);
      }
      return null;
    });
    setDisplayData(tmpArr);
  }, [apiData]);

  return (
    <div className={classNames('green-graph-container')}>
      <BarChart
        dataType={dataType}
        data={displayData
          .map((d) => {
            return {
              price: d.price,
              volume: d.volume,
            };
          })
          .sort((a, b) => {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            return 0;
          })}
      />
    </div>
  );
};

export default Graph;
