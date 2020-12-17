import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
  date: string;
  type: string;
  time: string;
  value: number;
  url: string;
}

const InfoBox: React.FC<IProps> = ({ date, type, time, value, url }) => {
  // i18n
  const { t } = useTranslation();

  const [infoBoxShow, setInfoBoxShow] = useState(false);

  const dataType = (str: string) => {
    switch (str) {
      case 'Consume':
        return t('powerinfopage.normalConsume');
      case 'NetLoad':
        return t('powerinfopage.netLoad');
      case 'ESS':
        return t('powerinfopage.ESS');
      case 'EV':
        return t('powerinfopage.EV');
      case 'WT':
        return t('powerinfopage.WT');
      case 'PV':
        return t('powerinfopage.PV');
      default:
        return 'error';
    }
  };

  return (
    <div className={classNames('powerinfo-table-infobox-container')}>
      <button
        type="button"
        className={classNames('powerinfo-table-infobox-openbtn')}
        onClick={() => setInfoBoxShow(true)}
      >
        {t('powerinfopage.view')}
      </button>
      {infoBoxShow && (
        <div className={classNames('powerinfo-table-infobox-canvas')}>
          <div className={classNames('powerinfo-table-infobox-content')}>
            <button
              type="button"
              className={classNames('powerinfo-table-infobox-close')}
              onClick={() => setInfoBoxShow(false)}
            >
              &times;
            </button>
            <div className={classNames('powerinfo-table-infobox-date')}>
              {t('powerinfopage.date')} :&nbsp;
              {date}
            </div>
            <div className={classNames('powerinfo-table-infobox-type')}>
              {t('powerinfopage.useType')} :&nbsp;
              <span
                style={value >= 0 ? { color: '#d32f2f' } : { color: '#2e7d32' }}
              >
                {dataType(type)}
              </span>
            </div>
            <div className={classNames('powerinfo-table-infobox-time')}>
              {t('powerinfopage.recordTime')} :&nbsp;
              {time}
            </div>
            <div className={classNames('powerinfo-table-infobox-value')}>
              {t('powerinfopage.electricity')}(kW) :&nbsp;
              {value}
            </div>
            <div className={classNames('powerinfo-table-infobox-url')}>
              {t('powerinfopage.link')} :&nbsp;
              <a href={url}>&#60;URL&#62;</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
