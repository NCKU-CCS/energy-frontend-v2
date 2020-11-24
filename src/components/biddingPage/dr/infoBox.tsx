import React, { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { intervalArr } from '../../../constants/constant';

interface IProps {
  isAggr: boolean;
  editable: boolean;
  displayDate: string;
  displayInterval: string;
  displayValue: number;
  displayPrice: number;
  displayTotal: number;
  setDisplayDate(d: string): void;
  setDisplayInterval(i: string): void;
  setDisplayValue(v: number): void;
  setDisplayPrice(p: number): void;
  setDisplayTotal(t: number): void;
  setDeleted(b: boolean): void;
}

const InfoBox: React.FC<IProps> = ({
  isAggr,
  editable,
  displayDate,
  displayInterval,
  displayValue,
  displayPrice,
  displayTotal,
  setDisplayDate,
  setDisplayInterval,
  setDisplayValue,
  setDisplayPrice,
  setDeleted,
  // setDisplayTotal
}) => {
  // open infobox or not
  const [openInfoBox, setOpenInfoBox] = useState<boolean>(false);

  // edit or not
  const [edit, setEdit] = useState<boolean>(false);

  // set accept btn text for aggr
  const [btnText, setBtnText] = useState<string>('接受');

  // map the interval array and return options
  const createOptions = intervalArr.map((str) => {
    return <option value={str}>{str}</option>;
  });

  // handle click close
  const handleClickClose = () => {
    setOpenInfoBox(false);
    setEdit(false);
  };

  // handle click left btn
  const handleClickLeft = () => {
    // eslint-disable-next-line no-empty
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  // handle click right btn
  const handleClickRight = () => {
    if (edit) {
      setEdit(false);
      // eslint-disable-next-line no-empty
    } else {
      setDeleted(true);
    }
  };

  return (
    <div className={classNames('bidding-dr-infobox-container-in')}>
      <button
        type="button"
        className={classNames('bidding-dr-infobox-open-btn')}
        onClick={() => setOpenInfoBox(true)}
      >
        <img
          alt="magnifier"
          className={classNames('bidding-dr-infobox-open-btn-img')}
          src={`${process.env.PUBLIC_URL}/biddingPage/magnifier-gray.png`}
        />
      </button>
      {openInfoBox && (
        <div className={classNames('bidding-dr-infobox-canvas')}>
          <div className={classNames('bidding-dr-infobox-content')}>
            <div className={classNames('bidding-dr-infobox-content-header')}>
              <button
                type="button"
                className={classNames(
                  'bidding-dr-infobox-content-header-close',
                )}
                onClick={() => handleClickClose()}
              >
                X
              </button>
            </div>
            <div className={classNames('bidding-dr-infobox-content-center')}>
              <div
                className={classNames(
                  'bidding-dr-infobox-content-center-inside',
                )}
              >
                {!edit ? (
                  <div
                    className={classNames(
                      'bidding-dr-infobox-content-center-inside--show',
                    )}
                  >
                    <div
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-date--show',
                        'bidding-dr-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>日期 :&nbsp;</span>
                      <span>{displayDate}</span>
                    </div>
                    <div
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-interval--show',
                        'bidding-dr-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>時段 :&nbsp;</span>
                      <span>{displayInterval}</span>
                    </div>
                    <div
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-volume--show',
                        'bidding-dr-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>度數 :&nbsp;</span>
                      <span>{displayValue}kWh</span>
                    </div>
                    <div
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-price--show',
                        'bidding-dr-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>單價 :&nbsp;</span>
                      <span>${displayPrice}/kWh</span>
                    </div>
                    <div
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-total--show',
                        'bidding-dr-infobox-content-center-inside-item--show',
                      )}
                    >
                      <span>總金額 :&nbsp;</span>
                      <span>${displayTotal.toFixed(1)}</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={classNames(
                      'bidding-dr-infobox-content-center-inside--edit',
                    )}
                  >
                    <div
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-label--edit',
                        'bidding-dr-infobox-content-center-inside-item--edit',
                      )}
                    >
                      日期 :
                    </div>
                    <input
                      type="date"
                      id="date"
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-date--edit',
                        'bidding-dr-infobox-content-center-inside-input--edit',
                      )}
                      defaultValue={dayjs(new Date(displayDate))
                        .format('YYYY-MM-DD')
                        .toString()}
                      onChange={(e) =>
                        setDisplayDate(
                          dayjs(e.target.value).format('YYYY/MM/DD'),
                        )
                      }
                    />
                    <div
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-label--edit',
                        'bidding-dr-infobox-content-center-inside-item--edit',
                      )}
                    >
                      時段 :
                    </div>
                    <select
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-interval--edit',
                        'bidding-dr-infobox-content-center-inside-input--edit',
                      )}
                      defaultValue={displayInterval}
                      onChange={(e) => setDisplayInterval(e.target.value)}
                    >
                      <option value={displayInterval}>{displayInterval}</option>
                      {createOptions}
                    </select>
                    <div
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-label--edit',
                        'bidding-dr-infobox-content-center-inside-item--edit',
                      )}
                    >
                      DR量 :
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-volume--edit',
                        'bidding-dr-infobox-content-center-inside-input--edit',
                      )}
                      defaultValue={displayValue}
                      onChange={(e) =>
                        setDisplayValue(parseFloat(e.target.value))
                      }
                    />
                    <div
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-label--edit',
                        'bidding-dr-infobox-content-center-inside-item--edit',
                      )}
                    >
                      單價 :
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-price--edit',
                        'bidding-dr-infobox-content-center-inside-input--edit',
                      )}
                      defaultValue={displayPrice}
                      onChange={(e) =>
                        setDisplayPrice(parseFloat(e.target.value))
                      }
                    />
                    <div
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-label--edit',
                        'bidding-dr-infobox-content-center-inside-item--edit',
                      )}
                    >
                      總金額 :
                    </div>
                    <input
                      type="number"
                      className={classNames(
                        'bidding-dr-infobox-content-center-inside-total--edit',
                        'bidding-dr-infobox-content-center-inside-input--edit',
                      )}
                      value={displayTotal.toFixed(1)}
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={classNames('bidding-dr-infobox-content-footer')}>
              {isAggr && (
                <button
                  type="button"
                  className={classNames(
                    'bidding-dr-infobox-content-footer-accept',
                  )}
                  onClick={() => setBtnText('已接受')}
                >
                  <img
                    alt="accept"
                    className={classNames(
                      'bidding-dr-infobox-content-footer-accept-img',
                    )}
                    src={`${process.env.PUBLIC_URL}/biddingPage/check-white.png`}
                  />
                  {btnText}
                </button>
              )}
              {!isAggr && editable && (
                <button
                  type="button"
                  className={classNames(
                    'bidding-dr-infobox-content-footer-left',
                  )}
                  onClick={() => handleClickLeft()}
                >
                  <img
                    alt="left"
                    className={classNames(
                      'bidding-dr-infobox-content-footer-left-img',
                    )}
                    src={`${process.env.PUBLIC_URL}/biddingPage/${
                      !edit ? 'edit' : 'check'
                    }-white.png`}
                  />
                  {!edit ? '編輯' : '確認'}
                </button>
              )}
              {!isAggr && editable && (
                <button
                  type="button"
                  className={classNames(
                    'bidding-dr-infobox-content-footer-right',
                  )}
                  onClick={() => handleClickRight()}
                >
                  <img
                    alt="right"
                    className={classNames(
                      'bidding-dr-infobox-content-footer-right-img',
                    )}
                    src={`${process.env.PUBLIC_URL}/biddingPage/${
                      !edit ? 'trash' : 'cancel'
                    }-white.png`}
                  />
                  {!edit ? '移除' : '取消'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
