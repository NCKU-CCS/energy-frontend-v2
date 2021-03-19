import React from 'react';
import classNames from 'classnames';
import TypeButton from './typeButton';
import List from './list/index';
import AddBid from './addBid';

interface IData {
  uuid: string;
  startTime: string;
  endTime: string;
  mode: number;
  volume: number;
  price: number;
  result: boolean;
}

interface IProps {
  date: string;
  apiData: IData[];
  setDataType(type: string): void;
}

const Submit: React.FC<IProps> = ({ date, apiData, setDataType }) => {
  return (
    <div className={classNames('drbid-submit-container-in')}>
      <div className={classNames('drbid-submit-modebutton-container-out')}>
        <TypeButton setDataType={setDataType} />
      </div>
      <div className={classNames('drbid-submit-list-container-out')}>
        <List date={date} apiData={apiData} />
      </div>
      <div className={classNames('drbid-submit-addbid-container-out')}>
        <AddBid />
      </div>
      <div className={classNames('drbid-submit-pagecontrol-container-out')}>
        {}
      </div>
    </div>
  );
};

export default Submit;
