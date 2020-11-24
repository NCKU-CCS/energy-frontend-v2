import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
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
}

interface IProps {
  data: IData[];
  setData(d: IData[]): void;
}

const AddBidBtn: React.FC<IProps> = ({ data, setData }) => {
  // click add btn or not
  const [add, setAdd] = useState<boolean>(false);

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

  // map the interval array and return options
  const createOptions = intervalArr.map((str, i) => {
    return <option value={i}>{str}</option>;
  });

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
        status: 'none',
      });
      setData(tmpDataArr);
    }
  };

  return (
    <div className={classNames('bidding-dr-addbidbtn-container-in')}>
      <button
        type="button"
        className={classNames('bidding-dr-addbidbtn-btn')}
        onClick={() => setAdd(true)}
      >
        <img
          alt="add"
          src={`${process.env.PUBLIC_URL}/biddingPage/add-gray.png`}
          className={classNames('bidding-dr-addbidbtn-btn-img')}
        />
      </button>
      {add && (
        <div className={classNames('bidding-dr-addbidbtn-infobox-container')}>
          <div className={classNames('bidding-dr-addbidbtn-infobox-content')}>
            <div className={classNames('bidding-dr-addbidbtn-infobox-header')}>
              <button
                type="button"
                className={classNames(
                  'bidding-dr-addbidbtn-infobox-header-close',
                )}
                onClick={() => setAdd(false)}
              >
                X
              </button>
            </div>
            <div className={classNames('bidding-dr-addbidbtn-infobox-center')}>
              <div
                className={classNames(
                  'bidding-dr-addbidbtn-infobox-center-content',
                )}
              >
                <div
                  className={classNames(
                    'bidding-dr-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-dr-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    日期 :
                  </div>
                  <input
                    type="date"
                    className={classNames(
                      'bidding-dr-addbidbtn-infobox-center-item-input',
                    )}
                    onChange={(e) =>
                      setDate(dayjs(e.target.value).format('YYYY/MM/DD'))
                    }
                    value={
                      reset
                        ? ''
                        : dayjs(new Date(date)).format('YYYY-MM-DD').toString()
                    }
                  />
                </div>
                <div
                  className={classNames(
                    'bidding-dr-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-dr-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    時段 :
                  </div>
                  <select
                    className={classNames(
                      'bidding-dr-addbidbtn-infobox-center-item-input',
                    )}
                    onChange={(e) => setTime(parseInt(e.target.value, 10))}
                  >
                    <option value="-1" selected={reset}>
                      {' '}
                    </option>
                    {createOptions}
                  </select>
                </div>
                <div
                  className={classNames(
                    'bidding-dr-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-dr-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    DR量 :
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className={classNames(
                      'bidding-dr-addbidbtn-infobox-center-item-input',
                    )}
                    onChange={(e) => setValue(parseFloat(e.target.value))}
                    value={reset ? '' : value}
                  />
                </div>
                <div
                  className={classNames(
                    'bidding-dr-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-dr-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    單價 :
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className={classNames(
                      'bidding-dr-addbidbtn-infobox-center-item-input',
                    )}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    value={reset ? '' : price}
                  />
                </div>
                <div
                  className={classNames(
                    'bidding-dr-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-dr-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    總金額 :
                  </div>
                  <input
                    type="number"
                    min="0"
                    disabled
                    className={classNames(
                      'bidding-dr-addbidbtn-infobox-center-item-input',
                    )}
                    value={reset ? '' : total}
                  />
                </div>
              </div>
            </div>
            <div className={classNames('bidding-dr-addbidbtn-infobox-footer')}>
              <button
                type="button"
                className={classNames(
                  'bidding-dr-addbidbtn-infobox-footer-leftbtn',
                )}
                onClick={() => handleClickSubmit()}
              >
                確認
              </button>
              <button
                type="button"
                className={classNames(
                  'bidding-dr-addbidbtn-infobox-footer-rightbtn',
                )}
                onClick={() => setReset(true)}
              >
                重設
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBidBtn;
