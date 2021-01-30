/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import InfoBox from '../infoBox';
import { hrArr } from '../../../../constants/constant';

interface IData {
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
  userType: string;
  data: IData;
}

const ListItem: React.FC<IProps> = ({ userType, data }) => {
  // i18n
  const { t } = useTranslation();

  // input interval mode
  const [inputMode, setInputMode] = useState<boolean>(false);

  // start hour
  const [startHr, setStartHr] = useState<number>(0);

  // end hour
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [endHr, setEndHr] = useState<number>(0);

  // create <select> start hour options
  const startHrOptions = hrArr.slice(0, 23).map((hr) => {
    return <option value={hr}>{hr}</option>;
  });

  // create <select> end hour options
  const endHrOptions = hrArr.slice(startHr + 1).map((hr) => {
    return <option value={hr}>{hr}</option>;
  });

  // handle click button
  const handleClickBtn = () => {
    if (inputMode) {
      setInputMode(false);
      alert('success');
      window.location.reload();
    } else setInputMode(true);
  };

  // determine end hour when start hour changes
  useEffect(() => setEndHr(startHr + 1), [startHr]);

  return (
    <div className={classNames('draccept-submit-listitem-container')}>
      <div className={classNames('draccept-submit-listitem-mode')}>
        {data.mode}
      </div>
      <div className={classNames('draccept-submit-listitem-user')}>
        {userType === 'taipower' ? data.aggregator : data.executor}
      </div>
      <div className={classNames('draccept-submit-listitem-interval')}>
        {!inputMode ? (
          data.is_accepted ? (
            data.interval
          ) : (
            '未決標'
          )
        ) : (
          <div>
            <select onChange={(e) => setStartHr(parseInt(e.target.value, 10))}>
              {startHrOptions}
            </select>
            {' - '}
            <select onChange={(e) => setEndHr(parseInt(e.target.value, 10))}>
              {endHrOptions}
            </select>
          </div>
        )}
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
          className={classNames(
            'draccept-submit-listitem-button-btn',
            `${inputMode && 'draccept-submit-listitem-button-btn--accept'}`,
          )}
          type="button"
          disabled={data.is_accepted}
          onClick={() => handleClickBtn()}
        >
          {data.is_accepted
            ? userType === 'taipower'
              ? t('dracceptpage.announced')
              : t('dracceptpage.bidAccepted')
            : userType === 'taipower'
            ? inputMode
              ? t('dracceptpage.confirm')
              : t('dracceptpage.accept')
            : inputMode
            ? t('dracceptpage.confirm')
            : t('dracceptpage.acceptBid')}
        </button>
      </div>
      <div
        className={classNames(
          'draccept-submit-listitem-view-container-out--320',
        )}
      >
        <InfoBox userType={userType} data={data} />
      </div>
    </div>
  );
};

export default ListItem;
