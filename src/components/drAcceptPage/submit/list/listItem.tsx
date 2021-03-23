/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import dayjs from 'dayjs';
import InfoBox from '../infoBox';
import { hrArr } from '../../../../constants/constant';

interface IData {
  uuid: string;
  executor: string;
  acceptor: string;
  startTime: string;
  endTime: string;
  mode: number;
  volume: number;
  price: number;
  status: string;
  result: boolean;
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

  // get user from local storage or session storage
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  // get interval
  const getInterval = () => {
    const startHour = dayjs(data.startTime).get('hour');
    const endHour = dayjs(data.endTime).get('hour');
    return `${startHour}:00 - ${endHour ? `${endHour}:00` : 'null'}`;
  };

  // create <select> start hour options
  const startHrOptions = hrArr.slice(0, 23).map((hr) => {
    return <option value={hr}>{hr}</option>;
  });

  // create <select> end hour options
  const endHrOptions = hrArr.slice(startHr + 1).map((hr) => {
    return <option value={hr}>{hr}</option>;
  });

  // insert space to string for RWD
  const insertSpace = (str: string) => {
    let result = '';
    for (let i = 0; i < str.length; i += 1) {
      if (str[i] === str[i].toUpperCase()) {
        result += ` ${str[i]}`;
      } else result += str[i];
    }
    return result;
  };

  // handle click button
  const handleClickBtn = async () => {
    if (inputMode) {
      setInputMode(false);
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
            start_time: dayjs(data.startTime)
              .set('hour', startHr)
              .format('YYYY-MM-DD H:00:00'),
            end_time: dayjs(data.endTime)
              .set('hour', endHr)
              .format('YYYY-MM-DD H:00:00'),
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
        {insertSpace(data.executor)}
        {/* {data.executor} */}
      </div>
      <div className={classNames('draccept-submit-listitem-interval')}>
        {!inputMode ? (
          getInterval()
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
        {data.volume.toFixed(1)}&thinsp;kWh
      </div>
      <div className={classNames('draccept-submit-listitem-price')}>
        $&thinsp;{data.price.toFixed(1)}&thinsp;/&thinsp;kWh
      </div>
      <div className={classNames('draccept-submit-listitem-total')}>
        $&thinsp;{(data.price * data.volume).toFixed(1)}
      </div>
      <div className={classNames('draccept-submit-listitem-button-container')}>
        <button
          className={classNames(
            'draccept-submit-listitem-button-btn',
            `${inputMode && 'draccept-submit-listitem-button-btn--accept'}`,
          )}
          type="button"
          disabled={data.result}
          onClick={() => handleClickBtn()}
        >
          {data.result
            ? userType === 'tpc'
              ? t('dracceptpage.announced')
              : t('dracceptpage.bidAccepted')
            : userType === 'tpc'
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
