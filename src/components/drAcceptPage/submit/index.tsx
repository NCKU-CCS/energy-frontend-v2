import React from 'react';
import classNames from 'classnames';
import TypeButton from './typeButton';
import List from './list/index';
import AddBid from './addBid';

interface IData {
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
  userType: string;
  apiData: IData[];
  setDataType(type: string): void;
}

const Submit: React.FC<IProps> = ({ userType, apiData, setDataType }) => {
  return (
    <div className={classNames('draccept-submit-container-in')}>
      <div className={classNames('draccept-submit-modebutton-container-out')}>
        <TypeButton setDataType={setDataType} />
      </div>
      <div className={classNames('draccept-submit-list-container-out')}>
        <List userType={userType} apiData={apiData} />
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
