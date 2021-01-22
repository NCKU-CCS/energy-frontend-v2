import React from 'react';
import classNames from 'classnames';
import TypeButton from './typeButton';
import List from './list';
import AddBid from './addBid';

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
  setDataType(type: string): void;
}

const Submit: React.FC<IProps> = ({ apiData, setDataType }) => {
  return (
    <div className={classNames('drbid-submit-container-in')}>
      <div className={classNames('drbid-submit-modebutton-container-out')}>
        <TypeButton setDataType={setDataType} />
      </div>
      <div className={classNames('drbid-submit-list-container-out')}>
        <List apiData={apiData} />
      </div>
      <div className={classNames('drbid-submit-addbid-container-out')}>
        <AddBid type="" />
      </div>
      <div className={classNames('drbid-submit-pagecontrol-container-out')}>
        {}
      </div>
    </div>
  );
};

export default Submit;
