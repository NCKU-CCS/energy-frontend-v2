import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
// import { intervalArr } from '../../../constants/constant';

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
const AddBid: React.FC<IProps> = ({ data, setData }) => {
  // i18n
  const { t } = useTranslation();

  // volume
  const [value, setValue] = useState<number>(0);

  // price
  const [price, setPrice] = useState<number>(0);

  // total price
  const [total, setTotal] = useState<number>(0);

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
    if (value !== 0 && price !== 0) {
      setTotal(parseFloat((value * price).toFixed(2)));
      setNewBidDisabled(false);
    } else {
      setTotal(0);
      setNewBidDisabled(true);
    }
  }, [value, price]);

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
      alert('err');
    }
  };

  return (
    <div className={classNames('bidding-dr-addbid-container-in')}>
      <div
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-date',
        )}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={bidDate}
            onChange={() => {}}
            format="yyyy/MM/dd"
            disabled
          />
        </MuiPickersUtilsProvider>
      </div>
      <div>{t('biddingpage.drVolume')}</div>
      <input
        type="number"
        min="0"
        step="0.1"
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-value',
        )}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        value={value}
      />
      <div>{t('biddingpage.price')}</div>
      <input
        type="number"
        min="0"
        step="0.1"
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-price',
        )}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        value={price}
      />
      <div>{t('biddingpage.total')}</div>
      <input
        type="number"
        min="0"
        step="0.1"
        className={classNames(
          'bidding-dr-addbid-item',
          'bidding-dr-addbid-total',
        )}
        value={total}
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
          onClick={() => addBid()}
          disabled={newBidDisabled}
        >
          {t('biddingpage.new')}
        </button>
      </div>
    </div>
  );
};

export default AddBid;
