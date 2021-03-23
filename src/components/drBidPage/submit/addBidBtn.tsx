/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import dayjs from 'dayjs';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

interface IProps {
  dataType: string;
}

const AddBidBtn: React.FC<IProps> = ({ dataType }) => {
  // i18n
  const { t } = useTranslation();

  // get user from local storage or session storage
  const user = JSON.parse(
    localStorage.getItem('BEMS_USER') ||
      sessionStorage.getItem('BEMS_USER') ||
      '{}',
  );

  // user type: user, aggregator
  const [userType] = useState<string>(user.role);

  // click add bid btn or not
  const [add, setAdd] = useState<boolean>(false);

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

  // click reset btn or not
  const [reset, setReset] = useState<boolean>(true);

  // control submit btn disabled or not
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

  // determine price by mode
  useEffect(() => {
    switch (mode) {
      default: {
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
            setPrice(0.37);
          } else if (hr < 18) {
            setPrice(2.99);
          } else setPrice(5.29);
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

  // create options for interval
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

  // handle click close btn
  const handleClickClose = () => {
    setAdd(false);
    setReset(true);
  };

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
      setReset(false);
      setSubmitDisabled(true);
    }
  }, [date, interval, mode, volume, price]);

  // when reset, clear data
  useEffect(() => {
    setDate(null);
    setMode(0);
    setVolume(undefined);
    setPrice(undefined);
  }, [reset]);

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
              className={classNames(
                `drbid-submit-addbidbtn-infobox-header--${userType}`,
              )}
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
                  <div
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-input',
                    )}
                  >
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
                          setDate(
                            dayjs(String(d?.toDateString())).format(
                              'YYYY/MM/DD',
                            ),
                          )
                        }
                        format="yyyy/MM/dd"
                        showTodayButton
                        disablePast
                        allowKeyboardControl
                        autoOk
                      />
                    </MuiPickersUtilsProvider>
                  </div>
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
                    {t('drbidpage.interval')} :
                  </div>
                  <select
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-input',
                    )}
                    onChange={(e) => setInterval(e.target.value)}
                  >
                    {createIntervalOptions}
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
                    {t('drbidpage.mode')} :
                  </div>
                  <select
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-input',
                    )}
                    onChange={(e) => setMode(parseInt(e.target.value, 10))}
                  >
                    <option dir="rtl" value="0" selected={reset}>
                      {}
                    </option>
                    {createModeOptions}
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
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-input',
                    )}
                    type="number"
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
                    className={classNames(
                      'drbid-submit-addbidbtn-infobox-center-item-input',
                    )}
                    type="number"
                    min="0"
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
                    value={
                      !reset && price !== undefined && volume !== undefined
                        ? (price * volume).toFixed(2)
                        : ''
                    }
                    disabled
                  />
                </div>
              </div>
            </div>
            <div
              className={classNames(
                `drbid-submit-addbidbtn-infobox-footer--${userType}`,
              )}
            >
              <button
                type="button"
                className={classNames(
                  'drbid-submit-addbidbtn-infobox-footer-leftbtn',
                )}
                onClick={() => handleSubmit()}
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
                onClick={() => setReset(true)}
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
