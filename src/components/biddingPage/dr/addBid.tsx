import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import { intervalArr } from '../../../constants/constant';

interface IData {
  date: string;
  interval: string;
  time: number;
  value: number;
  price: number;
  total: number;
  status: string;
  accepted: boolean;
}

interface IProps {
  data: IData[];
  setData(d: IData[]): void;
}

const AddBid: React.FC<IProps> = ({ data, setData }) => {
  // i18n
  const { t } = useTranslation();

  // date
  const [date, setDate] = useState<string>('null');

  // time
  const [time, setTime] = useState<number>(-1);

  // volume
  const [value, setValue] = useState<number>(0);

  // price
  const [price, setPrice] = useState<number>(0);

  // total price
  const [total, setTotal] = useState<number>(0);

  // reset
  const [reset, setReset] = useState<boolean>(true);

  useEffect(() => {
    if (date !== 'null' || time !== -1 || value !== 0 || price !== 0)
      setReset(false);
  }, [date, value, price]);

  useEffect(() => {
    if (value !== 0 && price !== 0)
      setTotal(parseFloat((value * price).toFixed(2)));
    else setTotal(0);
  }, [value, price]);

  useEffect(() => {
    if (reset) {
      setDate('null');
      setTime(-1);
      setValue(0);
      setPrice(0);
      setTotal(0);
    }
  }, [reset]);

  // handle click submit
  const handleClickSubmit = () => {
    setReset(true);
    if (
      date !== 'null' &&
      time !== -1 &&
      value !== 0 &&
      price !== 0 &&
      total !== 0
    ) {
      const tmpDataArr: IData[] = [...data];
      tmpDataArr.push({
        date,
        interval: intervalArr[time],
        time,
        value,
        price,
        total,
        status: 'new',
        accepted: false,
      });
      setData(tmpDataArr);
    }
  };

  // map the interval array and return options
  const createOptions = intervalArr.map((str, i) => {
    return <option value={i}>{str}</option>;
  });

  return (
    <div className={classNames('bidding-dr-addbid-container-in')}>
      <div
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-space',
        )}
      >
        s
      </div>
      <div
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-date',
        )}
      >
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
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-interval',
        )}
        onChange={(e) => setTime(parseInt(e.target.value, 10))}
      >
        <option value="-1" selected={reset}>
          {}
        </option>
        {createOptions}
      </select>
      <input
        type="number"
        min="0"
        step="0.1"
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-value',
        )}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        value={reset ? '' : value}
      />
      <input
        type="number"
        min="0"
        step="0.1"
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-price',
        )}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        value={reset ? '' : price}
      />
      <input
        type="number"
        min="0"
        step="0.1"
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-total',
        )}
        value={reset ? '' : total}
        disabled
      />
      <div
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-button-container',
        )}
      >
        <button
          type="button"
          className={classNames('bidding-dr-addbid-button-submit')}
          onClick={() => handleClickSubmit()}
        >
          {t('biddingpage.new')}
        </button>
      </div>
    </div>
  );
};

export default AddBid;
