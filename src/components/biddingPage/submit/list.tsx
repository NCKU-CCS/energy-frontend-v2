import React from 'react';
import classNames from 'classnames';
import ListItem from './listItem';

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
  apiData: IApiData;
}

// whatever the mode is actually doesn't matter due to the reason that api data is based on mode
const List: React.FC<IProps> = ({ apiData }) => {
  // create list
  const createList = apiData.data.map((d) => {
    // interval string
    const intervalStr = `${d.time}:00 - ${d.time + 1}:00`;

    return (
      <ListItem
        id={d.id}
        type={d.bid_type}
        time={d.time}
        date={d.date}
        interval={intervalStr}
        volume={d.volume}
        price={d.price}
        totalPrice={d.total_price}
      />
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
