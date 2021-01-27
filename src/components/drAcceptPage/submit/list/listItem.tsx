/* eslint-disable no-alert */
import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import dayjs from 'dayjs';
import InfoBox from '../infoBox';

interface IData {
  date: string;
  mode: number;
  total_volume: number;
  price: number;
  total_price: number;
  is_submitted: boolean;
}

interface IProps {
  date: string;
  data: IData;
}

const ListItem: React.FC<IProps> = ({ date, data }) => {
  // i18n
  const { t } = useTranslation();

  return (
    <div className={classNames('draccept-submit-listitem-container')}>
      <div className={classNames('draccept-submit-listitem-date')}>
        {dayjs(date).format('YYYY /MM/DD')}
      </div>
      <div className={classNames('draccept-submit-listitem-mode')}>
        {data.mode}
      </div>
      <div className={classNames('draccept-submit-listitem-volume')}>
        {data.total_volume.toFixed(1)}&thinsp;kWh
      </div>
      <div className={classNames('draccept-submit-listitem-price')}>
        $&thinsp;{data.price.toFixed(1)}&thinsp;/&thinsp;kWh
      </div>
      <div className={classNames('draccept-submit-listitem-total')}>
        $&thinsp;{data.total_price.toFixed(1)}
      </div>
      <div className={classNames('draccept-submit-listitem-button-container')}>
        <button
          className={classNames('draccept-submit-listitem-button-btn')}
          type="button"
          disabled={data.is_submitted}
          onClick={() => alert('success')}
        >
          {data.is_submitted ? t('drbidpage.accepted') : t('drbidpage.accept')}
        </button>
      </div>
      <div
        className={classNames(
          'draccept-submit-listitem-view-container-out--320',
        )}
      >
        <InfoBox date={date} data={data} />
      </div>
    </div>
  );
};

export default ListItem;
