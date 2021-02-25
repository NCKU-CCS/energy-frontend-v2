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

  // mode
  const [mode, setMode] = useState<number>(0);

  // volume
  const [volume, setVolume] = useState<number | undefined>(undefined);

  // price
  const [price, setPrice] = useState<number | undefined>(undefined);

  // price input disable
  const [priceDisable, setPriceDisable] = useState<boolean>(false);

  // set submit button disabled
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  // determine data validity
  useEffect(() => {
    if (date && mode !== 0 && volume && volume !== 0 && price && price !== 0) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [date, mode, volume, price]);

  // determine price by mode
  useEffect(() => {
    switch (mode) {
      default:
        break;
      case 1: {
        setPriceDisable(true);
        const hr = dayjs().get('hour');
        if (hr >= 23 || hr < 8) {
          setPrice(4.97);
        } else if (hr < 18) {
          setPrice(7.59);
        } else setPrice(9.89);
        break;
      }
      case 2:
        setPriceDisable(false);
        break;
      case 3:
        setPriceDisable(true);
        setPrice(1);
        break;
    }
  }, [mode]);

  // create options for <select>
  const createOptions = [1, 2, 3, 4, 5].map((i) => {
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
            `drbid-submit-addbid-form-select${mode === 0 ? '--invalid' : ''}`,
          )}
          onChange={(e) => setMode(parseInt(e.target.value, 10))}
        >
          <option dir="rtl" value="0" selected>
            {t('drbidpage.mode')}
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
          placeholder={t('drbidpage.volume')}
          required
        />
        <input
          className={classNames('drbid-submit-addbid-form-price')}
          type="number"
          min="0"
          step="0.1"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          value={price}
          placeholder={t('drbidpage.price')}
          required
          disabled={priceDisable}
        />
        <input
          className={classNames('drbid-submit-addbid-form-total')}
          type="number"
          min="0"
          value={
            price !== undefined && volume !== undefined
              ? (price * volume).toFixed(1)
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
