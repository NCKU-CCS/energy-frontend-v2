/* eslint-disable no-alert */
import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import dayjs from 'dayjs';
import InfoBox from '../infoBox';

interface IData {
  uuid: string;
  startTime: string;
  endTime: string;
  mode: number;
  volume: number;
  price: number;
  result: boolean;
}

interface IProps {
  date: string;
  data: IData;
}

const ListItem: React.FC<IProps> = ({ date, data }) => {
  // i18n
  const { t } = useTranslation();

  // get interval
  const getInterval = () => {
    const startHr = dayjs(data.startTime).get('hour');
    const endHr = dayjs(data.endTime).get('hour');
    return `${startHr}:00 - ${endHr ? `${endHr}:00` : 'null'}`;
  };

  return (
    <div className={classNames('drbid-submit-listitem-container')}>
      <div className={classNames('drbid-submit-listitem-date')}>
        {dayjs(date).format('YYYY /MM/DD')}
      </div>
      <div className={classNames('drbid-submit-listitem-interval')}>
        {getInterval()}
      </div>
      <div className={classNames('drbid-submit-listitem-mode')}>
        {data.mode}
      </div>
      <div className={classNames('drbid-submit-listitem-volume')}>
        {data.volume.toFixed(1)}&thinsp;kWh
      </div>
      <div className={classNames('drbid-submit-listitem-price')}>
        $&thinsp;{data.price.toFixed(1)}&thinsp;/&thinsp;kWh
      </div>
      <div className={classNames('drbid-submit-listitem-total')}>
        $&thinsp;{data.price.toFixed(1)}
      </div>
      <div className={classNames('drbid-submit-listitem-button-container')}>
        <button
          className={classNames('drbid-submit-listitem-button-btn')}
          type="button"
          disabled={data.result}
          onClick={() => alert('success')}
        >
          {data.result ? t('drbidpage.reported') : t('drbidpage.report')}
        </button>
      </div>
      <div
        className={classNames('drbid-submit-listitem-view-container-out--320')}
      >
        <InfoBox date={date} data={data} />
      </div>
    </div>
  );
};

export default ListItem;
