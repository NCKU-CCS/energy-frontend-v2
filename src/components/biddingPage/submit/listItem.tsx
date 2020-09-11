import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

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

  // remove or not
  // const [remove, setRemove] = useState<boolean>(false);

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
    return <option value={i}>{str}</option>;
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
    } else {
      // eslint-disable-next-line no-alert
      alert('failed');
    }
  };

  // handle click edit
  const handleClickEdit = () => {
    setEdit(true);
    console.log(newVolume, newPrice, totalPrice);
  };

  // handle click remove
  const handleClickRemove = () => {
    // setRemove(!remove);
    removeBid();
  };

  // handle click submit
  const handleClickSubmit = () => {
    submitEditedBid();
    setEdit(false);
  };

  // handle click remove
  const handleClickCancel = () => {
    setEdit(false);
  };

  // change total price
  useEffect(() => {
    setNewTotalPrice(newVolume * newPrice);
  }, [newVolume, newPrice]);

  return !edit ? (
    <div className={classNames('bidding-submit-listitem-container--show')}>
      <div className={classNames('bidding-submit-listitem-date--show')}>
        {date}
      </div>
      <div className={classNames('bidding-submit-listitem-interval--show')}>
        {interval}
      </div>
      <div className={classNames('bidding-submit-listitem-volume--show')}>
        {volume}kWh
      </div>
      <div className={classNames('bidding-submit-listitem-price--show')}>
        ${price}/kWh
      </div>
      <div className={classNames('bidding-submit-listitem-total--show')}>
        ${totalPrice}
      </div>
      <div
        className={classNames('bidding-submit-listitem-button-container--show')}
      >
        <button
          type="button"
          title="edit"
          className={classNames('bidding-submit-listitem-edit--show')}
          onClick={() => handleClickEdit()}
        >
          e
        </button>
        <button
          type="button"
          title="remove"
          className={classNames('bidding-submit-listitem-remove--show')}
          onClick={() => handleClickRemove()}
        >
          r
        </button>
      </div>
    </div>
  ) : (
    <div className={classNames('bidding-submit-listitem-container--edit')}>
      <form>
        <input
          type="date"
          className={classNames('bidding-submit-listitem-date--edit')}
          defaultValue={dayjs(date).format('YYYY-MM-DD')}
          onChange={(e) =>
            setNewDate(dayjs(e.target.value).format('YYYY/MM/DD'))
          }
        />
        <select
          className={classNames('bidding-submit-listitem-interval--edit')}
          defaultValue={interval}
          onChange={(e) => setNewTime(parseInt(e.target.value, 10))}
        >
          <option value="-1"> </option>
          {createOptions}
        </select>
        <input
          type="number"
          min="0"
          className={classNames('bidding-submit-listitem-volume--edit')}
          defaultValue={volume}
          onChange={(e) => setNewVolume(parseInt(e.target.value, 10))}
        />
        <input
          type="number"
          min="0"
          className={classNames('bidding-submit-listitem-price--edit')}
          defaultValue={price}
          onChange={(e) => setNewPrice(parseInt(e.target.value, 10))}
        />
        <input
          type="number"
          min="0"
          className={classNames('bidding-submit-listitem-total--edit')}
          // defaultValue={totalPrice}
          value={newTotalPrice}
          disabled
        />
        <input
          type="submit"
          title="submit"
          value="&#10003;"
          className={classNames('bidding-submit-listitem-submit--edit')}
          onClick={() => handleClickSubmit()}
        />
        <button
          type="button"
          title="cancel"
          className={classNames('bidding-submit-listitem-cancel--edit')}
          onClick={() => handleClickCancel()}
        >
          &#10005;
        </button>
      </form>
    </div>
  );
};

export default ListItem;
