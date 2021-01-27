import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import ListItem from './listItem';
import AddBidBtn from './addBidBtn';

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
  type: string;
}

// whatever the mode is actually doesn't matter due to the reason that api data is based on mode
const List: React.FC<IProps> = ({ apiData, type }) => {
  // i18n
  const { t } = useTranslation();

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
    <div className={classNames('drbid-submit-list-container-in')}>
      <div className={classNames('drbid-submit-list-title-container')}>
        <div className={classNames('drbid-submit-list-title-date')}>
          {t('drbidpage.date')}
        </div>
        <div className={classNames('drbid-submit-list-title-interval')}>
          {t('drbidpage.time')}
        </div>
        <div className={classNames('drbid-submit-list-title-volume')}>
          {t('drbidpage.volume')}
        </div>
        <div className={classNames('drbid-submit-list-title-price')}>
          {t('drbidpage.price')}
        </div>
        <div className={classNames('drbid-submit-list-title-totalprice')}>
          {t('drbidpage.total')}
        </div>
        <div className={classNames('drbid-submit-list-title-button')}>
          <AddBidBtn type={type} />
        </div>
      </div>
      <div className={classNames('drbid-submit-list-listitem-container')}>
        {createList}
      </div>
    </div>
  );
};

export default List;
