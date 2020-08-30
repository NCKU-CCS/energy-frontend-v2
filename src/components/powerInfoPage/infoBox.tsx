import React, { useState } from 'react';
import classNames from 'classnames';

interface IProps {
  date: string;
  type: string;
  time: string;
  value: number;
  url: string;
}

const InfoBox: React.FC<IProps> = ({ date, type, time, value, url }) => {
  const [btnShow, setBtnShow] = useState(true);

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

  return (
    <div className={classNames('powerinfo-table-infobox-container')}>
      {btnShow ? (
        <button
          type="button"
          className={classNames('powerinfo-table-infobox-openbtn')}
          onClick={() => setBtnShow(false)}
        >
          查看
        </button>
      ) : (
        <div className={classNames('powerinfo-table-infobox-canvas')}>
          <div className={classNames('powerinfo-table-infobox-content')}>
            <button
              type="button"
              className={classNames('powerinfo-table-infobox-close')}
              onClick={() => setBtnShow(true)}
            >
              &times;
            </button>
            <div className={classNames('powerinfo-table-infobox-date')}>
              日期 :&nbsp;
              {date}
            </div>
            <div className={classNames('powerinfo-table-infobox-type')}>
              用產電種類 :&nbsp;
              <span
                style={value >= 0 ? { color: '#d32f2f' } : { color: '#2e7d32' }}
              >
                {dataType(type)}
              </span>
            </div>
            <div className={classNames('powerinfo-table-infobox-time')}>
              紀錄時間 :&nbsp;
              {time}
            </div>
            <div className={classNames('powerinfo-table-infobox-value')}>
              電力(kW) :&nbsp;
              {value}
            </div>
            <div className={classNames('powerinfo-table-infobox-url')}>
              連結 :&nbsp;
              <a href={url}>&#60;URL&#62;</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
