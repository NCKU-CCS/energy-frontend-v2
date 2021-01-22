import React from 'react';
import classNames from 'classnames';

interface IData {
  date: string;
  mode: number;
  total_volume: number;
  price: number;
  total_price: number;
  is_submitted: boolean;
}

interface IProps {
  date: string;
  data: IData;
}

const ListItem: React.FC<IProps> = ({ date, data }) => {
  return (
    <div className={classNames('drbid-submit-listitem-container--show')}>
      <div className={classNames('drbid-submit-listitem-date--show')}>
        {date}
      </div>
      {/* remember to change class name from interval to mode */}
      <div className={classNames('drbid-submit-listitem-mode--show')}>
        {data.mode}
      </div>
      <div className={classNames('drbid-submit-listitem-volume--show')}>
        {data.total_volume.toFixed(1)}&thinsp;kWh
      </div>
      <div className={classNames('drbid-submit-listitem-price--show')}>
        $&thinsp;{data.price.toFixed(1)}&thinsp;/&thinsp;kWh
      </div>
      <div className={classNames('drbid-submit-listitem-total--show')}>
        $&thinsp;{data.total_price.toFixed(1)}
      </div>
      <div
        className={classNames('drbid-submit-listitem-button-container--show')}
      >
        <button type="button">{data.is_submitted ? '已接受' : '接受'}</button>
      </div>
    </div>
  );
};

export default ListItem;
