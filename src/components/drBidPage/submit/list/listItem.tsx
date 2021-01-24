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
    <div className={classNames('drbid-submit-listitem-container')}>
      <div className={classNames('drbid-submit-listitem-date')}>{date}</div>
      <div className={classNames('drbid-submit-listitem-mode')}>
        {data.mode}
      </div>
      <div className={classNames('drbid-submit-listitem-volume')}>
        {data.total_volume.toFixed(1)}&thinsp;kWh
      </div>
      <div className={classNames('drbid-submit-listitem-price')}>
        $&thinsp;{data.price.toFixed(1)}&thinsp;/&thinsp;kWh
      </div>
      <div className={classNames('drbid-submit-listitem-total')}>
        $&thinsp;{data.total_price.toFixed(1)}
      </div>
      <div className={classNames('drbid-submit-listitem-button-container')}>
        <button
          className={classNames('drbid-submit-listitem-button-btn')}
          type="button"
          disabled={data.is_submitted}
        >
          {data.is_submitted ? '已接受' : '接受'}
        </button>
      </div>
    </div>
  );
};

export default ListItem;
