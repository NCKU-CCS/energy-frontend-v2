import React from 'react';
import classNames from 'classnames';
import ListTitle from './listTitle';
import ListItem from './listItem';

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
}

const List: React.FC<IProps> = ({ date, userType, apiData, newApiData }) => {
  // map data and create list items
  const createList = newApiData.map((d) => {
    return (
      <ListItem date={date} userType={userType} data={apiData[0]} newData={d} />
    );
  });

  return (
    <div className={classNames('draccept-submit-list-container-in')}>
      <ListTitle userType={userType} />
      <div className={classNames('draccept-submit-list-listitem-container')}>
        {createList}
      </div>
    </div>
  );
};

export default List;
