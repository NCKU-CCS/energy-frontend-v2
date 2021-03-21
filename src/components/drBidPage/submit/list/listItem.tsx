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
  status: string;
}

interface IProps {
  date: string;
  data: IData;
}

const ListItem: React.FC<IProps> = ({ date, data }) => {
  // i18n
  const { t } = useTranslation();

  // get user from local storage or session storage
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  // get interval
  const getInterval = () => {
    const startHr = dayjs(data.startTime).get('hour');
    const endHr = dayjs(data.endTime).get('hour');
    return `${startHr}:00 - ${endHr ? `${endHr}:00` : 'null'}`;
  };

  // patch api
  const patch = async () => {
    alert('patch');
    // PATCH DR_bid
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/DR_bid`,
      {
        method: 'PATCH',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          uuid: data.uuid,
        }),
      },
    );

    // response
    if (response.status === 200) {
      alert('success');
      window.location.reload();
    } else {
      alert('failed');
    }
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
          disabled={data.status === '已投標'}
          onClick={() => patch()}
        >
          {data.status === '已投標'
            ? t('drbidpage.reported')
            : t('drbidpage.report')}
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
