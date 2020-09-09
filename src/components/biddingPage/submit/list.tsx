import React, { useEffect } from 'react';
import classNames from 'classnames';
import testBuyData from './buy.json';

interface IData {
  bid_type: string;
  date: string;
  end_time: string;
  id: string;
  price: number;
  start_time: string;
  time: number;
  total_price: number;
  upload_time: string;
  volume: number;
}

interface IApiData {
  data: IData[];
  page: number;
  totalCount: number;
}

interface IProps {
  mode: string;
  apiData: IApiData;
}

// whatever the mode is actually doesn't matter due to the reason that api data is based on mode
const List: React.FC<IProps> = ({ mode, apiData }) => {
  useEffect(() => {}, [mode]);
  // // create list
  // const createList = apiData.data.map((d) => {
  //   if(d.bid_type === mode) {
  //     // interval string
  //     const intervalStr = `${d.time}:00 - ${d.time + 1}:00`;

  //     return (
  //       <div>
  //         <div>
  //           {/* 日期 */}
  //           {d.date}
  //         </div>
  //         <div>
  //           {/* 時段 */}
  //           {intervalStr}
  //         </div>
  //         <div>
  //           {/* 總度數 */}
  //           {d.volume}
  //         </div>
  //         <div>
  //           {/* 單價 */}
  //           {d.price}
  //         </div>
  //         <div>
  //           {/* 總金額 */}
  //           ${d.total_price}
  //         </div>
  //         <div>
  //           <button
  //             type='button'
  //           >
  //             c
  //           </button>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return (null);
  // });

  // create list
  const testApiData = apiData.totalCount === 0 ? testBuyData : apiData;

  const createList = testApiData.data.map((d) => {
    // interval string
    const intervalStr = `${d.time}:00 - ${d.time + 1}:00`;

    return (
      <div
        className={classNames('bidding-submit-list-listitem-item-container')}
      >
        <div className={classNames('bidding-submit-list-listitem-item-date')}>
          {/* 日期 */}
          {d.date}
        </div>
        <div
          className={classNames('bidding-submit-list-listitem-item-interval')}
        >
          {/* 時段 */}
          {intervalStr}
        </div>
        <div className={classNames('bidding-submit-list-listitem-item-volume')}>
          {/* 總度數 */}
          {d.volume}kWh
        </div>
        <div className={classNames('bidding-submit-list-listitem-item-price')}>
          {/* 單價 */}${d.price}/kWh
        </div>
        <div
          className={classNames('bidding-submit-list-listitem-item-totalprice')}
        >
          {/* 總金額 */}${d.total_price}
        </div>
        <div
          className={classNames(
            'bidding-submit-list-listitem-item-button-container',
          )}
        >
          <button type="button">c</button>
        </div>
      </div>
    );
  });

  return (
    <div className={classNames('bidding-submit-list-container-in')}>
      <div className={classNames('bidding-submit-list-title-container')}>
        <div className={classNames('bidding-submit-list-title-date')}>日期</div>
        <div className={classNames('bidding-submit-list-title-interval')}>
          時段
        </div>
        <div className={classNames('bidding-submit-list-title-volume')}>
          總度數
        </div>
        <div className={classNames('bidding-submit-list-title-price')}>
          單價
        </div>
        <div className={classNames('bidding-submit-list-title-totalprice')}>
          總金額
        </div>
        <div className={classNames('bidding-submit-list-title-button')} />
        {/* for button */}
      </div>
      <div className={classNames('bidding-submit-list-listitem-container')}>
        {createList}
      </div>
    </div>
  );
};

export default List;
