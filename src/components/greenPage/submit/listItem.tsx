/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import InfoBox from './infoBox';
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

const ListItem: React.FC<IProps> = ({
  id,
  type,
  time,
  date,
  interval,
  volume,
  price,
  totalPrice,
}) => {
  // edit or not
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

  // pencil image
  const [pencilImg, setPencilImg] = useState<string>('pencil-gray.png');

  // trash image
  const [trashImg, setTrashImg] = useState<string>('trash-gray.png');

  // check image
  const [checkImg, setCheckImg] = useState<string>('check-gray.png');

  // cancel image
  const [cancelImg, setCancelImg] = useState<string>('cancel-gray.png');

  // map the interval array and return options
  const createOptions = intervalArr.map((str, i) => {
    return (
      <option value={i} selected={i === time}>
        {str}
      </option>
    );
  });

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

  // handle click edit
  const handleClickEdit = () => {
    setEdit(true);
    setNewPrice(price);
    setNewVolume(volume);
  };

  // handle click remove
  const handleClickRemove = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure to remove')) removeBid();
  };

  // handle click submit
  const handleClickSubmit = () => {
    submitEditedBid();
    setEdit(false);
  };

  // handle click remove
  const handleClickCancel = () => {
    setEdit(false);
    // if don't do this, it'll become orange
    setPencilImg('pencil-gray.png');
  };

  // insert spaces to date string for RWD
  const insertSpaces = (str: string) => {
    return `${str.substring(0, 4)} /${str.substring(5, 7)}/${str.substring(
      8,
      10,
    )}`;
  };

  // change total price
  useEffect(() => {
    setNewTotalPrice(parseFloat((newVolume * newPrice).toFixed(2)));
    // alert('setting');
  }, [newVolume, newPrice]);

  // while changing bid type, reset edit to false
  useEffect(() => {
    setEdit(false);
    // if don't do this, it'll become orange
    setPencilImg('pencil-gray.png');
  }, [type]);

  return !edit ? (
    <div className={classNames('green-submit-listitem-container--show')}>
      <div className={classNames('green-submit-listitem-date--show')}>
        {insertSpaces(date)}
      </div>
      <div className={classNames('green-submit-listitem-interval--show')}>
        {interval}
      </div>
      <div className={classNames('green-submit-listitem-volume--show')}>
        {volume}&thinsp;kWh
      </div>
      <div className={classNames('green-submit-listitem-price--show')}>
        $&thinsp;{price}&thinsp;/&thinsp;kWh
      </div>
      <div className={classNames('green-submit-listitem-total--show')}>
        $&thinsp;{totalPrice.toFixed(1)}
      </div>
      <div
        className={classNames('green-submit-listitem-button-container--show')}
      >
        <button
          type="button"
          title="edit"
          className={classNames('green-submit-listitem-edit--show')}
          onClick={() => handleClickEdit()}
          onMouseOver={() => setPencilImg('pencil-orange.png')}
          onMouseOut={() => setPencilImg('pencil-gray.png')}
          onFocus={() => 0}
          onBlur={() => 0}
        >
          <img
            className={classNames('green-submit-listitem-edit-img--show')}
            alt="pencil"
            src={`${process.env.PUBLIC_URL}/greenPage/${pencilImg}`}
          />
        </button>
        <button
          type="button"
          title="remove"
          className={classNames('green-submit-listitem-remove--show')}
          onClick={() => handleClickRemove()}
          onMouseOver={() => setTrashImg('trash-red.png')}
          onMouseOut={() => setTrashImg('trash-gray.png')}
          onFocus={() => 0}
          onBlur={() => 0}
        >
          <img
            className={classNames('green-submit-listitem-remove-img--show')}
            alt="trash"
            src={`${process.env.PUBLIC_URL}/greenPage/${trashImg}`}
          />
        </button>
      </div>
      <div
        className={classNames('green-submit-listitem-view-container-out--320')}
      >
        <InfoBox
          id={id}
          type={type}
          time={time}
          date={date}
          interval={interval}
          volume={volume}
          price={price}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  ) : (
    <div className={classNames('green-submit-listitem-container--edit')}>
      <div className={classNames('green-submit-listitem-date--edit')}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={newDate}
            onChange={(d) =>
              setNewDate(dayjs(String(d?.toDateString())).format('YYYY/MM/DD'))
            }
            format="yyyy/MM/dd"
            // label="Choose Data Date"
            showTodayButton
            disablePast
            allowKeyboardControl
          />
        </MuiPickersUtilsProvider>
      </div>
      <select
        className={classNames('green-submit-listitem-interval--edit')}
        defaultValue={interval}
        onChange={(e) => setNewTime(parseInt(e.target.value, 10))}
      >
        <option value={time}>{interval}</option>
        {createOptions}
      </select>
      <input
        type="number"
        min="0"
        step="0.1"
        className={classNames('green-submit-listitem-volume--edit')}
        defaultValue={volume}
        onChange={(e) => setNewVolume(parseFloat(e.target.value))}
      />
      <input
        type="number"
        min="0"
        step="0.1"
        className={classNames('green-submit-listitem-price--edit')}
        defaultValue={price}
        onChange={(e) => setNewPrice(parseFloat(e.target.value))}
      />
      <input
        type="number"
        min="0"
        className={classNames('green-submit-listitem-total--edit')}
        value={newTotalPrice}
        disabled
      />
      <div
        className={classNames('green-submit-listitem-button-container--edit')}
      >
        <button
          type="button"
          title="submit"
          className={classNames('green-submit-listitem-submit--edit')}
          onClick={() => handleClickSubmit()}
          onMouseOver={() => setCheckImg('check-green.png')}
          onMouseOut={() => setCheckImg('check-gray.png')}
          onFocus={() => 0}
          onBlur={() => 0}
        >
          <img
            alt="submit"
            className={classNames('green-submit-listitem-submit-img--edit')}
            src={`${process.env.PUBLIC_URL}/greenPage/${checkImg}`}
          />
        </button>
        <button
          type="button"
          title="cancel"
          className={classNames('green-submit-listitem-cancel--edit')}
          onClick={() => handleClickCancel()}
          onMouseOver={() => setCancelImg('cancel-red.png')}
          onMouseOut={() => setCancelImg('cancel-gray.png')}
          onFocus={() => 0}
          onBlur={() => 0}
        >
          <img
            alt="cancel"
            className={classNames('green-submit-listitem-cancel-img--edit')}
            src={`${process.env.PUBLIC_URL}/greenPage/${cancelImg}`}
          />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
