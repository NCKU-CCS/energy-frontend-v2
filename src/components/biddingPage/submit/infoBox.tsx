import React, { useState } from 'react';
import classNames from 'classnames';

const InfoBox: React.FC = () => {
  const [openInfoBox, setOpenInfoBox] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  // handle click left button
  const handleClickLeft = () => {
    if (edit) {
      setEdit(false);
      // console.log('edit : ', edit);
    } else {
      setEdit(true);
      // console.log('edit : ', edit);
    }
  };

  // handle click right
  // const handleClickRight = () => {
  //   if(edit) {

  //   } else {

  //   }
  // };

  return (
    <div className={classNames('bidding-submit-infobox-container-in')}>
      {!openInfoBox ? (
        <button
          type="button"
          className={classNames('bidding-submit-infobox-open-btn')}
          onClick={() => setOpenInfoBox(true)}
        >
          <img
            className={classNames('bidding-submit-infobox-open-btn-img')}
            alt="magnifier"
            src={`${process.env.PUBLIC_URL}/biddingPage/magnifier-gray.png`}
          />
        </button>
      ) : (
        <div className={classNames('bidding-submit-infobox-canvas')}>
          <div className={classNames('bidding-submit-infobox-content')}>
            <div
              className={classNames('bidding-submit-infobox-content-header')}
            >
              <button
                type="button"
                className={classNames(
                  'bidding-submit-infobox-content-header-close',
                )}
                onClick={() => setOpenInfoBox(false)}
              >
                X
              </button>
            </div>
            <div
              className={classNames('bidding-submit-infobox-content-center')}
            >
              <div
                className={classNames(
                  'bidding-submit-infobox-content-center-inside',
                )}
              >
                {!edit ? (
                  <div
                    className={classNames(
                      'bidding-submit-infobox-content-center-inside--show',
                    )}
                  >
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-date--show',
                        'bidding-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      日期 :&nbsp;
                    </div>
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-interval--show',
                        'bidding-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      時段 :&nbsp;
                    </div>
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-volume--show',
                        'bidding-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      總度數 :&nbsp;
                    </div>
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-price--show',
                        'bidding-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      單價 :&nbsp;
                    </div>
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-total--show',
                        'bidding-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      總金額 :&nbsp;
                    </div>
                    <div
                      className={classNames(
                        'bidding-submit-infobox-content-center-inside-url--show',
                        'bidding-submit-infobox-content-center-inside-item--show',
                      )}
                    >
                      連結 :&nbsp;
                    </div>
                  </div>
                ) : (
                  <div>edit</div>
                )}
              </div>
            </div>
            <div
              className={classNames('bidding-submit-infobox-content-footer')}
            >
              <button
                type="button"
                className={classNames(
                  'bidding-submit-infobox-content-footer-left',
                )}
                onClick={() => handleClickLeft()}
              >
                <img
                  alt="left"
                  className={classNames(
                    'bidding-submit-infobox-content-footer-left-img',
                  )}
                  src={`${process.env.PUBLIC_URL}/biddingPage/${
                    !edit ? 'edit' : 'check'
                  }-white.png`}
                />
                {!edit ? '編輯' : '確認'}
              </button>
              <button
                type="button"
                className={classNames(
                  'bidding-submit-infobox-content-footer-right',
                )}
              >
                <img
                  alt="right"
                  className={classNames(
                    'bidding-submit-infobox-content-footer-right-img',
                  )}
                  src={`${process.env.PUBLIC_URL}/biddingPage/${
                    !edit ? 'trash' : 'cancel'
                  }-white.png`}
                />
                {!edit ? '移除' : '取消'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
