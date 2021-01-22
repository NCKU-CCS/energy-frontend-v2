/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import ListItem from './listItem';
import AddBidBtn from './addBidBtn';

interface IData {
  date: string;
  mode: number;
  total_volume: number;
  price: number;
  total_price: number;
  is_submitted: boolean;
}

interface IProps {
  apiData: IData[];
}

// whatever the mode is actually doesn't matter due to the reason that api data is based on mode
const List: React.FC<IProps> = ({ apiData }) => {
  // i18n
  const { t } = useTranslation();

  // create list
  // const createList = apiData.data.map((d) => {
  //   // interval string
  //   const intervalStr = `${d.time}:00 - ${d.time + 1}:00`;

  //   return (
  //     <ListItem
  //       id={d.id}
  //       type={d.bid_type}
  //       time={d.time}
  //       date={d.date}
  //       interval={intervalStr}
  //       volume={d.volume}
  //       price={d.price}
  //       totalPrice={d.total_price}
  //     />
  //   );
  // });

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
          <AddBidBtn type="" />
          {/* for button */}
        </div>
      </div>
      <div className={classNames('drbid-submit-list-listitem-container')}>
        {/* {createList} */}
      </div>
    </div>
  );
};

export default List;
