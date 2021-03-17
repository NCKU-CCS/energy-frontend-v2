/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';

const AddBid: React.FC = () => {
  // i18n
  const { t } = useTranslation();

  // date
  const [date, setDate] = useState<string | null>(null);

  // interval array
  const [intervalArr, setIntervalArr] = useState<string[]>([]);

  // interval
  const [interval, setInterval] = useState<string>('');

  // mode
  const [mode, setMode] = useState<number>(0);

  // volume
  const [volume, setVolume] = useState<number | undefined>(undefined);

  // price
  const [price, setPrice] = useState<number | undefined>(undefined);

  // set submit button disabled
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  // determine interval array by selected month
  useEffect(() => {
    if (date) {
      const mth = dayjs(date).get('month');
      if (mth >= 5 && mth <= 8) {
        setIntervalArr(['23:00 - 8:00', '8:00 - 18:00', '18:00 - 23:00']);
      } else {
        setIntervalArr(['22:00 - 17:00', '17:00 - 22:00']);
      }
    }
  }, [date]);

  // determine data validity
  useEffect(() => {
    if (
      date &&
      interval !== '' &&
      mode !== 0 &&
      volume &&
      volume !== 0 &&
      price &&
      price !== 0
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [date, interval, mode, volume, price]);

  // determine price by mode
  useEffect(() => {
    switch (mode) {
      default: {
        const hr = dayjs().get('hour');
        const mth = dayjs().get('month');
        if (mth >= 5 && mth <= 8) {
          // summer
          if (hr >= 23 || hr < 8) {
            setPrice(4.97);
          } else if (hr < 18) {
            setPrice(7.59);
          } else setPrice(9.89);
        } else {
          // not summer
          // eslint-disable-next-line no-lonely-if
          if (hr >= 17 && hr < 22) {
            setPrice(5.71);
          } else {
            setPrice(4.55);
          }
        }
        break;
      }
      case 0: {
        setPrice(undefined);
        break;
      }
      case 2: {
        const hr = dayjs().get('hour');
        const mth = dayjs().get('month');
        if (mth >= 5 && mth <= 8) {
          // summer
          if (hr >= 23 || hr < 8) {
            setPrice(4.74);
          } else if (hr < 18) {
            setPrice(7.36);
          } else setPrice(9.66);
        } else {
          // not summer
          // eslint-disable-next-line no-lonely-if
          if (hr >= 17 && hr < 22) {
            setPrice(1.34);
          } else {
            setPrice(0.18);
          }
        }
        break;
      }
    }
  }, [mode]);

  // create options for <select>
  const createIntervalOptions = intervalArr.map((str) => {
    return (
      <option dir="rtl" value={str}>
        {str}
      </option>
    );
  });

  // create options for mode
  const createModeOptions = [1, 2, 3, 4].map((i) => {
    return (
      <option dir="rtl" value={i}>
        {i}
      </option>
    );
  });

  // handle click submit
  const handleSubmit = () => {
    alert('success');
    window.location.reload();
  };

  return (
    <div className={classNames('drbid-submit-addbid-container-in')}>
      <form className={classNames('drbid-submit-addbid-form')}>
        <div className={classNames('drbid-submit-addbid-form-date')}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              inputProps={{
                style: {
                  color: `${date ? '#707070' : '#d1d2d1'}`,
                  textAlign: 'right',
                  fontSize: '0.9rem',
                  paddingRight: '15px',
                  paddingBottom: '5px',
                  cursor: 'pointer',
                },
              }}
              value={date}
              onChange={(d) =>
                setDate(dayjs(String(d?.toDateString())).format('YYYY/MM/DD'))
              }
              format="yyyy/MM/dd"
              emptyLabel={t('drbidpage.date')}
              showTodayButton
              disablePast
              allowKeyboardControl
              autoOk
            />
          </MuiPickersUtilsProvider>
        </div>
        <select
          className={classNames(
            `drbid-submit-addbid-form-interval${
              interval === '' ? '--invalid' : ''
            }`,
          )}
          onChange={(e) => setInterval(e.target.value)}
        >
          <option dir="rtl" value="" selected>
            {t('drbidpage.interval')}
          </option>
          {createIntervalOptions}
        </select>
        <select
          className={classNames(
            `drbid-submit-addbid-form-mode${mode === 0 ? '--invalid' : ''}`,
          )}
          onChange={(e) => setMode(parseInt(e.target.value, 10))}
        >
          <option dir="rtl" value="0" selected>
            {t('drbidpage.mode')}
          </option>
          {createModeOptions}
        </select>
        <input
          className={classNames('drbid-submit-addbid-form-volume')}
          type="number"
          min="0"
          step="0.1"
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          value={volume}
          placeholder={t('drbidpage.volume')}
          required
        />
        <input
          className={classNames('drbid-submit-addbid-form-price')}
          type="number"
          min="0"
          value={price}
          placeholder={t('drbidpage.price')}
          required
          disabled
        />
        <input
          className={classNames('drbid-submit-addbid-form-total')}
          type="number"
          min="0"
          value={
            price !== undefined && volume !== undefined
              ? (price * volume).toFixed(2)
              : undefined
          }
          placeholder={t('drbidpage.total')}
          disabled
        />
        <button
          type="button"
          className={classNames('drbid-submit-addbid-form-submit')}
          title="Submit"
          onClick={() => handleSubmit()}
          disabled={submitDisabled}
        >
          {t('drbidpage.new')}
        </button>
      </form>
    </div>
  );
};

export default AddBid;
