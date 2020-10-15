import React, { useState } from 'react';
import classNames from 'classnames';

const AddBidBtn: React.FC = () => {
  const [add, setAdd] = useState<boolean>(false);

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

  return (
    <div className={classNames('bidding-submit-addbidbtn-container-in')}>
      <button
        type="button"
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
                onClick={() => setAdd(false)}
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
                  >
                    <option value="-1"> </option>
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
              >
                <img
                  alt="submit"
                  src={`${process.env.PUBLIC_URL}/biddingPage/check-white.png`}
                />
                確認
              </button>
              <button
                type="button"
                className={classNames(
                  'bidding-submit-addbidbtn-infobox-footer-rightbtn',
                )}
              >
                <img
                  alt="submit"
                  src={`${process.env.PUBLIC_URL}/biddingPage/cancel-white.png`}
                />
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBidBtn;
