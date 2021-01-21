import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import { intervalArr } from '../../../constants/constant';

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
  }, [date, time, volume, price]);

  return (
    <div className={classNames('bidding-submit-addbid-container-in')}>
      <form className={classNames('bidding-submit-addbid-form')}>
        <div className={classNames('bidding-submit-addbid-form-date')}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={
                reset
                  ? null
                  : dayjs(new Date(date)).format('YYYY-MM-DD').toString()
              }
              onChange={(d) =>
                setDate(dayjs(String(d?.toDateString())).format('YYYY/MM/DD'))
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
            src={`${process.env.PUBLIC_URL}/greenPage/${checkImg}.png`}
          />
        </button>
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
            src={`${process.env.PUBLIC_URL}/greenPage/${resetImg}.png`}
          />
        </button>
      </form>
    </div>
  );
};

export default AddBid;
