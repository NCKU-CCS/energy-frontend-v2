import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

interface IProps {
  type: string;
}

const AddBidBtn: React.FC<IProps> = ({ type }) => {
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

  // create an array from '0:00 - 1:00' to '23:00 - 24:00'
  const intervalArr: string[] = [
    '0:00 - 1:00',
    '1:00 - 2:00',
    '2:00 - 3:00',
    '3:00 - 4:00',
    '4:00 - 5:00',
    '5:00 - 6:00',
    '6:00 - 7:00',
    '7:00 - 8:00',
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00',
    '21:00 - 22:00',
    '22:00 - 23:00',
    '23:00 - 24:00',
  ];

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
    <div className={classNames('bidding-submit-addbidbtn-container-in')}>
      <button
        type="button"
        title="新增"
        className={classNames('bidding-submit-addbidbtn-btn')}
        onClick={() => setAdd(true)}
      >
        <img
          alt="add"
          src={`${process.env.PUBLIC_URL}/biddingPage/add-gray.png`}
          className={classNames('bidding-submit-addbidbtn-btn-img')}
        />
      </button>
      {add && (
        <div
          className={classNames('bidding-submit-addbidbtn-infobox-container')}
        >
          <div
            className={classNames('bidding-submit-addbidbtn-infobox-content')}
          >
            <div
              className={classNames('bidding-submit-addbidbtn-infobox-header')}
            >
              <button
                type="button"
                className={classNames(
                  'bidding-submit-addbidbtn-infobox-header-close',
                )}
                onClick={() => handleClickClose()}
              >
                X
              </button>
            </div>
            <div
              className={classNames('bidding-submit-addbidbtn-infobox-center')}
            >
              <div
                className={classNames(
                  'bidding-submit-addbidbtn-infobox-center-content',
                )}
              >
                <div
                  className={classNames(
                    'bidding-submit-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-submit-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    日期 :
                  </div>
                  <input
                    type="date"
                    className={classNames(
                      'bidding-submit-addbidbtn-infobox-center-item-input',
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
                    'bidding-submit-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-submit-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    時段 :
                  </div>
                  <select
                    className={classNames(
                      'bidding-submit-addbidbtn-infobox-center-item-input',
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
                    'bidding-submit-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-submit-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    度數 :
                  </div>
                  <input
                    type="number"
                    className={classNames(
                      'bidding-submit-addbidbtn-infobox-center-item-input',
                    )}
                    min="0"
                    step="0.1"
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    value={reset ? '' : volume}
                  />
                </div>
                <div
                  className={classNames(
                    'bidding-submit-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-submit-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    單價 :
                  </div>
                  <input
                    type="number"
                    className={classNames(
                      'bidding-submit-addbidbtn-infobox-center-item-input',
                    )}
                    min="0"
                    step="0.1"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    value={reset ? '' : price}
                  />
                </div>
                <div
                  className={classNames(
                    'bidding-submit-addbidbtn-infobox-center-item-container',
                  )}
                >
                  <div
                    className={classNames(
                      'bidding-submit-addbidbtn-infobox-center-item-text',
                    )}
                  >
                    總金額 :
                  </div>
                  <input
                    type="number"
                    className={classNames(
                      'bidding-submit-addbidbtn-infobox-center-item-input',
                    )}
                    min="0"
                    value={reset ? '' : totalPrice}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div
              className={classNames('bidding-submit-addbidbtn-infobox-footer')}
            >
              <button
                type="button"
                className={classNames(
                  'bidding-submit-addbidbtn-infobox-footer-leftbtn',
                )}
                onClick={() => addBid()}
                disabled={submitDisabled}
              >
                <img
                  alt="submit"
                  src={`${process.env.PUBLIC_URL}/biddingPage/check-${
                    submitDisabled ? 'disabled' : 'white'
                  }.png`}
                />
                確認
              </button>
              <button
                type="button"
                className={classNames(
                  'bidding-submit-addbidbtn-infobox-footer-rightbtn',
                )}
                onClick={() => handleClickReset()}
              >
                <img
                  alt="submit"
                  src={`${process.env.PUBLIC_URL}/biddingPage/reset-white.png`}
                />
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
