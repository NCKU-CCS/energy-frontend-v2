/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';

const AddBid: React.FC = () => {
  // date
  const [date, setDate] = useState<string | null>(null);

  // time
  const [mode, setMode] = useState<number>(0);

  // volume
  const [volume, setVolume] = useState<number | undefined>(undefined);

  // price
  const [price, setPrice] = useState<number | undefined>(undefined);

  // set submit button disabled
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (date !== 'null' && mode !== 0 && volume !== 0 && price !== 0)
      setSubmitDisabled(false);
  }, [date, mode, volume, price]);

  // creat options for <select>
  const createOptions = [1, 2, 3, 4, 5].map((i) => {
    return <option value={i}>{i}</option>;
  });

  // handle click submit
  const handleSubmit = () => {
    alert('success');
  };

  return (
    <div className={classNames('drbid-submit-addbid-container-in')}>
      <form className={classNames('drbid-submit-addbid-form')}>
        <div className={classNames('drbid-submit-addbid-form-date')}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={date}
              onChange={(d) =>
                setDate(dayjs(String(d?.toDateString())).format('YYYY/MM/DD'))
              }
              format="yyyy/MM/dd"
              label={date ? '' : '選擇日期'}
              showTodayButton
              disablePast
              allowKeyboardControl
            />
          </MuiPickersUtilsProvider>
        </div>
        <select
          className={classNames('drbid-submit-addbid-form-select')}
          onChange={(e) => setMode(parseInt(e.target.value, 10))}
          dir="rtl"
        >
          <option value="0" selected>
            交易模式
          </option>
          {createOptions}
        </select>
        <input
          className={classNames('drbid-submit-addbid-form-volume')}
          type="number"
          min="0"
          step="0.1"
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          value={volume}
          placeholder="總度數"
          required
        />
        <input
          className={classNames('drbid-submit-addbid-form-price')}
          type="number"
          min="0"
          step="0.1"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          value={price}
          placeholder="單價"
          required
        />
        <input
          className={classNames('drbid-submit-addbid-form-total')}
          type="number"
          min="0"
          value={price && volume ? (price * volume).toFixed(1) : 0}
          disabled
        />
        <button
          type="button"
          // className={classNames('drbid-submit-addbid-form-submit')}
          title="Submit"
          onClick={() => handleSubmit()}
          disabled={submitDisabled}
        >
          確認
        </button>
      </form>
    </div>
  );
};

export default AddBid;
