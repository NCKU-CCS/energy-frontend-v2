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
  const [volume, setVolume] = useState<number>(0);

  // price
  const [price, setPrice] = useState<number>(0);

  // total price
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // set submit button disabled
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  // click reset btn or not
  const [reset, setReset] = useState<boolean>(true);

  // images
  const [checkImg, setCheckImg] = useState<string>('check-gray');
  const [resetImg, setResetImg] = useState<string>('cancel-gray');

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
    // alert(`${type}, ${date}, ${time}, ${volume}, ${price}, ${user.bearer}`);
    // POST to bidsubmit API
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/bidsubmit`,
        {
          method: 'POST',
          // mode: 'cors',
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
          // redirect: 'follow',
        },
      );
      // success or not
      if (response.status === 200) {
        // eslint-disable-next-line no-alert
        alert('success');
        // reload the page
        window.location.reload();
      } else {
        // eslint-disable-next-line no-alert
        alert('failed');
      }
      setSubmitDisabled(true);
    } catch (error) {
      // console.error(`catch" ${error.toString()}`);
      // console.log(JSON.stringify({
      //   bid_type: type,
      //   start_time: `${date} ${time}`,
      //   end_time: `${date} ${time + 1}`,
      //   value: volume,
      //   price,
      // }));
      // console.log(new Headers({
      //   // Authorization: `Bearer ${user.bearer}`,
      //   'Content-Type': 'application/json',
      // }));
      // eslint-disable-next-line no-alert
      alert('err');
    }
  };

  // handle click reset btn
  const handleClickReset = () => {
    // clear data
    setDate('null');
    setTime(-1);
    setVolume(0);
    setPrice(0);
    setTotalPrice(0);
    setSubmitDisabled(true);

    // clear input field
    setReset(true);
    // setResetDisabled(true);
  };

  useEffect(() => {
    if (volume !== 0 && price !== 0)
      setTotalPrice(parseFloat((volume * price).toFixed(2)));
    else setTotalPrice(0);
  }, [volume, price]);

  useEffect(() => {
    if (date !== 'null' && time !== -1 && volume !== 0 && price !== 0)
      setSubmitDisabled(false);
    if (date !== 'null' || time !== -1 || volume !== 0 || price !== 0)
      setReset(false);
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
          value={
            reset ? '' : dayjs(new Date(date)).format('YYYY-MM-DD').toString()
          }
          required
          // value="2020-09-21"
          // disabled
        />
        <select
          className={classNames('bidding-submit-addbid-form-select')}
          onChange={(e) => setTime(parseInt(e.target.value, 10))}
        >
          <option value="-1" selected={reset}>
            {' '}
          </option>
          {createOptions}
        </select>
        <input
          className={classNames('bidding-submit-addbid-form-volume')}
          type="number"
          min="0"
          step="0.1"
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          value={reset ? '' : volume}
          required
        />
        <input
          className={classNames('bidding-submit-addbid-form-price')}
          type="number"
          min="0"
          step="0.1"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          value={reset ? '' : price}
          required
        />
        <input
          className={classNames('bidding-submit-addbid-form-total')}
          type="number"
          min="0"
          value={reset ? '' : totalPrice}
          disabled
        />
        {/* <input
          className={classNames('bidding-submit-addbid-form-submit')}
          type="button"
          value="&#10003;"
          title="Submit"
          onClick={() => addBid()}
          disabled={submitDisabled}
        /> */}
        <button
          type="button"
          className={classNames('bidding-submit-addbid-form-submit')}
          title="Submit"
          onClick={() => addBid()}
          onMouseOver={() => setCheckImg('check-green')}
          onMouseOut={() => setCheckImg('check-gray')}
          onFocus={() => 0}
          onBlur={() => 0}
          disabled={submitDisabled}
        >
          <img
            alt="submit"
            className={classNames('bidding-submit-addbid-form-submit-img')}
            src={`${process.env.PUBLIC_URL}/biddingPage/${checkImg}.png`}
          />
        </button>
        {/* <input
          className={classNames('bidding-submit-addbid-form-reset')}
          type="reset"
          value="&#10005;"
          title="Reset"
          onClick={() => handleClickReset()}
        /> */}
        <button
          type="button"
          title="reset"
          className={classNames('bidding-submit-addbid-form-reset')}
          onClick={() => handleClickReset()}
          onMouseOver={() => setResetImg('cancel-red')}
          onMouseOut={() => setResetImg('cancel-gray')}
          onFocus={() => 0}
          onBlur={() => 0}
        >
          <img
            alt="reset"
            className={classNames('bidding-submit-addbid-form-reset-img')}
            src={`${process.env.PUBLIC_URL}/biddingPage/${resetImg}.png`}
          />
        </button>
      </form>
    </div>
  );
};

export default AddBid;
