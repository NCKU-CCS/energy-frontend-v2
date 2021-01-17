import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AddBidBtn: React.FC<IProps> = ({ data, setData }) => {
  // i18n
  const { t } = useTranslation();

  // click add btn or not
  const [add, setAdd] = useState<boolean>(false);

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

  // date for new bid
  const [bidDate, setBidDate] = useState<string>('');

  // new bid button disabled
  const [newBidDisabled, setNewBidDisabled] = useState(true);

  // determine bid date on every second
  useEffect(() => {
    setInterval(() => {
      const now = new Date();
      const boundary = new Date();
      boundary.setHours(10, 30);
      setBidDate(
        now.getTime() >= boundary.getTime()
          ? dayjs(now).add(2, 'day').format('YYYY/MM/DD')
          : dayjs(now).add(1, 'day').format('YYYY/MM/DD'),
      );
    }, 1000);
  }, []);

  useEffect(() => {
    if (date !== 'null' || value !== 0 || price !== 0) setReset(false);
  }, [date, value, price]);

  useEffect(() => {
    if (value !== 0 && price !== 0) {
      setTotal(parseFloat((value * price).toFixed(2)));
      setNewBidDisabled(false);
    } else {
      setTotal(0);
      setNewBidDisabled(true);
    }
  }, [value, price]);

  useEffect(() => {
    if (reset) {
      setDate('null');
      setValue(0);
      setPrice(0);
      setTotal(0);
    }
  }, [reset]);

  const addBid = async () => {
    // get bearer token
    const user = JSON.parse(
      localStorage.getItem('BEMS_USER') ||
        sessionStorage.getItem('BEMS_USER') ||
        '{}',
    );
    // POST to DR bid
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/DR_bid`,
        {
          method: 'POST',
          // mode: 'cors',
          headers: new Headers({
            Authorization: `Bearer ${user.bearer}`,
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            volume: value,
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
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
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
                    {t('biddingpage.date')} :
                  </div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      value={bidDate}
                      onChange={() => {}}
                      format="yyyy/MM/dd"
                      disabled
                    />
                  </MuiPickersUtilsProvider>
                </div>
                {/* <div
                  className={classNames(
                    'bidding-dr-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-dr-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    {t('biddingpage.time')} :
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
                </div> */}
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
                    {t('biddingpage.drVolume')} :
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
                    {t('biddingpage.price')} :
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
                    {t('biddingpage.total')} :
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
                onClick={() => addBid()}
                disabled={newBidDisabled}
              >
                {t('biddingpage.confirm')}
              </button>
              <button
                type="button"
                className={classNames(
                  'bidding-dr-addbidbtn-infobox-footer-rightbtn',
                )}
                onClick={() => setReset(true)}
              >
                {t('biddingpage.reset')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBidBtn;
