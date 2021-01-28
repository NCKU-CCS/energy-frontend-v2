/* eslint-disable no-alert */
import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import InfoBox from '../infoBox';

interface IData {
  date: string;
  mode: number;
  total_volume: number;
  price: number;
  total_price: number;
  is_submitted: boolean;
}

interface INewData {
  mode: number;
  aggregator?: string;
  executor?: string;
  interval: string;
  total_volume: number;
  price: number;
  total_price: number;
  is_accepted: boolean;
}

interface IProps {
  date: string;
  userType: string;
  data: IData;
  newData: INewData;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ListItem: React.FC<IProps> = ({ date, data, userType, newData }) => {
  // i18n
  const { t } = useTranslation();

  return (
    <div className={classNames('draccept-submit-listitem-container')}>
      <div className={classNames('draccept-submit-listitem-mode')}>
        {newData.mode}
      </div>
      <div className={classNames('draccept-submit-listitem-user')}>
        {userType === 'taipower' ? newData.aggregator : newData.executor}
      </div>
      <div className={classNames('draccept-submit-listitem-interval')}>
        15:00 - 16:00
      </div>
      <div className={classNames('draccept-submit-listitem-volume')}>
        {newData.total_volume.toFixed(1)}&thinsp;kWh
      </div>
      <div className={classNames('draccept-submit-listitem-price')}>
        $&thinsp;{newData.price.toFixed(1)}&thinsp;/&thinsp;kWh
      </div>
      <div className={classNames('draccept-submit-listitem-total')}>
        $&thinsp;{newData.total_price.toFixed(1)}
      </div>
      <div className={classNames('draccept-submit-listitem-button-container')}>
        <button
          className={classNames('draccept-submit-listitem-button-btn')}
          type="button"
          disabled={newData.is_accepted}
          onClick={() => alert('success')}
        >
          {newData.is_accepted
            ? t('dracceptpage.accepted')
            : t('dracceptpage.accept')}
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
