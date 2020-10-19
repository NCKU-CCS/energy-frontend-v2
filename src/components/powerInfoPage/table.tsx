import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import InfoBox from './infoBox';

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
  const [per_page, setPerPage] = useState('5');
  const [page, setPage] = useState(1);

  // set buttons disabled
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  // set text for RWD
  const [timeText, setTimeText] = useState('紀錄時間');
  const [typeText, setTypeText] = useState('用產電種類');

  // text color for positive and negative data
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
      <div>
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
            <a href={d.address}>&#60;URL&#62;</a>
          </div>
          <div className={classNames('powerinfo-table-list-item-infobox')}>
            <InfoBox
              date={d.date}
              type={d.data_type}
              time={d.time}
              value={d.power_display}
              url={d.address}
            />
          </div>
        </div>
        <hr className={classNames('powerinfo-table-list-item-line')} />
      </div>
    );
  });

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setPerPage(event.target.value);
  };

  const clickFirstPageHandler = () => {
    setPage(1);
  };

  const clickPrevPageHandler = () => {
    if (page > 1) setPage(page - 1);
    else setPage(1);
  };

  const clickNextPageHandler = () => {
    const lastPage =
      apiData.totalCount % parseInt(per_page, 10) === 0
        ? apiData.totalCount / parseInt(per_page, 10)
        : Math.floor(apiData.totalCount / parseInt(per_page, 10)) + 1;
    if (page < lastPage) setPage(page + 1);
    else setPage(lastPage);
  };

  const clickLastPageHandler = () => {
    const lastPage =
      apiData.totalCount % parseInt(per_page, 10) === 0
        ? apiData.totalCount / parseInt(per_page, 10)
        : Math.floor(apiData.totalCount / parseInt(per_page, 10)) + 1;
    setPage(lastPage);
  };

  useEffect(() => {
    const lastPage =
      apiData.totalCount % parseInt(per_page, 10) === 0
        ? apiData.totalCount / parseInt(per_page, 10)
        : Math.floor(apiData.totalCount / parseInt(per_page, 10)) + 1;
    if (page === 1 && lastPage === 1) {
      setPrevDisabled(true);
      setNextDisabled(true);
    } else if (page === 1) {
      setPrevDisabled(true);
      setNextDisabled(false);
    } else if (page === lastPage) {
      setPrevDisabled(false);
      setNextDisabled(true);
    } else {
      setPrevDisabled(false);
      setNextDisabled(false);
    }
  }, [page]);

  useEffect(() => {
    (async () => {
      await fetchApiData();
    })();
    // eslint-disable-next-line @typescript-eslint/camelcase
  }, [correctDate, per_page, page]);

  useEffect(() => {
    const changeText = () => {
      if (window.innerWidth <= 320) {
        setTimeText('時間');
        setTypeText('種類');
      } else {
        setTimeText('紀錄時間');
        setTypeText('用產電種類');
      }
    };
    window.addEventListener('resize', changeText);
    return () => {
      window.removeEventListener('resize', changeText);
    };
  });

  return (
    <div className={classNames('powerinfo-table-container')}>
      <div className={classNames('powerinfo-table-title-container', 'text')}>
        <div className={classNames('powerinfo-table-title-date')}>日期</div>
        <div className={classNames('powerinfo-table-title-time')}>
          {timeText}
        </div>
        <div className={classNames('powerinfo-table-title-value')}>
          電力(kW)
        </div>
        <div className={classNames('powerinfo-table-title-type')}>
          {typeText}
        </div>
        <div className={classNames('powerinfo-table-title-url')}>連結</div>
      </div>
      <div>{dataList}</div>
      <div
        className={classNames('powerinfo-table-pagecontrol-container', 'text')}
      >
        <select
          className={classNames('powerinfo-table-pagecontrol-row')}
          onChange={(e) => selectChangeHandler(e)}
        >
          <option value="5">5 rows</option>
          <option value="10">10 rows</option>
          <option value="20">20 rows</option>
        </select>
        <button
          className={classNames(
            'powerinfo-table-pagecontrol-btn-first',
            'powerinfo-table-pagecontrol-btn',
          )}
          title="First Page"
          type="button"
          onClick={() => clickFirstPageHandler()}
          disabled={prevDisabled}
        >
          &Iota;&#60;
        </button>
        <button
          className={classNames(
            'powerinfo-table-pagecontrol-btn-prev',
            'powerinfo-table-pagecontrol-btn',
          )}
          title="Previous Page"
          type="button"
          onClick={() => clickPrevPageHandler()}
          disabled={prevDisabled}
        >
          &#60;
        </button>
        <div className={classNames('powerinfo-table-pagecontrol-text')}>
          {page} /{' '}
          {apiData.totalCount % parseInt(per_page, 10) === 0
            ? apiData.totalCount / parseInt(per_page, 10)
            : Math.floor(apiData.totalCount / parseInt(per_page, 10)) + 1}
        </div>
        <button
          className={classNames(
            'powerinfo-table-pagecontrol-btn-next',
            'powerinfo-table-pagecontrol-btn',
          )}
          title="Next Page"
          type="button"
          onClick={() => clickNextPageHandler()}
          disabled={nextDisabled}
        >
          &#62;
        </button>
        <button
          className={classNames(
            'powerinfo-table-pagecontrol-btn-last',
            'powerinfo-table-pagecontrol-btn',
          )}
          title="Last Page"
          type="button"
          onClick={() => clickLastPageHandler()}
          disabled={nextDisabled}
        >
          &#62;&Iota;
        </button>
      </div>
    </div>
  );
};

export default Table;
