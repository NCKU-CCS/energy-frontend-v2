import React from 'react';
import classNames from 'classnames';
import TypeButton from './typeButton';
import List from './list/index';
import AddBid from './addBid';

interface IData {
  date: string;
  mode: number;
  total_volume: number;
  price: number;
  total_price: number;
  is_submitted: boolean;
}

interface INewData {
  mode: number;
  aggregator?: string;
  executor?: string;
  interval: string;
  total_volume: number;
  price: number;
  total_price: number;
  is_accepted: boolean;
}

interface IProps {
  date: string;
  userType: string;
  apiData: IData[];
  newApiData: INewData[];
  setDataType(type: string): void;
}

const Submit: React.FC<IProps> = ({
  date,
  userType,
  apiData,
  newApiData,
  setDataType,
}) => {
  return (
    <div className={classNames('draccept-submit-container-in')}>
      <div className={classNames('draccept-submit-modebutton-container-out')}>
        <TypeButton setDataType={setDataType} />
      </div>
      <div className={classNames('draccept-submit-list-container-out')}>
        <List
          date={date}
          userType={userType}
          apiData={apiData}
          newApiData={newApiData}
        />
      </div>
      <div className={classNames('draccept-submit-addbid-container-out')}>
        {userType === 'aggregator' && <AddBid />}
      </div>
      <div className={classNames('draccept-submit-pagecontrol-container-out')}>
        {}
      </div>
    </div>
  );
};

export default Submit;
