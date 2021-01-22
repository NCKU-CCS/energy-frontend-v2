import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { intervalArr } from '../../../constants/constant';

interface IProps {
  type: string;
}

const AddBidBtn: React.FC<IProps> = ({ type }) => {
  // i18n
  const { t } = useTranslation();

  // click add bid btn or not
  const [add, setAdd] = useState<boolean>(false);

  // click reset btn or not
  const [reset, setReset] = useState<boolean>(true);

  // control submit btn disabled or not
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

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

  // handle click close btn
  const handleClickClose = () => {
    setAdd(false);
    setReset(true);
    setDate('null');
    setTime(-1);
    setVolume(0);
    setPrice(0);
    setTotalPrice(0);
    setSubmitDisabled(true);
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
    // if (date !== 'null' || time !== -1 || volume !== -1 || price !== -1)
    //   setResetDisabled(false);
  }, [date, time, volume, price]);

  return (
    <div className={classNames('drbid-submit-addbidbtn-container-in')}>
      <button
        type="button"
        title="新增"
        className={classNames('drbid-submit-addbidbtn-btn')}
        onClick={() => setAdd(true)}
      >
        <img
          alt="add"
          src={`${process.env.PUBLIC_URL}/drBidPage/add-gray.png`}
          className={classNames('drbid-submit-addbidbtn-btn-img')}
        />
      </button>
      {add && (
        <div className={classNames('drbid-submit-addbidbtn-infobox-container')}>
          <div className={classNames('drbid-submit-addbidbtn-infobox-content')}>
            <div
              className={classNames('drbid-submit-addbidbtn-infobox-header')}
            >
              <button
                type="button"
                className={classNames(
                  'drbid-submit-addbidbtn-infobox-header-close',
                )}
                onClick={() => handleClickClose()}
              >
                X
              </button>
            </div>
            <div
              className={classNames('drbid-submit-addbidbtn-infobox-center')}
            >
              <div
                className={classNames(
                  'drbid-submit-addbidbtn-infobox-center-content',
                )}
              >
                <div
                  className={classNames(
                    'drbid-submit-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    {t('drbidpage.date')} :
                  </div>
                  <input
                    type="date"
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-input',
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
                    'drbid-submit-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    {t('drbidpage.time')} :
                  </div>
                  <select
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-input',
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
                    'drbid-submit-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    {t('drbidpage.volume')} :
                  </div>
                  <input
                    type="number"
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-input',
                    )}
                    min="0"
                    step="0.1"
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    value={reset ? '' : volume}
                  />
                </div>
                <div
                  className={classNames(
                    'drbid-submit-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    {t('drbidpage.price')} :
                  </div>
                  <input
                    type="number"
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-input',
                    )}
                    min="0"
                    step="0.1"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    value={reset ? '' : price}
                  />
                </div>
                <div
                  className={classNames(
                    'drbid-submit-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    {t('drbidpage.total')} :
                  </div>
                  <input
                    type="number"
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-input',
                    )}
                    min="0"
                    value={reset ? '' : totalPrice}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div
              className={classNames('drbid-submit-addbidbtn-infobox-footer')}
            >
              <button
                type="button"
                className={classNames(
                  'drbid-submit-addbidbtn-infobox-footer-leftbtn',
                )}
                onClick={() => addBid()}
                disabled={submitDisabled}
              >
                <img
                  alt="submit"
                  src={`${process.env.PUBLIC_URL}/drBidPage/check-${
                    submitDisabled ? 'disabled' : 'white'
                  }.png`}
                />
                {t('drbidpage.confirm')}
              </button>
              <button
                type="button"
                className={classNames(
                  'drbid-submit-addbidbtn-infobox-footer-rightbtn',
                )}
                onClick={() => handleClickReset()}
              >
                <img
                  alt="submit"
                  src={`${process.env.PUBLIC_URL}/drBidPage/reset-white.png`}
                />
                {t('drbidpage.reset')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBidBtn;
