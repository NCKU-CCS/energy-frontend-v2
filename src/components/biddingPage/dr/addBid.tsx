import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { intervalArr } from '../../../constants/constant';

interface IProps {
  setAddBid(b: boolean): void;
}

const AddBid: React.FC<IProps> = ({ setAddBid }) => {
  // date
  const [date, setDate] = useState<string>('null');

  // volume
  const [value, setValue] = useState<number>(0);

  // price
  const [price, setPrice] = useState<number>(0);

  // total price
  const [total, setTotal] = useState<number>(0);

  // reset
  const [reset, setReset] = useState<boolean>(true);

  useEffect(() => {
    if (date !== 'null' || value !== 0 || price !== 0) setReset(false);
  }, [date, value, price]);

  useEffect(() => {
    if (value !== 0 && price !== 0)
      setTotal(parseFloat((value * price).toFixed(2)));
    else setTotal(0);
  }, [value, price]);

  // handle click submit
  const handleClickSubmit = () => {
    setReset(true);
    setAddBid(true);
  };

  // map the interval array and return options
  const createOptions = intervalArr.map((str) => {
    return <option value={str}>{str}</option>;
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
      <input
        type="date"
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-date',
        )}
        onChange={(e) => setDate(dayjs(e.target.value).format('YYYY/MM/DD'))}
        value={
          reset ? '' : dayjs(new Date(date)).format('YYYY-MM-DD').toString()
        }
      />
      <select
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-interval',
        )}
      >
        <option value="" selected={reset}>
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
          新增
        </button>
      </div>
    </div>
  );
};

export default AddBid;
