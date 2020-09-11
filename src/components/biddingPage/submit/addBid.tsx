import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

interface IProps {
  type: string;
}

const AddBid: React.FC<IProps> = ({ type }) => {
  // date
  const [date, setDate] = useState<string>('null');

  // time
  const [time, setTime] = useState<number>(-1);

  // volume
  const [volume, setVolume] = useState<number>(-1);

  // price
  const [price, setPrice] = useState<number>(-1);

  // total price
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // set submit button disabled
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  // set reset button disabled
  // const [resetDisabled, setResetDisabled] = useState<boolean>(true);

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

  // add a bid using api
  const addBid = async () => {
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
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${user.bearer}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          bid_type: type,
          start_time: `${date} ${time}`,
          end_time: `${date} ${time + 1}`,
          value: volume,
          price,
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
    setSubmitDisabled(true);
  };

  // handle click reset btn
  const handleClickReset = () => {
    setDate('null');
    setTime(-1);
    setVolume(-1);
    setPrice(-1);
    setTotalPrice(0);
    setSubmitDisabled(true);
    // setResetDisabled(true);
  };

  useEffect(() => {
    if (volume !== -1 && price !== -1) setTotalPrice(volume * price);
    else setTotalPrice(0);
  }, [volume, price]);

  useEffect(() => {
    if (date !== 'null' && time !== -1 && volume !== -1 && price !== -1)
      setSubmitDisabled(false);
    // if (date !== 'null' || time !== -1 || volume !== -1 || price !== -1)
    //   setResetDisabled(false);
  }, [date, time, volume, price]);

  return (
    <div className={classNames('bidding-submit-addbid-container-in')}>
      <form className={classNames('bidding-submit-addbid-form')}>
        <input
          type="date"
          className={classNames('bidding-submit-addbid-form-date')}
          onChange={(e) => setDate(dayjs(e.target.value).format('YYYY/MM/DD'))}
          required
          // value="2020-09-21"
          // disabled
        />
        <select
          className={classNames('bidding-submit-addbid-form-select')}
          onChange={(e) => setTime(parseInt(e.target.value, 10))}
        >
          <option value="-1"> </option>
          {createOptions}
        </select>
        <input
          className={classNames('bidding-submit-addbid-form-volume')}
          type="number"
          min="0"
          onChange={(e) => setVolume(parseInt(e.target.value, 10))}
          required
        />
        <input
          className={classNames('bidding-submit-addbid-form-price')}
          type="number"
          min="0"
          onChange={(e) => setPrice(parseInt(e.target.value, 10))}
          required
        />
        <input
          className={classNames('bidding-submit-addbid-form-total')}
          type="number"
          min="0"
          value={totalPrice}
          disabled
        />
        <input
          className={classNames('bidding-submit-addbid-form-submit')}
          type="submit"
          value="&#10003;"
          title="Submit"
          onClick={() => addBid()}
          disabled={submitDisabled}
        />
        <input
          className={classNames('bidding-submit-addbid-form-reset')}
          type="reset"
          value="&#10005;"
          title="Reset"
          onClick={() => handleClickReset()}
        />
      </form>
    </div>
  );
};

export default AddBid;
