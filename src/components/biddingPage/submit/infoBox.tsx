/* eslint-disable no-lonely-if */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

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

  // create an array from '0:00 - 1:00' to '23:00 - 24:00'
  const intervalArr: string[] = [
    '0:00 - 1:00',
    '1:00 - 2:00',
    '2:00 - 3:00',
    '3:00 - 4:00',
    '4:00 - 5:00',
    '5:00 - 6:00',
    '6:00 - 7:00',
    '7:00 - 8:00',
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00',
    '21:00 - 22:00',
    '22:00 - 23:00',
    '23:00 - 24:00',
  ];

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
    <div className={classNames('bidding-submit-infobox-container-in')}>
      {!openInfoBox ? (
        <button
          type="button"
          className={classNames('bidding-submit-infobox-open-btn')}
          onClick={() => setOpenInfoBox(true)}
        >
          <img
            className={classNames('bidding-submit-infobox-open-btn-img')}
            alt="magnifier"
            src={`${process.env.PUBLIC_URL}/biddingPage/magnifier-gray.png`}
          />
        </button>
      ) : (
        <div className={classNames('bidding-submit-infobox-canvas')}>
          <div className={classNames('bidding-submit-infobox-content')}>
            <div
              className={classNames('bidding-submit-infobox-content-header')}
            >
              <button
                type="button"
                className={classNames(
                  'bidding-submit-infobox-content-header-close',
                )}
                onClick={() => setOpenInfoBox(false)}
              >
                X
              </button>
            </div>
            <div
              className={classNames('bidding-submit-infobox-content-center')}
            >
              <div
                className={classNames(
                  'bidding-submit-infobox-content-center-inside',
                )}
              >
                {!edit ? (
                  <div
                    className={classNames(
                      'bidding-submit-infobox-content-center-inside--show',
                    )}
                  >
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-date--show',
                        'bidding-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>日期 :&nbsp;</span>
                      <span>{date}</span>
                    </div>
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-interval--show',
                        'bidding-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>時段 :&nbsp;</span>
                      <span>{interval}</span>
                    </div>
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-volume--show',
                        'bidding-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>度數 :&nbsp;</span>
                      <span>{volume}kWh</span>
                    </div>
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-price--show',
                        'bidding-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>單價 :&nbsp;</span>
                      <span>${price}/kWh</span>
                    </div>
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-total--show',
                        'bidding-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>總金額 :&nbsp;</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={classNames(
                      'bidding-submit-infobox-content-center-inside--edit',
                    )}
                  >
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-label--edit',
                        'bidding-submit-infobox-content-center-inside-item--edit',
                      )}
                    >
                      日期 :
                    </div>
                    <input
                      type="date"
                      id="date"
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-date--edit',
                        'bidding-submit-infobox-content-center-inside-input--edit',
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
                        'bidding-submit-infobox-content-center-inside-label--edit',
                        'bidding-submit-infobox-content-center-inside-item--edit',
                      )}
                    >
                      時段 :
                    </div>
                    <select
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-interval--edit',
                        'bidding-submit-infobox-content-center-inside-input--edit',
                      )}
                      defaultValue={interval}
                      onChange={(e) => setNewTime(parseInt(e.target.value, 10))}
                    >
                      <option value={time}>{interval}</option>
                      {createOptions}
                    </select>
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-label--edit',
                        'bidding-submit-infobox-content-center-inside-item--edit',
                      )}
                    >
                      度數 :
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-volume--edit',
                        'bidding-submit-infobox-content-center-inside-input--edit',
                      )}
                      defaultValue={volume}
                      onChange={(e) => setNewVolume(parseFloat(e.target.value))}
                    />
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-label--edit',
                        'bidding-submit-infobox-content-center-inside-item--edit',
                      )}
                    >
                      單價 :
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-price--edit',
                        'bidding-submit-infobox-content-center-inside-input--edit',
                      )}
                      defaultValue={price}
                      onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                    />
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-label--edit',
                        'bidding-submit-infobox-content-center-inside-item--edit',
                      )}
                    >
                      總金額 :
                    </div>
                    <input
                      type="number"
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-total--edit',
                        'bidding-submit-infobox-content-center-inside-input--edit',
                      )}
                      value={newTotalPrice}
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>
            <div
              className={classNames('bidding-submit-infobox-content-footer')}
            >
              <button
                type="button"
                className={classNames(
                  'bidding-submit-infobox-content-footer-left',
                )}
                onClick={() => handleClickLeft()}
              >
                <img
                  alt="left"
                  className={classNames(
                    'bidding-submit-infobox-content-footer-left-img',
                  )}
                  src={`${process.env.PUBLIC_URL}/biddingPage/${
                    !edit ? 'edit' : 'check'
                  }-white.png`}
                />
                {!edit ? '編輯' : '確認'}
              </button>
              <button
                type="button"
                className={classNames(
                  'bidding-submit-infobox-content-footer-right',
                )}
                onClick={() => handleClickRight()}
              >
                <img
                  alt="right"
                  className={classNames(
                    'bidding-submit-infobox-content-footer-right-img',
                  )}
                  src={`${process.env.PUBLIC_URL}/biddingPage/${
                    !edit ? 'trash' : 'cancel'
                  }-white.png`}
                />
                {!edit ? '移除' : '取消'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;