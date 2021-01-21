/* eslint-disable no-lonely-if */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { intervalArr } from '../../../constants/constant';

interface IProps {
  id: string;
  type: string;
  time: number;
  date: string;
  interval: string;
  volume: number;
  price: number;
  totalPrice: number;
}

const InfoBox: React.FC<IProps> = ({
  id,
  type,
  time,
  date,
  interval,
  volume,
  price,
  totalPrice,
}) => {
  // i18n
  const { t } = useTranslation();

  const [openInfoBox, setOpenInfoBox] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  // new Date
  const [newDate, setNewDate] = useState<string>(date);

  // new time for interval
  const [newTime, setNewTime] = useState<number>(time);

  // new volume
  const [newVolume, setNewVolume] = useState<number>(volume);

  // new price
  const [newPrice, setNewPrice] = useState<number>(price);

  // new total price
  const [newTotalPrice, setNewTotalPrice] = useState<number>(totalPrice);

  // map the interval array and return options
  const createOptions = intervalArr.map((str, i) => {
    return (
      <option value={i} selected={i === time}>
        {str}
      </option>
    );
  });

  // change total price
  useEffect(() => {
    setNewTotalPrice(parseFloat((newVolume * newPrice).toFixed(2)));
  }, [newVolume, newPrice]);

  // edit a bid using api
  const submitEditedBid = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // PUT to bidsubmit API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/bidsubmit`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id,
          bid_type: type,
          start_time: `${newDate} ${newTime}`,
          end_time: `${newDate} ${newTime + 1}`,
          value: newVolume,
          price: newPrice,
        }),
      },
    );
    // success or not
    if (response.status === 200) {
      // eslint-disable-next-line no-alert
      alert('success');
      // reload the window
      window.location.reload();
    } else {
      // eslint-disable-next-line no-alert
      alert('failed');
    }
  };

  // remove a bid using api
  const removeBid = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // DELETE to bidsubmit API
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/bidsubmit`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id,
        }),
      },
    );
    // success or not
    if (response.status === 200) {
      // eslint-disable-next-line no-alert
      alert('success');
      // reload the window
      window.location.reload();
    } else {
      // eslint-disable-next-line no-alert
      alert('failed');
    }
  };

  // handle click close
  const handleClickClose = () => {
    setOpenInfoBox(false);
    setEdit(false);
  };

  // handle click left button
  const handleClickLeft = () => {
    if (edit) {
      // editing
      submitEditedBid();
      // setEdit(false);
      // console.log('edit : ', edit);
    } else {
      // not editing
      setEdit(true);
      // console.log('edit : ', edit);
    }
  };

  // handle click right
  const handleClickRight = () => {
    if (edit) {
      // editing
      setEdit(false);
    } else {
      // not editing
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure to remove')) removeBid();
    }
  };

  return (
    <div className={classNames('green-submit-infobox-container-in')}>
      {!openInfoBox ? (
        <button
          type="button"
          className={classNames('green-submit-infobox-open-btn')}
          onClick={() => setOpenInfoBox(true)}
        >
          <img
            className={classNames('green-submit-infobox-open-btn-img')}
            alt="magnifier"
            src={`${process.env.PUBLIC_URL}/greenPage/magnifier-gray.png`}
          />
        </button>
      ) : (
        <div className={classNames('green-submit-infobox-canvas')}>
          <div className={classNames('green-submit-infobox-content')}>
            <div className={classNames('green-submit-infobox-content-header')}>
              <button
                type="button"
                className={classNames(
                  'green-submit-infobox-content-header-close',
                )}
                onClick={() => handleClickClose()}
              >
                X
              </button>
            </div>
            <div className={classNames('green-submit-infobox-content-center')}>
              <div
                className={classNames(
                  'green-submit-infobox-content-center-inside',
                )}
              >
                {!edit ? (
                  <div
                    className={classNames(
                      'green-submit-infobox-content-center-inside--show',
                    )}
                  >
                    <div
                      className={classNames(
                        'green-submit-infobox-content-center-inside-date--show',
                        'green-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>{t('greenpage.date')} :&nbsp;</span>
                      <span>{date}</span>
                    </div>
                    <div
                      className={classNames(
                        'green-submit-infobox-content-center-inside-interval--show',
                        'green-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>{t('greenpage.time')} :&nbsp;</span>
                      <span>{interval}</span>
                    </div>
                    <div
                      className={classNames(
                        'green-submit-infobox-content-center-inside-volume--show',
                        'green-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>{t('greenpage.volume')} :&nbsp;</span>
                      <span>{volume}kWh</span>
                    </div>
                    <div
                      className={classNames(
                        'green-submit-infobox-content-center-inside-price--show',
                        'green-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>{t('greenpage.price')} :&nbsp;</span>
                      <span>${price}/kWh</span>
                    </div>
                    <div
                      className={classNames(
                        'green-submit-infobox-content-center-inside-total--show',
                        'green-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>{t('greenpage.total')} :&nbsp;</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={classNames(
                      'green-submit-infobox-content-center-inside--edit',
                    )}
                  >
                    <div
                      className={classNames(
                        'green-submit-infobox-content-center-inside-label--edit',
                        'green-submit-infobox-content-center-inside-item--edit',
                      )}
                    >
                      {t('greenpage.date')} :
                    </div>
                    <input
                      type="date"
                      id="date"
                      className={classNames(
                        'green-submit-infobox-content-center-inside-date--edit',
                        'green-submit-infobox-content-center-inside-input--edit',
                      )}
                      defaultValue={dayjs(new Date(date))
                        .format('YYYY-MM-DD')
                        .toString()}
                      onChange={(e) =>
                        setNewDate(dayjs(e.target.value).format('YYYY/MM/DD'))
                      }
                    />
                    <div
                      className={classNames(
                        'green-submit-infobox-content-center-inside-label--edit',
                        'green-submit-infobox-content-center-inside-item--edit',
                      )}
                    >
                      {t('greenpage.time')} :
                    </div>
                    <select
                      className={classNames(
                        'green-submit-infobox-content-center-inside-interval--edit',
                        'green-submit-infobox-content-center-inside-input--edit',
                      )}
                      defaultValue={interval}
                      onChange={(e) => setNewTime(parseInt(e.target.value, 10))}
                    >
                      <option value={time}>{interval}</option>
                      {createOptions}
                    </select>
                    <div
                      className={classNames(
                        'green-submit-infobox-content-center-inside-label--edit',
                        'green-submit-infobox-content-center-inside-item--edit',
                      )}
                    >
                      {t('greenpage.volume')} :
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classNames(
                        'green-submit-infobox-content-center-inside-volume--edit',
                        'green-submit-infobox-content-center-inside-input--edit',
                      )}
                      defaultValue={volume}
                      onChange={(e) => setNewVolume(parseFloat(e.target.value))}
                    />
                    <div
                      className={classNames(
                        'green-submit-infobox-content-center-inside-label--edit',
                        'green-submit-infobox-content-center-inside-item--edit',
                      )}
                    >
                      {t('greenpage.price')} :
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classNames(
                        'green-submit-infobox-content-center-inside-price--edit',
                        'green-submit-infobox-content-center-inside-input--edit',
                      )}
                      defaultValue={price}
                      onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                    />
                    <div
                      className={classNames(
                        'green-submit-infobox-content-center-inside-label--edit',
                        'green-submit-infobox-content-center-inside-item--edit',
                      )}
                    >
                      {t('greenpage.total')} :
                    </div>
                    <input
                      type="number"
                      className={classNames(
                        'green-submit-infobox-content-center-inside-total--edit',
                        'green-submit-infobox-content-center-inside-input--edit',
                      )}
                      value={newTotalPrice}
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={classNames('green-submit-infobox-content-footer')}>
              <button
                type="button"
                className={classNames(
                  'green-submit-infobox-content-footer-left',
                )}
                onClick={() => handleClickLeft()}
              >
                <img
                  alt="left"
                  className={classNames(
                    'green-submit-infobox-content-footer-left-img',
                  )}
                  src={`${process.env.PUBLIC_URL}/greenPage/${
                    !edit ? 'edit' : 'check'
                  }-white.png`}
                />
                {!edit ? t('greenpage.edit') : t('greenpage.confirm')}
              </button>
              <button
                type="button"
                className={classNames(
                  'green-submit-infobox-content-footer-right',
                )}
                onClick={() => handleClickRight()}
              >
                <img
                  alt="right"
                  className={classNames(
                    'green-submit-infobox-content-footer-right-img',
                  )}
                  src={`${process.env.PUBLIC_URL}/greenPage/${
                    !edit ? 'trash' : 'cancel'
                  }-white.png`}
                />
                {!edit ? t('greenpage.delete') : t('greenpage.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
